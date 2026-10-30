import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
export default function AuthLayout() {
  useEffect(() => {
    document.title = 'Acesso administrativo | CODERSA';
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'robots'; document.head.appendChild(meta); }
    meta.content = 'noindex,nofollow';
  }, []);
  return <AuthProvider><Outlet/></AuthProvider>;
}
