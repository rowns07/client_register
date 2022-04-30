import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  // Auth, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut, 
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from "../services/firebase";

type User = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  //const sair = signOut(getAuth());

  // useEffect(() => {
  //   const unsubscribe = getAuth().onAuthStateChanged(user => {
  //     if (user) {
  //       const { displayName, photoURL, uid } = user;
  //       if (!displayName || !photoURL) {
  //         throw new Error('Missing information from Google Account.')
  //       }
  //       setUser({
  //         id: uid,
  //         name: displayName,
  //         avatar: photoURL
  //       })
  //     }
  //   })

  //   return () => {
  //     unsubscribe()
  //   }
  // }, []);

  const usuarioLogado= () =>{
    const unsubscribe =  onAuthStateChanged(auth, user => {
      if (user !== null) {

        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })

        console.log('logged in AUTH')
      } else {
        console.log('No user in AUTH')
      }
    })

    return () => {
      unsubscribe()
    }
  }

  useEffect(() => {
    usuarioLogado()
  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(getAuth(), provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
      console.log('User',user);
      navigate('/users');
    }
  }

  async function logOut() {
    await signOut(getAuth())
    navigate('/');
    console.log('SAIU', user);
  }

  return (

    <AuthContext.Provider value={{ user, signInWithGoogle, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}