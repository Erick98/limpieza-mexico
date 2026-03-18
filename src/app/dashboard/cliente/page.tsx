"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { Clock, FileText, Settings, Star, UserCircle, LogOut, CheckCircle2, Loader2, Calendar, MessageCircle, AlertCircle, X, Save, Phone, Camera, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot, doc, getDoc, updateDoc, getDocs } from "firebase/firestore";

export default function ClienteDashboard() {
  const { user, logout } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [companySettings, setCompanySettings] = useState({
    contactoWhatsapp: "525512345678" // fallback base
  });

  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedContractReports, setSelectedContractReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [activeReportContext, setActiveReportContext] = useState<any>(null);
  
  const [recentGlobalReports, setRecentGlobalReports] = useState<any[]>([]);

  // Phase 1: Cotizaciones State
  const [quotations, setQuotations] = useState<any[]>([]);
  const [showQuoteViewer, setShowQuoteViewer] = useState(false);
  const [activeQuote, setActiveQuote] = useState<any>(null);
  const [isAcceptingQuote, setIsAcceptingQuote] = useState(false);

  const handleAcceptQuote = async (quote: any) => {
    setIsAcceptingQuote(true);
    try {
      await updateDoc(doc(db, "cotizaciones", quote.id), { status: "aceptada_por_cliente" });
      alert("Presupuesto aceptado exitosamente. El área administrativa ha sido notificada para proceder legalmente con su contrato.");
      setShowQuoteViewer(false);
    } catch (err) {
      console.error("Error aceptando cotización:", err);
      alert("Hubo un error procesando tu aceptación.");
    } finally {
      setIsAcceptingQuote(false);
    }
  };

  const handleViewReports = async (svc: any) => {
    setActiveReportContext(svc);
    setShowReportModal(true);
    setLoadingReports(true);
    setSelectedContractReports([]);
    try {
      const q = query(collection(db, "contratos", svc.id, "reportes"));
      const snaps = await getDocs(q);
      const reps = snaps.docs.map(d => ({ id: d.id, ...d.data() }));
      reps.sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setSelectedContractReports(reps);
    } catch (err) {
      console.error("Error obteniendo reportes:", err);
    } finally {
      setLoadingReports(false);
    }
  };

  const handleViewSingleReport = (rep: any) => {
    setActiveReportContext(rep.contractContext);
    setSelectedContractReports([rep]);
    setShowReportModal(true);
  };

  const userEmail = user?.email || "Cargando...";

  useEffect(() => {
    if (!user) return;

    // 1. Obtener los datos del usuario para el perfil (Miembro desde)
    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    fetchUser();

    // 2. Suscribirse a los contratos de este usuario en específico
    const q = query(
      collection(db, "contratos"), 
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setContracts(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching contracts snapshot:", error);
      setLoading(false);
    });

    // 3. Obtener el teléfono global de la empresa
    const companyRef = doc(db, "settings", "company");
    const unsubCompany = onSnapshot(companyRef, (docSnap) => {
      if (docSnap.exists()) {
        setCompanySettings(docSnap.data() as any);
      }
    });

    // 4. Suscribirse a las cotizaciones del usuario
    const qQuotes = query(collection(db, "cotizaciones"), where("userId", "==", user.uid));
    const unsubQuotes = onSnapshot(qQuotes, (querySnapshot) => {
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() as any }));
      data.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      setQuotations(data);
    });

    return () => {
       unsubscribe();
       unsubCompany();
       unsubQuotes();
    };
  }, [user]);

  // Obtener reportes globales de la última semana
  useEffect(() => {
    if (contracts.length === 0) return;

    const fetchRecentReports = async () => {
      try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        
        let allReports: any[] = [];
        
        for (const svc of contracts) {
          const q = query(collection(db, "contratos", svc.id, "reportes"));
          const snaps = await getDocs(q);
          const reps = snaps.docs.map(d => ({ 
             id: d.id, 
             serviceName: svc.serviceType === "contrato" ? "Contrato Recurrente" : "Por Evento",
             contractContext: svc,
             ...d.data() 
          }));
          allReports = [...allReports, ...reps];
        }

        // Filter last 7 days and sort latest first
        const recent = allReports.filter((r: any) => {
           if (!r.timestamp) return true;
           const repDate = new Date(r.timestamp.seconds * 1000);
           return repDate >= lastWeek;
        });

        recent.sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
        setRecentGlobalReports(recent);

      } catch (err) {
        console.error("Error obteniendo reportes recientes:", err);
      }
    };

    fetchRecentReports();
  }, [contracts]);

  const memberSince = userData?.createdAt 
    ? new Date(userData.createdAt).toLocaleDateString("es-MX", { month: 'short', year: 'numeric' }).toUpperCase()
    : "----------";

  const numActiveServices = contracts.filter(c => c.status === "aprobado").length;

  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [isSavingPhone, setIsSavingPhone] = useState(false);

  const handleSavePhone = async () => {
    if (!user) return;
    if (!newPhone || newPhone.length < 10) {
      alert("Por favor ingrese un número válido a 10 dígitos.");
      return;
    }

    setIsSavingPhone(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { phone: newPhone });
      setUserData({ ...userData, phone: newPhone });
      setShowPhoneModal(false);
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      alert("Hubo un error al actualizar el teléfono.");
    } finally {
      setIsSavingPhone(false);
    }
  };

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portal de Cliente</h1>
          <p className="text-gray-500 mt-1">Bienvenido de vuelta, {userEmail}</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition">
            <Settings className="w-5 h-5" /> Ajustes
          </button>
          <button 
            onClick={logout}
            className="flex items-center gap-2 bg-red-50 text-red-600 font-semibold px-4 py-2 rounded-lg hover:bg-red-100 transition"
          >
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle className="w-16 h-16 text-emerald-500" />
              <div>
                <h3 className="font-bold text-lg text-gray-900 w-32 truncate" title={userEmail}>{userEmail.split('@')[0]}</h3>
                <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-md">Cuenta Activa</span>
              </div>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex justify-between border-b pb-2"><span>Miembro desde:</span> <span className="font-medium text-gray-900">{memberSince}</span></p>
              <p className="flex justify-between border-b pb-2"><span>Servicios activos:</span> <span className="font-medium text-gray-900">{numActiveServices}</span></p>
              <p className="flex justify-between pb-2"><span>Servicios totales:</span> <span className="font-medium text-gray-900">{contracts.length}</span></p>
            </div>
          </div>
          
          <Link 
            href="/dashboard/cliente/contratar"
            className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-md transition-all text-center"
          >
            + Contratar Nuevo Servicio
          </Link>
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-2 space-y-8">

          {/* Aviso Completar Perfil (WhatsApp) */}
          {userData && !userData.phone && (
             <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600 flex-shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-orange-900 font-bold">Complete su información de contacto</h3>
                  <p className="text-orange-700 text-sm mt-1">Para brindarle un mejor servicio y notificaciones de arribo, por favor agregue su número de WhatsApp en sus ajustes de perfil.</p>
                </div>
                <button 
                  onClick={() => setShowPhoneModal(true)}
                  className="whitespace-nowrap bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm"
                >
                  Actualizar Perfil
                </button>
             </div>
          )}
          
          {/* Dashboard Body / Active Quotes */}
          {quotations.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="w-6 h-6 text-emerald-600"/> Mis Cotizaciones y Presupuestos</h2>
              <div className="grid grid-cols-1 gap-4">
                {quotations.map(q => (
                  <div key={q.id} className={`bg-white p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${q.status === 'enviada' ? 'border-orange-200 border-l-4 border-l-orange-500 bg-orange-50/30' : 'border-gray-200 border-l-4 border-l-gray-400'}`}>
                     <div>
                       <h4 className="font-bold text-lg text-gray-900 mb-1">Presupuesto Comercial {q.id}</h4>
                       <p className="text-gray-500 text-sm">Servicio: <span className="capitalize font-semibold text-gray-700">{q.serviceType?.replace('-', ' ')}</span></p>
                       <p className="text-emerald-700 font-black mt-2 text-xl">${(q.amount || 0).toLocaleString()} <span className="text-xs font-normal text-gray-500">MXN</span></p>
                     </div>
                     <div className="flex flex-col items-end gap-2">
                       <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${q.status === 'enviada' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}>
                         {q.status === 'enviada' ? 'Requiere tu revisión ✅' : (q.status === 'aceptada_por_cliente' ? 'Procesando Acuerdo...' : q.status.toUpperCase())}
                       </span>
                       <button onClick={() => { setActiveQuote(q); setShowQuoteViewer(true); }} className="px-5 py-2.5 mt-2 bg-gray-900 text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition shadow-md w-full sm:w-auto">
                         {q.status === 'enviada' ? 'Revisar Detalle' : 'Ver Archivo'}
                       </button>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dashboard Body / Active Services */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mis Servicios Operativos</h2>
            
            {loading ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-gray-500">
                 <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500"/>
                 <p>Cargando información de sus operarios...</p>
              </div>
            ) : contracts.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500">
                 <Calendar className="w-12 h-12 mb-4 text-gray-300"/>
                 <h3 className="text-lg font-bold text-gray-700 mb-1">Aún no hay servicios activos</h3>
                 <p className="text-center text-sm mb-6">Para agendar un operativo o programar su primer ciclo de limpieza, diríjase al Wizard de Contratación.</p>
                 <Link href="/dashboard/cliente/contratar" className="font-bold text-emerald-600 hover:underline">Ir a Contratar &rarr;</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {contracts.map((svc) => (
                  <div key={svc.id} className={`bg-white p-6 rounded-2xl shadow-sm border flex flex-col sm:flex-row justify-between gap-4 ${svc.status === 'aprobado' ? 'border-emerald-100 border-l-4 border-l-emerald-500' : 'border-gray-200 border-l-4 border-l-orange-400'}`}>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1">
                        {svc.serviceType === "contrato" ? "Contrato Recurrente" : "Limpieza Por Evento"}
                      </h4>
                      <p className="text-gray-500 text-sm mb-3">
                        {svc.staffCount} Operadores ({svc.shiftType === "medio" ? "Mensualidad" : "Tiempo Completo"})
                        {svc.contractTerm && ` • Plazo: ${svc.contractTerm} meses`}
                      </p>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${svc.status === 'aprobado' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
                        {svc.status === 'aprobado' ? (
                           <><Clock className="w-4 h-4" /> El equipo está programado</>
                        ) : (
                           <><Clock className="w-4 h-4" /> Pendiente de Aprobación Admin / Firma</>
                        )}
                      </span>
                    </div>
                      <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:items-end min-w-[140px]">
                         <span className={`font-bold flex items-center justify-start sm:justify-end gap-1 ${svc.status === 'aprobado' ? 'text-emerald-600' : 'text-orange-500'}`}>
                           <CheckCircle2 className="w-5 h-5"/> {svc.status.toUpperCase()}
                         </span>
                         
                         {svc.status === 'aprobado' && (
                             <button
                               onClick={() => handleViewReports(svc)}
                               className="flex items-center justify-center gap-2 px-4 py-2 mt-1 text-sm font-bold border-2 border-emerald-100 text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition shadow-sm w-full"
                             >
                                <ClipboardCheck className="w-4 h-4" /> Ver Reportes Reales
                             </button>
                         )}

                         <a 
                           href={`https://wa.me/${companySettings.contactoWhatsapp}?text=${encodeURIComponent(`Hola Limpieza México, necesito soporte con mi servicio ID: ${svc.id}. Soy ${userEmail}.`)}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center justify-center gap-2 px-4 py-2 mt-2 text-sm font-bold bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition shadow-sm w-full"
                         >
                           <MessageCircle className="w-4 h-4" /> WhatsApp Soporte
                         </a>
                      </div>
                    </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Reports from Last 7 Days */}
          {contracts.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Últimos Reportes (Última Semana)</h2>
                <button className="text-emerald-600 font-medium text-sm hover:underline">Ver todos</button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio Evaluado</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentGlobalReports.length === 0 ? (
                       <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-400 font-medium">No se han generado reportes en los últimos 7 días.</td></tr>
                    ) : recentGlobalReports.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                           {row.timestamp ? new Date(row.timestamp.seconds * 1000).toLocaleDateString() : 'Reciente'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                           {row.serviceName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                          <button onClick={() => handleViewSingleReport(row)} className="text-emerald-600 hover:text-emerald-900 flex items-center justify-end w-full gap-1.5 font-bold"><ClipboardCheck className="w-4 h-4"/> Ver</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal de Reportes Fotográficos */}
      {showReportModal && (
         <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
               <button onClick={() => setShowReportModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                 <X className="w-6 h-6"/>
               </button>
               <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <ClipboardCheck className="w-6 h-6 text-emerald-600"/> 
                  Reportes de Supervisión
               </h2>
               <p className="text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">Evaluaciones de su servicio: <span className="font-bold text-emerald-700 capitalize">{activeReportContext?.serviceType}</span></p>

               <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                  {loadingReports ? (
                     <div className="py-12 text-center text-gray-500">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-4"/>
                        Obteniendo bitácora operativa...
                     </div>
                  ) : selectedContractReports.length === 0 ? (
                     <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                        <Camera className="w-12 h-12 mx-auto mb-4 text-gray-200"/>
                        <p className="font-medium text-gray-600">Aún no hay reportes de campo para este servicio o contrato.</p>
                     </div>
                  ) : (
                     selectedContractReports.map((rep) => (
                        <div key={rep.id} className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                           <div className="flex justify-between items-start mb-3">
                              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md flex items-center gap-1">
                                 <CheckCircle2 className="w-3 h-3"/> Evaluado
                              </span>
                              <span className="text-xs font-mono text-gray-500">
                                 {rep.timestamp ? new Date(rep.timestamp.seconds * 1000).toLocaleString() : 'Reciente'}
                              </span>
                           </div>
                           <p className="text-gray-800 text-sm whitespace-pre-wrap">{rep.text}</p>
                           {rep.imageUrl && (
                              <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 bg-white">
                                 <img src={rep.imageUrl} alt="Evidencia Operativa" className="w-full h-auto object-cover max-h-64" loading="lazy" />
                              </div>
                           )}
                        </div>
                     ))
                  )}
               </div>
               
               <div className="mt-6 pt-4 border-t border-gray-100">
                  <button onClick={() => setShowReportModal(false)} className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">Cerrar Visor</button>
               </div>
            </div>
         </div>
      )}

      {/* --- MODAL ACTUALIZAR TELEFONO --- */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
             <button onClick={() => setShowPhoneModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
               <X className="w-5 h-5"/>
             </button>
             <h2 className="text-xl font-bold text-gray-900 mb-2">WhatsApp de Contacto</h2>
             <p className="text-sm text-gray-500 mb-6">Agregue su número a 10 dígitos para recibir notificaciones sobre su servicio.</p>
             
             <div className="space-y-4">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border outline-none transition-all"
                    placeholder="Ej. 5512345678"
                    maxLength={10}
                  />
                </div>
             </div>

             <div className="mt-6 flex justify-end gap-3">
               <button onClick={() => setShowPhoneModal(false)} className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg">Cancelar</button>
               <button onClick={handleSavePhone} disabled={isSavingPhone} className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition">
                 {isSavingPhone ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>} Guardar
               </button>
             </div>
           </div>
        </div>
      )}

      {/* --- VISOR DE COTIZACIÓN PARA EL CLIENTE --- */}
      {showQuoteViewer && activeQuote && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 flex flex-col">
            <button onClick={() => setShowQuoteViewer(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition">
              <X className="w-5 h-5"/>
            </button>
            <h2 className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-2">
              <FileText className="w-6 h-6 text-emerald-600"/> Detalle de Presupuesto
            </h2>
            <p className="text-sm text-gray-500 mb-6">Cotización formal emitida por el equipo corporativo de Limpieza México.</p>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
               <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">ID Cotización</p>
                    <p className="font-mono font-black text-gray-800">{activeQuote.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Fecha de Emisión</p>
                    <p className="font-semibold text-gray-800">{activeQuote.createdAt ? new Date(activeQuote.createdAt).toLocaleDateString() : 'N/A'}</p>
                  </div>
               </div>

               <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Conceptos Incluidos</p>
               <ul className="space-y-3 mb-6">
                 {activeQuote.concepts?.map((c: any, idx: number) => (
                    <li key={idx} className="flex justify-between items-start text-sm">
                       <span className="font-medium text-gray-800 flex-1 pr-4">{c.qty}x {c.description}</span>
                       <span className="font-bold text-gray-600 whitespace-nowrap">${(c.qty * c.unitPrice).toLocaleString()}</span>
                    </li>
                 ))}
                 {activeQuote.suppliesCost > 0 && (
                    <li className="flex justify-between items-start text-sm">
                       <span className="font-medium text-gray-800 flex-1 pr-4">Suministro de Insumos</span>
                       <span className="font-bold text-gray-600 whitespace-nowrap">${Number(activeQuote.suppliesCost).toLocaleString()}</span>
                    </li>
                 )}
               </ul>

               {activeQuote.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Notas Comerciales</p>
                     <p className="text-sm text-gray-700 whitespace-pre-wrap">{activeQuote.notes}</p>
                  </div>
               )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-emerald-50 border border-emerald-100 p-5 rounded-2xl mb-6">
               <p className="text-sm font-bold text-emerald-900">Monto Total de Operación</p>
               <p className="text-2xl font-black text-emerald-700">${(activeQuote.amount || 0).toLocaleString()} <span className="text-sm">MXN</span></p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-auto">
               <button onClick={() => setShowQuoteViewer(false)} className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition">Cerrar Visor</button>
               {activeQuote.status === 'enviada' && (
                  <button onClick={() => handleAcceptQuote(activeQuote)} disabled={isAcceptingQuote} className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition shadow-lg shadow-emerald-600/20">
                    {isAcceptingQuote ? <Loader2 className="w-5 h-5 animate-spin"/> : <CheckCircle2 className="w-5 h-5"/>} Aceptar y Proceder
                  </button>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
