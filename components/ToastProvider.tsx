'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type ToastVariant = 'success' | 'error';
type Toast = { id: string; message: string; variant: ToastVariant; closing?: boolean };
type ToastInput = { message: string; variant?: ToastVariant; durationMs?: number };
type ToastContextValue = {
  notify: (input: ToastInput) => void;
  success: (message: string, durationMs?: number) => void;
  error: (message: string, durationMs?: number) => void;
};

// Holds toast dispatch helpers for any client component.
const ToastContext = createContext<ToastContextValue | null>(null);

function makeId() {
  // Prefer crypto-safe IDs to avoid collisions when toasts fire quickly.
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const toastBaseClasses =
    'rounded-lg border px-3 py-2 text-sm shadow-lg backdrop-blur animate-[toast-in_220ms_cubic-bezier(.22,1,.36,1)]';
  const toastVariantClasses: Record<ToastVariant, string> = {
    success:
      'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/30 dark:text-emerald-100',
    error:
      'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/30 dark:text-rose-100',
  };

  const remove = useCallback((id: string) => {
    setToast((prev) => (prev && prev.id === id ? { ...prev, closing: true } : prev));
    window.setTimeout(() => {
      setToast((prev) => (prev && prev.id === id ? null : prev));
    }, 180);
  }, []);

  const notify = useCallback(
    ({ message, variant = 'success', durationMs = 2400 }: ToastInput) => {
      const id = makeId();
      // Replace any existing toast and auto-expire after a short delay.
      setToast({ id, message, variant });
      window.setTimeout(() => remove(id), durationMs);
    },
    [remove]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      notify,
      success: (message, durationMs) => notify({ message, variant: 'success', durationMs }),
      error: (message, durationMs) => notify({ message, variant: 'error', durationMs }),
    }),
    [notify]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-16 z-[60] w-[min(90vw,360px)]">
        <div
          role="status"
          aria-live={toast?.variant === 'error' ? 'assertive' : 'polite'}
        >
          {toast && (
          <div
            key={toast.id}
            className={`${toastBaseClasses} ${
              toast.closing
                ? 'animate-[toast-out_180ms_ease-in_forwards]'
                : 'animate-[toast-in_220ms_cubic-bezier(.22,1,.36,1)]'
            } ${toastVariantClasses[toast.variant]}`}
          >
            {toast.message}
          </div>
          )}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
