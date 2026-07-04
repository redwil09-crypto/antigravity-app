'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

const AppContext = createContext(null);
const LS_KEY = 'antigravity_user';

const defaultUser = {
  id: null,
  name: 'Aluno',
  email: '',
  level: 'Iniciante',
  weight: null,
  height: null,
  isLoggedIn: false,
  isGuest: false,
};

function loadLocalData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveLocalData(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
}

function clearLocalData() {
  try { localStorage.removeItem(LS_KEY); } catch {}
}

const LS_WORKOUTS = 'antigravity_workouts';
const LS_HISTORY = 'antigravity_history';
const LS_WEIGHT = 'antigravity_weight';
const LS_GYMS = 'antigravity_gyms';

export function AppProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [workouts, setWorkouts] = useState([]);
  const [history, setHistory] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [currentGymId, setCurrentGymId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Load local data helpers
  const loadFromLocal = useCallback(() => {
    try {
      const w = localStorage.getItem(LS_WORKOUTS);
      if (w) setWorkouts(JSON.parse(w));
      const h = localStorage.getItem(LS_HISTORY);
      if (h) setHistory(JSON.parse(h));
      const wh = localStorage.getItem(LS_WEIGHT);
      if (wh) setWeightHistory(JSON.parse(wh));
      const g = localStorage.getItem(LS_GYMS);
      if (g) {
        const parsedGyms = JSON.parse(g);
        setGyms(parsedGyms);
        if (parsedGyms.length > 0 && !currentGymId) {
          setCurrentGymId(parsedGyms[0].id);
        }
      }
    } catch {}
  }, []);

  const saveWorkoutsLocal = useCallback((data) => {
    try { localStorage.setItem(LS_WORKOUTS, JSON.stringify(data)); } catch {}
  }, []);

  // Fetch initial data & listen to auth changes
  useEffect(() => {
    const local = loadLocalData();
    if (local?.isGuest) {
      setUser(local);
      loadFromLocal();
      setIsLoaded(true);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) handleUserSession(session.user);
      else setIsLoaded(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) handleUserSession(session.user);
      else if (!local?.isGuest) {
        setUser(defaultUser);
        setWorkouts([]);
        setHistory([]);
        setWeightHistory([]);
        setIsLoaded(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserSession = async (authUser) => {
    try {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', authUser.id).single();
      if (profile) {
        setUser({ id: authUser.id, name: profile.name || 'Aluno', email: authUser.email, level: profile.level, weight: profile.weight, height: profile.height, isLoggedIn: true, isGuest: false });
      } else {
        setUser({ id: authUser.id, name: authUser.user_metadata?.name || 'Aluno', email: authUser.email, level: 'Iniciante', weight: null, height: null, isLoggedIn: true, isGuest: false });
      }
      
      const { data: wData } = await supabase
        .from('workouts')
        .select('*, exercises:workout_exercises(*)')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false });
      if (wData) {
        const parsedWorkouts = wData.map(w => ({
          id: w.id,
          name: w.name,
          favorite: w.favorite,
          restTime: w.rest_time,
          exercises: w.exercises.sort((a,b) => a.order_index - b.order_index).map(e => ({
            exerciseId: e.exercise_id,
            restSeconds: e.rest_seconds,
            order: e.order_index
          }))
        }));
        setWorkouts(parsedWorkouts);
      }

      const { data: hData } = await supabase
        .from('history')
        .select('*')
        .eq('user_id', authUser.id)
        .order('completed_at', { ascending: false });
      if (hData) setHistory(hData.map(h => ({
        id: h.id,
        workoutId: h.workout_id,
        workoutName: h.workout_name,
        exerciseCount: h.exercise_count,
        totalDuration: h.total_duration,
        exercises: h.exercises_data,
        completedAt: h.completed_at
      })));

      const { data: whData } = await supabase
        .from('weight_history')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false });
      if (whData) setWeightHistory(whData);
    } catch (e) { 
      console.error('Error fetching data from Supabase:', e); 
    }
    setIsLoaded(true);
  };

  const guestLogin = useCallback((name) => {
    const guestUser = {
      id: 'guest',
      name,
      email: '',
      level: 'Iniciante',
      weight: null,
      height: null,
      isLoggedIn: true,
      isGuest: true,
    };
    setUser(guestUser);
    saveLocalData(guestUser);
    loadFromLocal();
    showToast(`Bem-vindo(a), ${name}! 💪`);
  }, [showToast, loadFromLocal]);

  const login = useCallback(async (name, email, password, isRegister) => {
    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({ 
          email, password, 
          options: { data: { name } } 
        });
        if (error) throw error;
        showToast(`Conta criada! Bem-vindo(a) ${name}! 🎉`);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showToast(`Bem-vindo(a) de volta! 🎉`);
      }
    } catch (err) {
      showToast(err.message || 'Erro ao fazer login', 'error');
    }
  }, [showToast]);

  const logout = useCallback(async () => {
    if (user.isGuest) {
      clearLocalData();
      setUser(defaultUser);
      setWorkouts([]);
      setHistory([]);
      setWeightHistory([]);
      showToast('Até logo! 👋');
    } else {
      await supabase.auth.signOut();
      showToast('Até logo! 👋');
    }
  }, [user.isGuest, showToast]);

  const updateProfile = useCallback(async (updates) => {
    if (!user.id) return;
    if (user.isGuest) {
      const updated = { ...user, ...updates };
      setUser(updated);
      saveLocalData(updated);
      showToast('Perfil atualizado! ✅');
      return;
    }
    try {
      const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);
      if (error) throw error;
      setUser(prev => ({ ...prev, ...updates }));
      showToast('Perfil atualizado! ✅');
    } catch (err) { 
      showToast('Erro ao atualizar perfil', 'error'); 
    }
  }, [user, showToast]);

  const createWorkout = useCallback(async (workout) => {
    if (!user.id) { 
      showToast('Faça login para salvar treinos', 'error'); 
      return; 
    }

    if (user.isGuest) {
      const newW = {
        id: Date.now().toString(),
        name: workout.name,
        favorite: false,
        restTime: workout.restTime || 30,
        exercises: workout.exercises || [],
      };
      const updated = [newW, ...workouts];
      setWorkouts(updated);
      saveWorkoutsLocal(updated);
      showToast('Treino criado! 💪');
      return newW;
    }

    try {
      const { data: newW, error: wErr } = await supabase.from('workouts').insert({
        user_id: user.id,
        name: workout.name,
        rest_time: workout.restTime || 30
      }).select().single();
      if (wErr) throw wErr;

      const exercisesToInsert = workout.exercises.map((e, i) => ({
        workout_id: newW.id,
        exercise_id: e.exerciseId,
        order_index: i + 1,
        rest_seconds: e.restSeconds || 30
      }));

      const { error: eErr } = await supabase.from('workout_exercises').insert(exercisesToInsert);
      if (eErr) throw eErr;

      const fullWorkout = { ...newW, id: newW.id, favorite: false, exercises: workout.exercises };
      setWorkouts(prev => [fullWorkout, ...prev]);
      showToast('Treino criado com sucesso! 💪');
      return fullWorkout;
    } catch (err) { 
      showToast('Erro ao salvar treino. Tente novamente.', 'error'); 
    }
  }, [user, workouts, showToast, saveWorkoutsLocal]);

  const deleteWorkout = useCallback(async (id) => {
    if (user.isGuest) {
      const updated = workouts.filter(w => w.id !== id);
      setWorkouts(updated);
      saveWorkoutsLocal(updated);
      showToast('Treino excluído 🗑️');
      return;
    }
    try {
      const { error } = await supabase.from('workouts').delete().eq('id', id);
      if (error) throw error;
      setWorkouts(prev => prev.filter(w => w.id !== id));
      showToast('Treino excluído 🗑️');
    } catch (err) { 
      showToast('Erro ao excluir', 'error'); 
    }
  }, [user.isGuest, workouts, showToast, saveWorkoutsLocal]);

  const toggleFavorite = useCallback(async (id) => {
    const workout = workouts.find(w => w.id === id);
    if (!workout) return;
    const newFav = !workout.favorite;

    setWorkouts(prev => {
      const updated = prev.map(w => w.id === id ? { ...w, favorite: newFav } : w);
      if (user.isGuest) saveWorkoutsLocal(updated);
      return updated;
    });

    if (!user.isGuest) {
      try {
        const { error } = await supabase.from('workouts').update({ favorite: newFav }).eq('id', id);
        if (error) throw error;
      } catch (err) { 
        setWorkouts(prev => prev.map(w => w.id === id ? { ...w, favorite: !newFav } : w));
        showToast('Erro ao favoritar', 'error'); 
      }
    }
  }, [workouts, user.isGuest, showToast, saveWorkoutsLocal]);

  const addToHistory = useCallback(async (entry) => {
    if (!user.id) { 
      showToast('Treino concluído! (Faça login para salvar o histórico)', 'error'); 
      return; 
    }

    if (user.isGuest) {
      const newEntry = {
        id: Date.now().toString(),
        workoutId: entry.workoutId,
        workoutName: entry.workoutName,
        exerciseCount: entry.exerciseCount,
        totalDuration: entry.totalDuration,
        exercises: entry.exercises,
        completedAt: new Date().toISOString(),
      };
      const updated = [newEntry, ...history];
      setHistory(updated);
      try { localStorage.setItem(LS_HISTORY, JSON.stringify(updated)); } catch {}
      showToast('Treino registrado! 🏆');
      return;
    }

    try {
      const { data: newH, error } = await supabase.from('history').insert({
        user_id: user.id,
        workout_id: entry.workoutId,
        workout_name: entry.workoutName,
        exercise_count: entry.exerciseCount,
        total_duration: entry.totalDuration,
        exercises_data: entry.exercises
      }).select().single();
      if (error) throw error;

      const newEntry = {
        id: newH.id,
        workoutId: newH.workout_id,
        workoutName: newH.workout_name,
        exerciseCount: newH.exercise_count,
        totalDuration: newH.total_duration,
        exercises: newH.exercises_data,
        completedAt: newH.completed_at
      };
      setHistory(prev => [newEntry, ...prev]);
      showToast('Treino registrado no histórico! 🏆');
    } catch (err) { 
      showToast('Erro ao salvar histórico', 'error'); 
    }
  }, [user, history, showToast]);

  const logWeight = useCallback(async (newWeight) => {
    if (!user.id) return;

    const entry = {
      id: Date.now().toString(),
      user_id: user.id,
      weight: parseFloat(newWeight),
      created_at: new Date().toISOString(),
    };

    if (user.isGuest) {
      const updated = [entry, ...weightHistory];
      setWeightHistory(updated);
      try { localStorage.setItem(LS_WEIGHT, JSON.stringify(updated)); } catch {}
      updateProfile({ weight: parseFloat(newWeight) });
      showToast('Peso registrado! ⚖️');
      return;
    }

    try {
      const { data, error } = await supabase.from('weight_history').insert({
        user_id: user.id,
        weight: parseFloat(newWeight)
      }).select().single();
      if (error) throw error;
      setWeightHistory(prev => [data, ...prev]);
      updateProfile({ weight: parseFloat(newWeight) });
      showToast('Peso registrado com sucesso! ⚖️');
    } catch (err) {
      showToast('Erro ao registrar peso', 'error');
    }
  }, [user, weightHistory, showToast, updateProfile]);

  const saveGymProfile = useCallback((gym) => {
    setGyms(prev => {
      const isUpdate = prev.find(g => g.id === gym.id);
      let updated;
      if (isUpdate) {
        updated = prev.map(g => g.id === gym.id ? gym : g);
      } else {
        updated = [...prev, gym];
      }
      try { localStorage.setItem(LS_GYMS, JSON.stringify(updated)); } catch {}
      return updated;
    });
    if (!currentGymId) setCurrentGymId(gym.id);
  }, [currentGymId]);

  const deleteGymProfile = useCallback((id) => {
    setGyms(prev => {
      const updated = prev.filter(g => g.id !== id);
      try { localStorage.setItem(LS_GYMS, JSON.stringify(updated)); } catch {}
      return updated;
    });
    if (currentGymId === id) {
      setCurrentGymId(null);
    }
  }, [currentGymId]);

  const selectGym = useCallback((id) => {
    setCurrentGymId(id);
  }, []);

  const value = {
    user, workouts, history, weightHistory, gyms, currentGymId, toast, isLoaded,
    login, guestLogin, logout, updateProfile,
    createWorkout, deleteWorkout, toggleFavorite,
    addToHistory, logWeight, saveGymProfile, deleteGymProfile, selectGym, showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
