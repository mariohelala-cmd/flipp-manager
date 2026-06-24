import { useState, useCallback } from 'react';

export function useToast() {
  const [msg, setMsg] = useState(null);
  const flash = useCallback((m) => {
    setMsg(m);
    setTimeout(() => setMsg(null), 2200);
  }, []);
  return { msg, flash };
}

export function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}
