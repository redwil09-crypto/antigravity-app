'use client';
import { useApp } from '@/context/AppContext';
import './ToastContainer.css';

export default function ToastContainer() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      <span>{toast.message}</span>
    </div>
  );
}
