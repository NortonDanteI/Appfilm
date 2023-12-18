//guards/login_guard.tsx
'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usuarioController } from '@/controllers/usuario_controller';
import { Usuario_bd } from '@/models/interface_usuario';
import { Usuario_model } from '@/models/usuario_model';

function Login_guard({ children }: { children: React.ReactNode }) {
  console.log("Login_guard; ")
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      var user_model: Usuario_model | undefined = usuarioController.obtenerUsuarioModel();
      //si el usuario no esta definido, inicializar.
      if (user_model === undefined) {
        console.log("Login_guard; Inicializando usuario...");
        const usuario: Usuario_bd = { username: "", password: "" };
        usuarioController.setUsuarioModel(usuario);
        user_model = usuarioController.obtenerUsuarioModel();
      } else {
        console.log("Login_guard; Ya existe un usuario en el controller, no necesita inicializar.")
      }

      //si el usuario esta difinido...
      if (user_model != undefined) {
        let data: Usuario_bd | null = user_model.get_user();
        console.log("Login_guard; obteniendo data del user: ", data)

        if (data != null) {
          const result = await usuarioController.Iniciar_sesion(data);
          console.log("Login_guard; ¿valido para ir home?: ", result)
    
          if (result == true) {
            router.push('/home');
          } else {
            alert("Login_guard; Credenciales no válidas.")
          }
          
        } else {
          console.log("Login_guard; No hay usuario almacenado en el localstore...")
        }
      } else {
        console.log("Login_guard; el usuario es undefined...")
      }
    }

    fetchData();
  }, [router]);

  return (
    <>
      {children}
    </>
  );
}

export default Login_guard;