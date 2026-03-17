"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertCircle, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthContext";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard/cliente");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.app.options.apiKey === "mock_api_key") {
      setError("Este es un entorno de demostración sin credenciales reales de Firebase. Use cualquier cuenta para una simulación visual, o configure Firebase en src/lib/firebase.ts para conectar la base de datos.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (!phoneNumber || phoneNumber.length < 10) {
           setError("Por favor ingrese un número de WhatsApp válido a 10 dígitos para poder registrarse.");
           setLoading(false);
           return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Crear documento del usuario en Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          whatsapp: phoneNumber,
          role: "cliente", // Por defecto todos son clientes
          createdAt: new Date().toISOString()
        });

        // Hilo Asíncrono 1: Enviar correo a administradores
        fetch("/api/notify", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
              action: "new_user",
              data: { email: userCredential.user.email, whatsapp: phoneNumber, uid: userCredential.user.uid }
           })
        }).catch(console.error);
        
        // Hilo Asíncrono 2: Intentar vincular historial Offline
        fetch("/api/link-user", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ newUid: userCredential.user.uid, email: userCredential.user.email })
        }).then(res => res.json()).then(data => console.log("Motor de Vinculación:", data.message)).catch(console.error);

      }
      router.push("/dashboard/cliente");
    } catch (err: any) {
      setError(err.message || "Error al autenticar");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (auth.app.options.apiKey === "mock_api_key") {
      setError("Autenticación con Google requiere credenciales reales de Firebase.");
      return;
    }
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Checar si el usuario ya existe en Firestore
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: result.user.email,
          role: "cliente",
          createdAt: new Date().toISOString()
        });

        fetch("/api/notify", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
              action: "new_user",
              data: { email: result.user.email, whatsapp: "Google Login", uid: result.user.uid }
           })
        }).catch(console.error);
      }

      // Siempre intentar vincular al Iniciar Sesión con Google por primera vez / o reconexiones
      fetch("/api/link-user", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ newUid: result.user.uid, email: result.user.email })
      }).catch(console.error);
      
      router.push("/dashboard/cliente");
    } catch (err: any) {
      setError(err.message || "Error con Google Auth");
    }
  };

  const handleMockLogin = () => {
    // Si la db está mockeada, enviamos directo al dashboard como demo.
    router.push("/dashboard/cliente");
  }

  const handlePasswordReset = async () => {
    if (auth.app.options.apiKey === "mock_api_key") {
      setError("Este es un entorno de demostración. La recuperación de contraseña requiere conexión real a Firebase.");
      return;
    }

    if (!email) {
      setError("Por favor, ingrese su correo electrónico en el campo superior para enviarle el enlace de recuperación.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg(`Se ha enviado un enlace de recuperación a ${email}. Revise su bandeja de entrada o spam.`);
    } catch (err: any) {
      // Firebase throws 'auth/user-not-found' if email doesn't exist, but for security, 
      // it's often better to just say it was sent. Here we'll show actual errors for clarity during development.
      if (err.code === 'auth/user-not-found') {
         setError("No se encontró ninguna cuenta con este correo electrónico.");
      } else if (err.code === 'auth/invalid-email') {
         setError("El correo electrónico no tiene un formato válido.");
      } else {
         setError("Error al enviar el correo de recuperación. Intente más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-24">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? "Acceda a su Portal" : "Crear una cuenta"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? "¿No tiene cuenta? " : "¿Ya tiene cuenta? "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-emerald-600 hover:text-emerald-500">
            {isLogin ? "Regístrese aquí" : "Inicie sesión"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          
          {error && (
            <div className="mb-4 bg-red-50 p-4 rounded-md flex gap-3 text-red-800 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 bg-emerald-50 p-4 rounded-md flex gap-3 text-emerald-800 text-sm">
              <Mail className="w-5 h-5 flex-shrink-0" />
              <p>{successMsg}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleEmailAuth}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border outline-none transition-all"
                  placeholder="usted@empresa.com"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp de Contacto <span className="text-gray-400 text-xs font-normal">(Obligatorio)</span></label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border outline-none transition-all"
                    placeholder="10 dígitos (Ej. 5512345678)"
                    maxLength={10}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Recordarme </label>
                </div>

                <div className="text-sm">
                  <button 
                    type="button" 
                    onClick={handlePasswordReset}
                    className="font-medium text-emerald-600 hover:text-emerald-500 bg-transparent border-none p-0 cursor-pointer"
                  > 
                    ¿Olvidó su contraseña? 
                  </button>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                onClick={auth.app.options.apiKey === "mock_api_key" ? handleMockLogin : undefined}
              >
                {loading ? "Cargando..." : (isLogin ? "Iniciar Sesión" : "Registrarse")}
              </button>
            </div>
            
            {(auth.app.options.apiKey === "mock_api_key") && (
              <div className="mt-2 text-center">
                 <button
                  type="button"
                  onClick={handleMockLogin}
                  className="text-xs text-gray-500 hover:text-emerald-600 underline flex items-center justify-center gap-1 mx-auto"
                >
                  Modo de prueba: Entrar directo al Dashboard <ArrowRight className="w-3 h-3"/>
                </button>
              </div>
            )}
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500"> O continuar con </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleAuth}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 bg-white" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                <span className="ml-2">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
