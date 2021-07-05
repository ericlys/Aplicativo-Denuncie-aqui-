import React, {
  useState,
  useCallback,
  useContext,
  createContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signInAnonymous(nickname: string): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  // retirar tela de login enquando verifica
  const [loading, setLoading] = useState(true);

  // verificacao usuario
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@AppDenuncia:token',
        '@AppDenuncia:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const reponse = await api.post('sessions', { email, password });

    const { token, user } = reponse.data;

    await AsyncStorage.multiSet([
      ['@AppDenuncia:token', token],
      ['@AppDenuncia:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signInAnonymous = useCallback(async (nickname) => {
    const reponse = await api.post('sessions/anonymously', { nickname });

    const { token, user } = reponse.data;
    await AsyncStorage.multiSet([
      ['@AppDenuncia:token', token],
      ['@AppDenuncia:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await api.post('sessions/anonymously/invalidate');
    await AsyncStorage.multiRemove(['@AppDenuncia:token', '@AppDenuncia:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@AppDenuncia:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signIn,
        signInAnonymous,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
