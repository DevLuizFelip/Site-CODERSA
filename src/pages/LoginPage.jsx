import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mfaRequired, setMfaRequired] = useState(false); // <-- Novo estado para controlar o passo 2
  const { session } = useAuth();
  const navigate = useNavigate();

  // Se já houver uma sessão, redireciona para a dashboard

 useEffect(() => {
    // Se já houver uma sessão ativa, redireciona para a dashboard
    if (session) {
      navigate('/admin', { replace: true });
    }
  }, [session, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else if (data.session === null) {
      // Isso indica que o 2FA é necessário
      setMfaRequired(true);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  const handleMfaSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
          factorId: (await supabase.auth.mfa.listFactors()).data.totp[0].id,
          code: mfaCode
      });

      if (error) {
          setError(error.message);
      } else {
          // Força a atualização da sessão no AuthContext e redireciona
          window.location.href = '/admin';
      }
      setLoading(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      {!mfaRequired ? (
        <>
          <h2>Login da Dashboard</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="email" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </>
      ) : (
        <>
          <h2>Verificação de Dois Fatores</h2>
           <form onSubmit={handleMfaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p>Digite o código do seu aplicativo autenticador.</p>
            <input type="text" placeholder="Código de 6 dígitos" value={mfaCode} onChange={(e) => setMfaCode(e.target.value)} required />
            <button type="submit" disabled={loading}>{loading ? 'Verificando...' : 'Verificar'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default LoginPage;