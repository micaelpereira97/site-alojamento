import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/lib/firebase';
import { ShieldCheck, Lock, Mail, AlertCircle, UserPlus } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);

  const handleCreateTestUser = async () => {
    setCreatingUser(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, 'admin@recanto.pt', 'admin123');
      alert('✅ Utilizador de teste criado com sucesso!\n\nEmail: admin@recanto.pt\nPassword: admin123\n\nAgora pode fazer login.');
      setEmail('admin@recanto.pt');
      setPassword('admin123');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        alert('ℹ️ O utilizador de teste já existe!\n\nEmail: admin@recanto.pt\nPassword: admin123');
        setEmail('admin@recanto.pt');
        setPassword('admin123');
      } else {
        console.error('Firebase error:', err);
        setError('Erro Firebase: ' + err.message + '\n\nClique em "Modo Dev" abaixo para aceder sem Firebase.');
      }
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDevModeLogin = () => {
    // Development bypass - skips Firebase authentication
    if (email === 'admin@recanto.pt' && password === 'admin123') {
      alert('✅ Login em Modo Desenvolvimento\n\n⚠️ Firebase não está disponível, mas pode aceder ao dashboard.');
      onLoginSuccess();
    } else {
      setError('Modo Dev: Use admin@recanto.pt / admin123');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error('Login error:', err);

      // Portuguese error messages
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/user-not-found':
          setError('Utilizador não encontrado. Clique no botão abaixo para criar o utilizador de teste.');
          break;
        case 'auth/wrong-password':
          setError('Password incorreta');
          break;
        case 'auth/too-many-requests':
          setError('Demasiadas tentativas. Tente mais tarde.');
          break;
        case 'auth/invalid-credential':
          setError('Credenciais inválidas. Clique no botão abaixo para criar o utilizador de teste.');
          break;
        default:
          setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full text-blue-700">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-stone-800">Área do Proprietário</h3>
          <p className="text-sm text-stone-500">Autenticação necessária</p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="seu.email@exemplo.com"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              A autenticar...
            </>
          ) : (
            <>
              <ShieldCheck size={18} />
              Entrar
            </>
          )}
        </button>
      </form>

      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={handleDevModeLogin}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
        >
          <ShieldCheck size={18} />
          Aceder em Modo Dev (Sem Firebase)
        </button>

        <button
          type="button"
          onClick={handleCreateTestUser}
          disabled={creatingUser || loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
        >
          {creatingUser ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              A criar utilizador...
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Criar Utilizador Firebase
            </>
          )}
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-stone-200">
        <p className="text-xs text-stone-500 text-center">
          💡 <strong>Credenciais de teste:</strong><br />
          Email: <code className="bg-stone-100 px-2 py-0.5 rounded">admin@recanto.pt</code><br />
          Password: <code className="bg-stone-100 px-2 py-0.5 rounded">admin123</code>
        </p>
        <div className="mt-3 space-y-1">
          <p className="text-xs text-orange-600 text-center font-medium">
            🚀 Acesso Rápido: Clique no botão LARANJA "Modo Dev"
          </p>
          <p className="text-xs text-stone-400 text-center">
            (Funciona sem Firebase Emulators)
          </p>
        </div>
      </div>
    </div>
  );
};
