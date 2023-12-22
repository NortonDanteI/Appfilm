//guards/login_guard.tsx
'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usuario_controller_singleton } from '@/controllers/usuario_controller';
import { Usuario_bd } from '@/models/interface_usuario';
import { Usuario_model } from '@/models/usuario_model';

function Login_guard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    console.log("Login_guard; ")
    async function fetchData() {
      var user_model: Usuario_model = usuario_controller_singleton.obtenerUsuarioModel();
      let data: Usuario_bd | null = user_model.get_user();
      console.log("Login_guard; obteniendo data del user: ", data)

      if (data != null) {
        const result = await usuario_controller_singleton.Iniciar_sesion(data);
        console.log("Login_guard; ¿valido para ir home?: ", result)

        if (result == true) {
          router.push('/home');
        } else {
          alert("Login_guard; Credenciales no válidas.")
        }

      } else {
        console.log("Login_guard; No hay usuario almacenado en el localstore...")
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