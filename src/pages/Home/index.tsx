// import { FormEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { database } from "../services/firebase";
import { getDatabase, ref, set } from "firebase/database";

function writeUserData() {
  console.log('entrou no metodo')
  const db = getDatabase();
  set(ref(db, 'users/' + Math.floor(Math.random() * 10)), {
    username: 'name',
    email: 'email',
    profile_picture: 'imageUrl'
  });
  console.log('criou')
}




export function Home() {
  // const history = useNavigate();
  // const { signInWithGoogle, user } = useAuth();

  return (
    <div id="page-auth">
      <aside>
        <strong>Crie salas de aula ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo real</p>
      </aside>
      <button onClick={writeUserData}> BOTAO</button>
    </div>

  )
}


function useAuth(): { signInWithGoogle: any; user: any; } {
  throw new Error("Function not implemented.");
}
