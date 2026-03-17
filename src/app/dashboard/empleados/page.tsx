"use client";

import { useState, useEffect } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/components/auth/AuthContext";
import { db, storage } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Loader2, LogOut, ClipboardCheck, Camera, CheckSquare, Building2, MapPin } from "lucide-react";

export default function EmpleadosDashboard() {
  const { user, logout } = useAuth();
  const [assignedContracts, setAssignedContracts] = useState<any[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // Modal para Reportes
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [reportText, setReportText] = useState("");
  const [reportImage, setReportImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      try {
        const q = query(collection(db, "contratos"), where("assignedStaffUid", "==", user.uid));
        const snaps = await getDocs(q);
        
        const tasks = snaps.docs.map(d => ({
           id: d.id,
           ...d.data()
        }));
        setAssignedContracts(tasks);
      } catch (e) {
        console.error("Error obteniendo tareas:", e);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [user]);

  const handleSubmitReport = async () => {
    if (!reportText) return alert("Escriba los detalles de la supervisión.");
    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (reportImage) {
        const fileRef = ref(storage, `reportes/${selectedContract.id}_${Date.now()}_${reportImage.name}`);
        const snapshot = await uploadBytes(fileRef, reportImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Guardar reporte en la subcolección
      const reportsRef = collection(db, "contratos", selectedContract.id, "reportes");
      await addDoc(reportsRef, {
         text: reportText,
         imageUrl,
         createdBy: user?.uid,
         timestamp: serverTimestamp()
      });

      alert("Reporte de supervisión enviado con éxito.");
      setShowReportModal(false);
      setReportText("");
      setReportImage(null);
    } catch (e) {
      console.error("Error subiendo reporte:", e);
      alert("No se pudo enviar el reporte.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Cabezal de Empleado */}
        <div className="bg-emerald-700 text-white pt-8 pb-16 px-4 md:px-8">
           <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div>
                 <h1 className="text-2xl font-bold flex items-center gap-2"><ClipboardCheck className="w-6 h-6"/> Mis Asignaciones</h1>
                 <p className="text-emerald-100 mt-1">Panel operativo de Limpieza México.</p>
              </div>
              <button onClick={logout} className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 px-4 py-2 rounded-lg font-semibold transition">
                <LogOut className="w-4 h-4" /> Salir del Turno
              </button>
           </div>
        </div>

        {/* Lista de Tareas */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-8 relative z-10">
           {loadingTasks ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-gray-100">
                 <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-4"/>
                 <p className="text-gray-500 font-medium">Sincronizando sus servicios asignados...</p>
              </div>
           ) : assignedContracts.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-gray-100">
                 <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4"/>
                 <h2 className="text-xl font-bold text-gray-800">Día Despejado</h2>
                 <p className="text-gray-500 mt-2">No tiene operativos ni servicios asignados en este momento. El administrador los derivará aquí cuando se requieran.</p>
              </div>
           ) : (
              <div className="space-y-4">
                 {assignedContracts.map(task => (
                    <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
                       <div>
                          <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md mb-3 uppercase tracking-wider">
                             Frecuencia: {task.contractTerm ? 'Contrato' : 'Evento Único'}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Building2 className="w-5 h-5 text-gray-400"/> {task.personName || "Cliente Corporativo"}</h3>
                          <div className="text-sm text-gray-600 mt-2 flex items-start gap-2 max-w-lg">
                             <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0"/>
                             <span>{task.fiscalAddress || "Dirección no especificada en el sistema."}</span>
                          </div>
                          <div className="mt-3 text-sm font-semibold text-gray-700 bg-gray-50 inline-block px-3 py-1.5 rounded-lg border border-gray-200">
                             Servicio: <span className="capitalize font-bold text-emerald-700">{task.serviceType}</span> ({task.staffCount} Operarios Requeridos)
                          </div>
                       </div>
                       
                       <div className="w-full md:w-auto flex-shrink-0 mt-4 md:mt-0">
                          <button 
                             onClick={() => { setSelectedContract(task); setShowReportModal(true); }}
                             className="w-full md:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                          >
                             <Camera className="w-5 h-5"/> Generar Reporte
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           )}
        </div>

        {/* Modal Generador de Reportes */}
        {showReportModal && (
           <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
                 <button onClick={() => { setShowReportModal(false); setReportImage(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                   X
                 </button>
                 <h2 className="text-xl font-bold text-gray-900 mb-1">Reporte de Supervisión</h2>
                 <p className="text-sm text-gray-500 mb-6">Mande su evaluación sobre el operativo en {selectedContract?.personName}.</p>

                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Comentarios y Observaciones <span className="text-red-500">*</span></label>
                       <textarea 
                          rows={4}
                          value={reportText}
                          onChange={e => setReportText(e.target.value)}
                          placeholder="El servicio se completó según el estándar. Áreas principales despejadas y..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-sm"
                       ></textarea>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Adjuntar Evidencia Fotográfica (Opcional)</label>
                       <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative overflow-hidden">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={e => setReportImage(e.target.files?.[0] || null)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {reportImage ? (
                             <div className="flex flex-col items-center">
                                <CheckSquare className="w-8 h-8 text-emerald-500 mb-2"/>
                                <span className="text-sm font-bold text-emerald-700">{reportImage.name} adjuntado</span>
                             </div>
                          ) : (
                             <div className="flex flex-col items-center">
                                <Camera className="w-8 h-8 text-gray-400 mb-2"/>
                                <span className="text-sm font-semibold text-gray-600">Presione para capturar o elegir foto</span>
                             </div>
                          )}
                       </div>
                    </div>
                 </div>

                 <button 
                   onClick={handleSubmitReport} 
                   disabled={isSubmitting}
                   className="w-full mt-8 bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 disabled:opacity-50 transition flex justify-center items-center gap-2"
                 >
                   {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Enviar Reporte al Web Portal"}
                 </button>
              </div>
           </div>
        )}
      </div>
    </AuthGuard>
  );
}
