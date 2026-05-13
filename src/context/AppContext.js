'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

const AppContext = createContext(null);

const defaultUser = {
  id: null,
  name: 'Aluno',
  email: '',
  level: 'Iniciante',
  weight: null,
  height: null,
  isLoggedIn: false,
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [workouts, setWorkouts] = useState([]);
  const [history, setHistory] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Fetch initial data & listen to auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) handleUserSession(session.user);
      else setIsLoaded(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) handleUserSession(session.user);
      else {
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
      // 1. Fetch Profile
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', authUser.id).single();
      if (profile) {
        setUser({ id: authUser.id, name: profile.name || 'Aluno', email: authUser.email, level: profile.level, weight: profile.weight, height: profile.height, isLoggedIn: true });
      } else {
        setUser({ id: authUser.id, name: authUser.user_metadata?.name || 'Aluno', email: authUser.email, level: 'Iniciante', weight: null, height: null, isLoggedIn: true });
      }
      
      // 2. Fetch Workouts with Exercises
      const { data: wData } = await supabase.from('workouts').select('*, exercises:workout_exercises(*)').order('created_at', { ascending: false });
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

      // 3. Fetch History
      const { data: hData } = await supabase.from('history').select('*').order('completed_at', { ascending: false });
      if (hData) setHistory(hData.map(h => ({
        id: h.id,
        workoutId: h.workout_id,
        workoutName: h.workout_name,
        exerciseCount: h.exercise_count,
        totalDuration: h.total_duration,
        exercises: h.exercises_data,
        completedAt: h.completed_at
      })));

      // 4. Fetch Weight History
      const { data: whData } = await supabase.from('weight_history').select('*').order('created_at', { ascending: false });
      if (whData) setWeightHistory(whData);
    } catch (e) { 
      console.error('Error fetching data from Supabase:', e); 
    }
    setIsLoaded(true);
  };

  const login = useCallback(async (name, email, password, isRegister, level, weight, height) => {
    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({ 
          email, password, 
          options: { data: { name } } 
        });
        if (error) throw error;
        
        // Atualiza o perfil com nível, peso e altura se fornecidos
        if (data?.user?.id && (level !== 'Iniciante' || weight || height)) {
           const profileUpdate = { level };
           if (weight) profileUpdate.weight = parseFloat(weight);
           if (height) profileUpdate.height = parseFloat(height);
           
           const { error: profileErr } = await supabase.from('profiles').update(profileUpdate).eq('id', data.user.id);
           if (profileErr) console.error('Erro ao atualizar perfil com peso/altura:', profileErr);
        }
        showToast(`Conta criada com sucesso! Bem-vindo(a) ${name}! 🎉`);
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
    await supabase.auth.signOut();
    showToast('Até logo! 👋');
  }, [showToast]);

  const updateProfile = useCallback(async (updates) => {
    if (!user.id) return;
    try {
      const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);
      if (error) throw error;
      setUser(prev => ({ ...prev, ...updates }));
      showToast('Perfil atualizado! ✅');
    } catch (err) { 
      showToast('Erro ao atualizar perfil', 'error'); 
    }
  }, [user.id, showToast]);

  const createWorkout = useCallback(async (workout) => {
    if (!user.id) { 
      showToast('Faça login para salvar treinos', 'error'); 
      return; 
    }
    try {
      // 1. Create Workout
      const { data: newW, error: wErr } = await supabase.from('workouts').insert({
        user_id: user.id,
        name: workout.name,
        rest_time: workout.restTime || 30
      }).select().single();
      if (wErr) throw wErr;

      // 2. Add Exercises to Workout
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
  }, [user.id, showToast]);

  const deleteWorkout = useCallback(async (id) => {
    try {
      const { error } = await supabase.from('workouts').delete().eq('id', id);
      if (error) throw error;
      setWorkouts(prev => prev.filter(w => w.id !== id));
      showToast('Treino excluído 🗑️');
    } catch (err) { 
      showToast('Erro ao excluir', 'error'); 
    }
  }, [showToast]);

  const toggleFavorite = useCallback(async (id) => {
    const workout = workouts.find(w => w.id === id);
    if (!workout) return;
    const newFav = !workout.favorite;
    
    // Optimistic UI update
    setWorkouts(prev => prev.map(w => w.id === id ? { ...w, favorite: newFav } : w));
    
    try {
      const { error } = await supabase.from('workouts').update({ favorite: newFav }).eq('id', id);
      if (error) throw error;
    } catch (err) { 
      // Revert if error
      setWorkouts(prev => prev.map(w => w.id === id ? { ...w, favorite: !newFav } : w));
      showToast('Erro ao favoritar', 'error'); 
    }
  }, [workouts, showToast]);

  const addToHistory = useCallback(async (entry) => {
    if (!user.id) { 
      showToast('Treino concluído! (Faça login para salvar o histórico)', 'error'); 
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
  }, [user.id, showToast]);

  const logWeight = useCallback(async (newWeight) => {
    if (!user.id) return;
    try {
      const { data: entry, error } = await supabase.from('weight_history').insert({
        user_id: user.id,
        weight: parseFloat(newWeight)
      }).select().single();
      
      if (error) throw error;
      
      setWeightHistory(prev => [entry, ...prev]);
      
      // Update profile with latest weight
      updateProfile({ weight: parseFloat(newWeight) });
      showToast('Peso registrado com sucesso! ⚖️');
    } catch (err) {
      showToast('Erro ao registrar peso', 'error');
    }
  }, [user.id, showToast, updateProfile]);

  const value = {
    user, workouts, history, weightHistory, toast, isLoaded,
    login, logout, updateProfile,
    createWorkout, deleteWorkout, toggleFavorite,
    addToHistory, logWeight, showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
