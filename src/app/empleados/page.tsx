"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function EmpleadosLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor ingrese su usuario y contraseña.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Concatenar el dominio invisible generado por el Administrador
      const staffEmail = `${username.toLowerCase().trim()}@staff.limpiezamexico.com`;
      await signInWithEmailAndPassword(auth, staffEmail, password);
      router.push("/dashboard/empleados");
    } catch (err: any) {
      console.error("Error login empleados", err);
      setError("Credenciales incorrectas o usuario no encontrado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-emerald-700 -skew-y-3 transform origin-top-left -z-10 shadow-xl"></div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
           <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
             <CheckCircle2 className="w-8 h-8 text-emerald-600" />
           </div>
           <h1 className="text-2xl font-bold text-gray-900">Portal Operativo</h1>
           <p className="text-gray-500 text-sm mt-1">Acceso exclusivo para personal de Limpieza México.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-start gap-2 border border-red-100 font-medium">
             <ShieldAlert className="w-5 h-5 flex-shrink-0" />
             <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Usuario Asignado</label>
            <input 
              type="text" 
              placeholder="ej: carlos123"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 hover:bg-white transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña de Control</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 hover:bg-white transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-emerald-600/20 shadow-lg mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Iniciar Turno Seguramente"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-50 pt-6">
          <Link href="/" className="text-sm font-semibold text-gray-500 hover:text-emerald-600 transition">
             &larr; Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
