import { createContext, ReactNode, useState } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '@/services/apiClient';

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  }catch{
    alert("Erro ao deslogar")
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  async function signIn( { email, password }: SignInProps){
    try{
      const response = await api.post('/session', {
        email,
        password
      })
      //console.log(response.data)

      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, //Expirar em 1 mes o token
        path: "/" //Quais caminhos terao acesso ao cookie, no caso apenas / significa que todos terão
      })

      setUser({
        id,
        name,
        email 
      })

      //Passar para as outras requisicoes o token junto:
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      //Depois de logar, redirecionar o usuario até a /dashboards dos pedidos
      Router.push('/dashboard')

    }catch(err){
      console.log("ERRO AO ACESSAR ", err)
    }
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}