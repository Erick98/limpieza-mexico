"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { 
  Users, CheckCircle2, AlertCircle, FileText, ChevronRight, Search, Menu, 
  MapPin, Clock, Calendar, ShieldAlert, BarChart3, Settings, 
  Store, Building2, Upload, Phone, LogOut, Mail, Lock, Plus, Link as LinkIcon, Edit, UserPlus, List,
  Loader2, Save, X, BookOpen, ImageIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AuthGuard from "@/components/auth/AuthGuard";
import { db, storage } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc, onSnapshot, setDoc, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [pendingContracts, setPendingContracts] = useState<any[]>([]);
  const [activeContracts, setActiveContracts] = useState<any[]>([]);
  const [loadingContracts, setLoadingContracts] = useState(true);

  // --- PRECIOS Y TARIFAS DINÁMICAS ---
  const [pricingSettings, setPricingSettings] = useState({
    eventoMedio: 800,
    eventoCompleto: 1500,
    contratoMedio: 8000,
    contratoCompleto: 15000,
    expressSurcharge: 500
  });
  const [isSavingPricing, setIsSavingPricing] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  // --- CONFIGURACIÓN BASE DE LA EMPRESA ---
  const [companySettings, setCompanySettings] = useState({
    contactoWhatsapp: "525512345678",
    direccionFisica: "Sófocles 133, Polanco, Granada, Miguel Hidalgo, 11530 Ciudad de México, CDMX"
  });
  const [isSavingCompany, setIsSavingCompany] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  // --- CREADOR DE BLOG ---
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [blogData, setBlogData] = useState({
    title: "",
    slug: "",
    author: "Ing. Erick Bernal",
    category: "Gestión Corporativa",
    imageUrl: "",
    content: ""
  });

  // --- GESTIÓN DE USUARIOS ---
  const [usersList, setUsersList] = useState<any[]>([]);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);
  const [searchUser, setSearchUser] = useState("");

  // --- COTIZACIONES (FASE 21, 22 y 23) ---
  const [showQuotationsModal, setShowQuotationsModal] = useState(false);
  const [showNewQuotation, setShowNewQuotation] = useState(false);
  const [showQuoteViewer, setShowQuoteViewer] = useState(false); // Fase 23
  const [activeQuote, setActiveQuote] = useState<any>(null); // Fase 23
  
  const [quotationsList, setQuotationsList] = useState<any[]>([]);
  const [searchQuotation, setSearchQuotation] = useState("");
  const [quotationPage, setQuotationPage] = useState(1);
  const itemsPerPage = 8;

  // --- BOLETÍN INFORMATIVO (NEWSLETTER) ---
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [newsletterList, setNewsletterList] = useState<any[]>([]);

  // Formulario Nueva Cotización (Fase 22)
  const [quoteSearchClient, setQuoteSearchClient] = useState("");
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);
  const [quoteConcepts, setQuoteConcepts] = useState([{ id: Date.now(), description: "", qty: 1, unitPrice: 0 }]);
  
  const [newQuoteData, setNewQuoteData] = useState({
     userId: "",
     clientNameFallback: "",
     serviceType: "limpieza-recurrente",
     suppliesCost: 0,
     validityDays: "15",
     notes: ""
  });
  const [isSavingQuote, setIsSavingQuote] = useState(false);

  // Calcula el Total Neto en Tiempo Real
  const quoteSubtotal = quoteConcepts.reduce((acc, curr) => acc + (curr.qty * curr.unitPrice), 0);
  const quoteTotalRaw = quoteSubtotal + Number(newQuoteData.suppliesCost || 0);

  const fetchQuotations = async () => {
     try {
       const q = query(collection(db, "cotizaciones"), orderBy("createdAt", "desc"));
       const un = onSnapshot(q, (snap) => {
         setQuotationsList(snap.docs.map(doc => ({id: doc.id, ...doc.data()})));
       });
       return un;
     } catch(e) { console.error("Error trayendo cotizaciones", e); }
  };

  // Modal Gestor Cuentas Offline
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [offlineData, setOfflineData] = useState({ name: "", email: "", phone: "" });
  const [isSavingOffline, setIsSavingOffline] = useState(false);

  // Modal Gestión de Personal (Fase 19)
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffData, setStaffData] = useState({ name: "", username: "", password: "", role: "operario" });
  const [isSavingStaff, setIsSavingStaff] = useState(false);

  // Estados Visores Fase 20
  const [showContractDetails, setShowContractDetails] = useState(false);
  const [activeContractInfo, setActiveContractInfo] = useState<any>(null);
  
  const [showGlobalAgenda, setShowGlobalAgenda] = useState(false);
  const [allContractsHistory, setAllContractsHistory] = useState<any[]>([]);

  const handleOpenContractDetails = (contract: any) => {
    setActiveContractInfo(contract);
    setShowContractDetails(true);
  };

  const handleOpenGlobalAgenda = async () => {
    setShowGlobalAgenda(true);
    try {
      const q = query(collection(db, "contratos"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllContractsHistory(history);
    } catch (err) {
      console.error("Error obteniendo agenda global:", err);
    }
  };

  useEffect(() => {
    fetchQuotations();
    
    // Escuchar contratos
    const qContracts = query(collection(db, "contratos"), orderBy("createdAt", "desc"));
    const unsubscribeContracts = onSnapshot(qContracts, (querySnapshot) => {
      const contractsData = querySnapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      })) as any[];
      setPendingContracts(contractsData.filter(c => c.status === "pendiente"));
      setActiveContracts(contractsData.filter(c => c.status === "aprobado"));
      setLoadingContracts(false);
    });

    // Escuchar configuración de precios
    const unsubPricing = onSnapshot(doc(db, "settings", "pricing"), (docSnap) => {
      if (docSnap.exists()) {
        setPricingSettings(docSnap.data() as any);
      }
    });

    const unsubCompany = onSnapshot(doc(db, "settings", "company"), (docSnap) => {
      if (docSnap.exists()) {
        setCompanySettings(docSnap.data() as any);
      }
    });

    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsersList(usersData);

      const adminEmails = usersData.filter((u: any) => u.role === 'admin' && u.email).map((u: any) => u.email);
      if (adminEmails.length > 0) {
        setDoc(doc(db, "settings", "admins_cache"), { emails: adminEmails }, { merge: true }).catch(e => console.error("Error sincronizando cache admin:", e));
      }
    });

    // Escuchar Newsletter
    const qNewsletter = query(collection(db, "newsletter"), orderBy("createdAt", "desc"));
    const unsubNewsletter = onSnapshot(qNewsletter, (snapshot) => {
      setNewsletterList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
       unsubscribeContracts();
       unsubPricing();
       unsubCompany();
       unsubUsers();
       unsubNewsletter();
    }
  }, []);

  const totalActiveClients = new Set(activeContracts.map(c => c.userId)).size;
  const totalActiveServices = activeContracts.length;
  const totalStaffDeployed = activeContracts.reduce((acc, curr) => acc + (Number(curr.staffCount) || 0), 0);

  const handleApprove = async (contractId: string) => {
    try {
      const ref = doc(db, "contratos", contractId);
      await updateDoc(ref, { status: "aprobado" });
    } catch (error) {
       console.error("Error aprobando contrato:", error);
       alert("Hubo un error al aprobar el contrato.");
    }
  };

  const handleSavePricing = async () => {
    setIsSavingPricing(true);
    try {
      await setDoc(doc(db, "settings", "pricing"), pricingSettings);
      alert("Precios base actualizados exitosamente");
      setShowPricingModal(false);
    } catch (error) {
       console.error("Error guardando precios:", error);
       alert("Hubo un error al guardar los precios.");
    } finally {
      setIsSavingPricing(false);
    }
  };

  const handleSaveCompanyConfig = async () => {
    setIsSavingCompany(true);
    try {
      await setDoc(doc(db, "settings", "company"), companySettings);
      setShowCompanyModal(false);
    } catch (e) {
      console.error("Error guardando config de empresa", e);
      alert("Hubo un error al guardar los ajustes comerciales.");
    } finally {
      setIsSavingCompany(false);
    }
  };

  const handleSaveBlog = async () => {
    if(!blogData.title || !blogData.slug || !blogData.content) {
      alert("Título, slug y contenido son obligatorios");
      return;
    }
    setIsSavingBlog(true);
    try {
      let finalImageUrl = blogData.imageUrl;

      // Si el usuario seleccionó un archivo local, subirlo a Firebase Storage
      if (imageFile) {
        const fileRef = ref(storage, `blog_images/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(fileRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      await setDoc(doc(db, "blog_posts", blogData.slug), {
        ...blogData,
        imageUrl: finalImageUrl,
        createdAt: new Date().toISOString()
      });
      alert("Artículo publicado exitosamente.");
      setShowBlogModal(false);
      setBlogData({title: "", slug: "", author: "Ing. Erick Bernal", category: "Gestión Corporativa", imageUrl: "", content: ""});
      setImageFile(null);
    } catch (error) {
       console.error("Error guardando post", error);
       alert("Hubo un error al publicar el artículo.");
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    setUpdatingUser(userId);
    try {
      await updateDoc(doc(db, "users", userId), { role: newRole });
    } catch (e) {
      console.error("Error actualizando rol", e);
      alert("No tienes permiso o hubo un error al cambiar el rol del usuario.");
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleSaveOfflineClient = async () => {
    if (!offlineData.name || !offlineData.email) return alert("Nombre y correo son obligatorios.");
    setIsSavingOffline(true);
    try {
       const offlineUid = `offline_${Date.now()}`;
       await setDoc(doc(db, "users", offlineUid), {
          name: offlineData.name,
          email: offlineData.email.toLowerCase(),
          phone: offlineData.phone,
          role: "cliente",
          isOffline: true,
          createdAt: new Date().toISOString()
       });
       alert("Cliente registrado exitosamente en el Historial.");
       setShowOfflineModal(false);
       setOfflineData({ name: "", email: "", phone: "" });
    } catch(err) {
       console.error("Error registrando offline:", err);
       alert("Fallo al registrar cliente.");
    } finally {
       setIsSavingOffline(false);
    }
  };

  const handleSaveStaff = async () => {
    if (!staffData.name || !staffData.username || !staffData.password) return alert("Faltan datos obligatorios.");
    setIsSavingStaff(true);
    try {
       const hiddenEmail = `${staffData.username.toLowerCase().trim()}@staff.limpiezamexico.com`;
       const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
       
       if (!apiKey) throw new Error("API Key de Firebase no configurada.");

       // Crear cuenta usando Firebase Auth REST API (Para no cerrar la sesión del Administrador actual)
       const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           email: hiddenEmail,
           password: staffData.password,
           returnSecureToken: true
         })
       });

       const data = await res.json();
       if (data.error) throw new Error(data.error.message);

       const newUid = data.localId;

       // Guardar perfil en Base de Datos
       await setDoc(doc(db, "users", newUid), {
          name: staffData.name,
          username: staffData.username.toLowerCase().trim(),
          email: hiddenEmail,
          role: staffData.role,
          isStaff: true,
          createdAt: new Date().toISOString()
       });

       alert("Personal registrado exitosamente en el sistema.");
       setShowStaffModal(false);
       setStaffData({ name: "", username: "", password: "", role: "operario" });
    } catch(err: any) {
       console.error("Error registrando staff:", err);
       alert("Fallo al registrar personal: " + err.message);
    } finally {
       setIsSavingStaff(false);
    }
  };

  const handleAssignStaff = async (contractId: string, staffUid: string) => {
    try {
      await updateDoc(doc(db, "contratos", contractId), { assignedStaffUid: staffUid });
    } catch (err) {
      console.error("Error asignando personal:", err);
      alert("Hubo un error al asignar al personal.");
    }
  };

  const todayContracts = activeContracts.filter(c => {
    if (!c.eventDate) return false;
    const eventDate = new Date(c.eventDate);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  });

  const handleCreateQuotation = async () => {
     if(!newQuoteData.userId || quoteConcepts.some(c => !c.description)) {
        return alert("Debes seleccionar un cliente y asegurar que todos los conceptos tengan descripción.");
     }
     setIsSavingQuote(true);
     try {
       const selectedUser = usersList.find(u => u.id === newQuoteData.userId);
       const quoteDoc = {
          ...newQuoteData,
          concepts: quoteConcepts,
          amount: quoteTotalRaw,
          clientName: selectedUser?.name || newQuoteData.clientNameFallback || "Desconocido",
          clientEmail: selectedUser?.email || "N/A",
          clientPhone: selectedUser?.phone || "N/A",
          status: "enviada",
          createdAt: new Date().toISOString()
       };
       await setDoc(doc(db, "cotizaciones", `COT-${Date.now()}`), quoteDoc);
       alert("Cotización detallada creada y guardada con éxito.");
       
       // Reset
       setShowNewQuotation(false);
       setQuoteSearchClient("");
       setQuoteConcepts([{ id: Date.now(), description: "", qty: 1, unitPrice: 0 }]);
       setNewQuoteData({ userId: "", clientNameFallback: "", serviceType: "limpieza-recurrente", suppliesCost: 0, validityDays: "15", notes: ""});
     } catch (err) {
        console.error(err);
        alert("Fallo al crear la cotización");
     } finally {
        setIsSavingQuote(false);
     }
  };

  const handlePrint = () => {
     window.print();
  };

  const clientSuggestions = usersList.filter(u => u.role === 'cliente' && (u.name?.toLowerCase().includes(quoteSearchClient.toLowerCase()) || u.email?.toLowerCase().includes(quoteSearchClient.toLowerCase())));

  // Filtrado y paginación de Cotizaciones
  const filteredQuotations = quotationsList.filter(q => 
     q.id.toLowerCase().includes(searchQuotation.toLowerCase()) ||
     q.clientName?.toLowerCase().includes(searchQuotation.toLowerCase())
  );
  const totalQuotePages = Math.ceil(filteredQuotations.length / itemsPerPage);
  const paginatedQuotes = filteredQuotations.slice((quotationPage - 1) * itemsPerPage, quotationPage * itemsPerPage);

  return (
    <AuthGuard requireAdmin={true}>
      <div className="py-8 print:hidden print:h-0 print:m-0 print:p-0">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Control Global</h1>
            <p className="text-gray-500 mt-1">Supervisión operativa, clientes y reportes.</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 bg-red-50 text-red-600 font-semibold px-4 py-2 rounded-lg hover:bg-red-100 transition"
          >
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Clientes Activos", val: totalActiveClients.toString(), trend: "+12%", icon: <Users className="w-8 h-8 text-emerald-500" /> },
            { label: "Servicios en Curso", val: totalActiveServices.toString(), trend: "Estable", icon: <Building2 className="w-8 h-8 text-teal-500" /> },
            { label: "Reportes Pendientes", val: "0", trend: "-2", icon: <ShieldAlert className="w-8 h-8 text-orange-500" /> },
            { label: "Personal Desplegado", val: totalStaffDeployed.toString(), trend: "+45", icon: <CheckCircle2 className="w-8 h-8 text-blue-500" /> },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{kpi.label}</p>
                <h3 className="text-3xl font-bold text-gray-900">{kpi.val}</h3>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-2 inline-block">{kpi.trend} mes anterior</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                {kpi.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Operations Table */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Calendar className="w-6 h-6 text-emerald-600"/> Operativos de Hoy</h2>
                  <button onClick={handleOpenGlobalAgenda} className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2 transition"><List className="w-4 h-4"/> Ver agenda completa</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">Servicio</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">Cliente</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">Fecha Evento</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">Estatus</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">Personal Asignado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                    {loadingContracts ? (
                       <tr><td colSpan={5} className="text-center py-6 text-gray-500"><Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-500"/></td></tr>
                    ) : todayContracts.length === 0 ? (
                       <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400 font-medium">No hay servicios programados para hoy.</td></tr>
                    ) : todayContracts.map((row) => (
                      <tr key={row.id} className="hover:bg-emerald-50/30 transition group cursor-pointer" onClick={() => handleOpenContractDetails(row)}>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900 group-hover:text-emerald-700">{row.serviceType === "contrato" ? "Contrato Recurrente" : "Servicio Único"}</div>
                          <div className="text-xs text-gray-500 truncate w-48" title={row.fiscalAddress || "Centro Base"}>{row.fiscalAddress || "Centro Base"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{row.personName || row.userEmail}</div>
                          <div className="text-xs text-gray-500 truncate w-32" title={row.address}>{row.address}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-medium whitespace-nowrap">
                           {row.eventDate ? new Date(`${row.eventDate}T12:00:00`).toLocaleDateString() : (row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A')}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            Activo
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 w-48" onClick={e => e.stopPropagation()}>
                           <select
                             value={row.assignedStaffUid || ""}
                             onChange={(e) => handleAssignStaff(row.id, e.target.value)}
                             className={`px-2 py-1.5 border rounded-lg text-xs font-bold outline-none transition w-full cursor-pointer ${row.assignedStaffUid ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-white'}`}
                           >
                              <option value="">+ Asignar Personal</option>
                              {usersList.filter((u:any) => u.isStaff).map((staff:any) => (
                                 <option key={staff.id} value={staff.id}>{staff.name} ({staff.role === 'supervisor' ? 'SUP' : 'OP'})</option>
                              ))}
                           </select>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Contract Approvals Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-200 overflow-hidden">
              <div className="p-6 border-b border-orange-100 flex justify-between items-center bg-orange-50/30">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-orange-600"/> Aprobación de Contratos y Créditos</h2>
                <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">{pendingContracts.length} Pendientes</span>
              </div>
              <div className="p-6 space-y-4">
                {loadingContracts ? (
                   <div className="text-center py-8 text-gray-500 flex justify-center items-center gap-2">
                     <Loader2 className="w-6 h-6 animate-spin"/> Cargando solicitudes...
                   </div>
                ) : pendingContracts.length === 0 ? (
                   <div className="text-center py-8 text-emerald-600 font-medium">
                     No hay solicitudes pendientes. ¡Todo al día!
                   </div>
                ) : pendingContracts.map((req) => (
                  <div key={req.id} className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-emerald-200 transition">
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-500 w-16 truncate" title={req.id}>{req.id.substring(0, 8)}...</span>
                          <h4 className="font-bold text-gray-900">{req.personName || req.userEmail} ({req.serviceType})</h4>
                       </div>
                       <p className="text-sm text-gray-600 mt-1">
                          {req.contractTerm ? `${req.contractTerm} Meses` : "Evento Único"} • 
                          {req.staffCount} pax ({req.shiftType === "medio" ? "Medio Día" : "Día Completo"}) •  
                          Pago: <span className="font-semibold text-gray-800">{req.paymentMethod === "credito" ? "Crédito a 30 días" : "Stripe Checkout"}</span>
                       </p>
                       {req.taxId && (
                         <div className="flex gap-4 mt-2 text-xs text-gray-500 font-medium">
                           <span>📱 {req.contactPhone}</span>
                           <span>🏢 RFC: {req.taxId}</span>
                         </div>
                       )}
                     </div>
                     <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                        <button onClick={() => handleOpenContractDetails(req)} className="flex-1 md:flex-none px-4 py-2 border border-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-50 transition">Ver Specs</button>
                        {req.paymentMethod === "credito" ? (
                          <button onClick={() => handleApprove(req.id)} className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition overflow-hidden text-ellipsis whitespace-nowrap">Aprobar Crédito</button>
                        ) : (
                          <button onClick={() => handleApprove(req.id)} className="flex-1 md:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition overflow-hidden text-ellipsis whitespace-nowrap">Liquidar/Aprobar</button>
                        )}
                     </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                 <div className="bg-emerald-100 p-3 rounded-full text-emerald-600"><BarChart3 className="w-6 h-6"/></div>
                 <div>
                   <h3 className="font-bold text-gray-900">Generar Reporte Mensual Global</h3>
                   <p className="text-sm text-gray-500">Exportar asistencias, incidencias y consumos.</p>
                 </div>
              </div>
              <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors">Exportar CSV</button>
            </div>
          </div>

          {/* Sidebar Tools */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Acciones Rápidas</h3>
              <ul className="space-y-2">
                <li><button onClick={() => setShowUsersModal(true)} className="w-full text-left px-4 py-3 rounded-lg hover:bg-emerald-50 font-medium text-gray-700 hover:text-emerald-800 transition flex justify-between items-center group"><span className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/> Gestión de Usuarios</span> <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/></button></li>
                <li><button onClick={() => setShowCompanyModal(true)} className="w-full text-left px-4 py-3 rounded-lg hover:bg-emerald-50 font-medium text-gray-700 hover:text-emerald-800 transition flex justify-between items-center group"><span className="flex items-center gap-2"><Store className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/> Datos Comerciales</span> <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/></button></li>
                <li><button onClick={() => setShowPricingModal(true)} className="w-full text-left px-4 py-3 rounded-lg hover:bg-emerald-50 font-medium text-gray-700 hover:text-emerald-800 transition flex justify-between items-center group"><span className="flex items-center gap-2"><Settings className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/> Configurar Tarifas</span> <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/></button></li>
                <li><button onClick={() => setShowOfflineModal(true)} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700 hover:text-emerald-700 transition flex justify-between items-center group"><span className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/> Alta de Cliente (Offline)</span> <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/></button></li>
                <li><button onClick={() => setShowStaffModal(true)} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700 hover:text-emerald-700 transition flex justify-between items-center group"><span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/> Gestión de Personal (Staff)</span> <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/></button></li>
                <li><button onClick={() => setShowQuotationsModal(true)} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700 hover:text-emerald-700 transition flex justify-between items-center group"><span className="flex items-center gap-2"><FileText className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/> Gestor de Cotizaciones</span> <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/></button></li>
                <li><button onClick={() => setShowBlogModal(true)} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700 hover:text-emerald-700 transition flex justify-between items-center group"><span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/> Crear Artículo (Blog)</span> <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/></button></li>
                <li><button onClick={() => setShowNewsletterModal(true)} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 font-medium text-gray-700 hover:text-emerald-700 transition flex justify-between items-center group"><span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/> Suscriptores Boletín</span> <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600"/></button></li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-2xl shadow-lg border border-transparent text-white relative overflow-hidden">
               <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
               <h3 className="font-bold text-lg mb-2">Subir Reporte PDF</h3>
               <p className="text-emerald-100 text-sm mb-6">Cargue el reporte de supervisión para que el cliente lo pueda visualizar en su portal.</p>
               
               <div className="border-2 border-dashed border-emerald-400/50 rounded-xl p-6 text-center hover:bg-emerald-500/20 transition cursor-pointer">
                 <Upload className="w-8 h-8 mx-auto mb-2 text-emerald-300" />
                 <span className="text-sm font-semibold">Seleccionar archivo</span>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- MODAL SUSCRIPTORES NEWSLETTER --- */}
      {showNewsletterModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
           <div className="bg-white max-w-2xl w-full p-6 shadow-xl relative animate-in slide-in-from-right duration-300 flex flex-col h-full ml-auto overflow-hidden">
             <button onClick={() => setShowNewsletterModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition z-10">
               <X className="w-5 h-5"/>
             </button>
             
             <div className="mb-6 pr-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><Mail className="w-6 h-6 text-emerald-600"/> Suscriptores del Boletín</h2>
                <p className="text-sm text-gray-500">Lista total de correos que han decidido recibir noticias, ofertas y artículos de Limpieza México.</p>
             </div>
             
             <div className="bg-emerald-50 rounded-xl p-4 mb-4 flex justify-between items-center border border-emerald-100">
                <span className="font-bold text-emerald-800 text-lg">{newsletterList.length} Suscriptores</span>
                <button 
                  onClick={() => {
                     const emails = newsletterList.map(n => n.email).join(", ");
                     navigator.clipboard.writeText(emails);
                     alert("Todos los correos copiados al portapapeles.");
                  }}
                  className="bg-white text-emerald-700 font-semibold px-4 py-2 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition shadow-sm text-sm"
                >
                  Copiar Correos
                </button>
             </div>

             <div className="flex-grow overflow-auto border border-gray-100 rounded-xl relative shadow-sm">
               <table className="min-w-full text-left text-sm text-gray-600 border-collapse whitespace-nowrap">
                  <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm border-b border-gray-200">
                    <tr>
                       <th className="px-6 py-4 font-bold text-gray-900">Correo Electrónico</th>
                       <th className="px-6 py-4 font-bold text-gray-900">Fecha de Registro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {newsletterList.length === 0 ? (
                        <tr><td colSpan={2} className="px-6 py-8 text-center text-gray-400 font-medium">Aún no hay suscriptores.</td></tr>
                     ) : newsletterList.map((subscriber, idx) => (
                        <tr key={subscriber.id || idx} className="hover:bg-gray-50 transition">
                           <td className="px-6 py-4 font-semibold text-gray-900">{subscriber.email}</td>
                           <td className="px-6 py-4 text-gray-500">
                             {subscriber.createdAt ? new Date(subscriber.createdAt).toLocaleString() : "N/A"}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
             </div>
           </div>
        </div>
      )}

      {/* --- MODAL DE PRECIOS --- */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
             <button onClick={() => setShowPricingModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
               <X className="w-6 h-6"/>
             </button>
             <h2 className="text-xl font-bold text-gray-900 mb-2">Configuración de Tarifas</h2>
             <p className="text-sm text-gray-500 mb-6">Ajuste los costos base por jornada y recargos operativos.</p>
             
             <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                   <h3 className="text-sm font-bold text-gray-700 mb-3 border-b pb-2">Servicios Por Evento</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-xs font-semibold text-gray-500">Medio Día (MXN)</label>
                       <input type="number" value={pricingSettings.eventoMedio} onChange={e => setPricingSettings({...pricingSettings, eventoMedio: Number(e.target.value)})} className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-emerald-500"/>
                     </div>
                     <div>
                       <label className="text-xs font-semibold text-gray-500">Día Completo (MXN)</label>
                       <input type="number" value={pricingSettings.eventoCompleto} onChange={e => setPricingSettings({...pricingSettings, eventoCompleto: Number(e.target.value)})} className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-emerald-500"/>
                     </div>
                   </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                   <h3 className="text-sm font-bold text-gray-700 mb-3 border-b pb-2">Contratos Recurrentes</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-xs font-semibold text-gray-500">Mensualidad Medio (MXN)</label>
                       <input type="number" value={pricingSettings.contratoMedio} onChange={e => setPricingSettings({...pricingSettings, contratoMedio: Number(e.target.value)})} className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-teal-500"/>
                     </div>
                     <div>
                       <label className="text-xs font-semibold text-gray-500">Mensualidad Completo</label>
                       <input type="number" value={pricingSettings.contratoCompleto} onChange={e => setPricingSettings({...pricingSettings, contratoCompleto: Number(e.target.value)})} className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-teal-500"/>
                     </div>
                   </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                   <h3 className="text-sm font-bold text-orange-800 mb-2">Recargo: Servicio Exprés</h3>
                   <p className="text-xs text-orange-600 mb-3">Cobro adicional por agendamiento Mismo Día o Día Siguiente (Aplica a Eventos).</p>
                   <div>
                     <input type="number" value={pricingSettings.expressSurcharge} onChange={e => setPricingSettings({...pricingSettings, expressSurcharge: Number(e.target.value)})} className="w-full p-2 border border-orange-200 rounded-lg outline-none focus:border-orange-500"/>
                   </div>
                </div>
             </div>

             <div className="mt-6 flex justify-end gap-3">
               <button onClick={() => setShowPricingModal(false)} className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg">Cancelar</button>
               <button onClick={handleSavePricing} disabled={isSavingPricing} className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition">
                 {isSavingPricing ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>} Guardar Cambios
               </button>
             </div>
           </div>
        </div>
      )}

      {/* --- MODAL DATOS COMERCIALES --- */}
      {showCompanyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
             <button onClick={() => setShowCompanyModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
               <X className="w-6 h-6"/>
             </button>
             <h2 className="text-xl font-bold text-gray-900 mb-2">Datos Comerciales Base</h2>
             <p className="text-sm text-gray-500 mb-6">Esta información es utilizada por los canales dinámicos y reportes automáticos.</p>
             
             <div className="space-y-4">
               <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">WhatsApp Global de Atención al Cliente (Incluir Lada. ej: 5255...)</label>
                  <input type="text" value={companySettings.contactoWhatsapp} onChange={e => setCompanySettings({...companySettings, contactoWhatsapp: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"/>
               </div>
               <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Sede Operativa Oficial (Dirección Fiscal/Física)</label>
                  <textarea rows={3} value={companySettings.direccionFisica} onChange={e => setCompanySettings({...companySettings, direccionFisica: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-sm"/>
               </div>
             </div>

             <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
               <button onClick={() => setShowCompanyModal(false)} className="px-5 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition">Cancelar</button>
               <button onClick={handleSaveCompanyConfig} disabled={isSavingCompany} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition shadow-sm">
                 {isSavingCompany ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5"/>} Guardar Configuración
               </button>
             </div>
           </div>
        </div>
      )}

      {/* --- MODAL CREADOR DE BLOG --- */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
           <div className="bg-white max-w-4xl w-full p-6 shadow-2xl relative animate-in slide-in-from-right duration-300 h-full overflow-y-auto flex flex-col ml-auto">
             <button onClick={() => setShowBlogModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition z-10">
               <X className="w-5 h-5"/>
             </button>
             <h2 className="text-xl font-bold text-gray-900 mb-2">Crear Artículo para el Blog</h2>
             <p className="text-sm text-gray-500 mb-6">Redacte su nueva entrada en formato Markdown.</p>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Título</label>
                    <input type="text" value={blogData.title} onChange={e => {
                        const newTitle = e.target.value;
                        const autoSlug = newTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        setBlogData({...blogData, title: newTitle, slug: autoSlug});
                    }} className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-gray-900"/>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="text-xs font-bold text-gray-700 mb-1 block">URL "Slug"</label>
                      <input type="text" value={blogData.slug} onChange={e => setBlogData({...blogData, slug: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-600 bg-gray-50"/>
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-700 mb-1 block">Categoría</label>
                      <select value={blogData.category} onChange={e => setBlogData({...blogData, category: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm">
                        <option>Gestión Corporativa</option>
                        <option>Salud Ocupacional</option>
                        <option>Tecnología</option>
                        <option>Guías Legales</option>
                      </select>
                   </div>
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Autor</label>
                    <input type="text" value={blogData.author} onChange={e => setBlogData({...blogData, author: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-sm"/>
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Imagen Principal (Banner)</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-grow">
                        <input type="file" accept="image/*" onChange={(e) => {
                           if(e.target.files && e.target.files[0]) {
                             setImageFile(e.target.files[0]);
                             setBlogData({...blogData, imageUrl: ""}); // Limpiar url estática si seleccionaron archivo local
                           }
                        }} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all"/>
                      </div>
                      {(imageFile || blogData.imageUrl) && (
                         <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg" title="Imagen cargada">
                           <ImageIcon className="w-5 h-5"/>
                         </div>
                      )}
                    </div>
                    {!imageFile && (
                       <input type="text" value={blogData.imageUrl} onChange={e => setBlogData({...blogData, imageUrl: e.target.value})} placeholder="O inserte una URL tradicional (ej. https://...)" className="w-full mt-2 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-gray-500 bg-gray-50"/>
                    )}
                 </div>
               </div>

               <div className="flex flex-col h-full min-h-[300px]">
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Contenido (Soporta Markdown)</label>
                  <textarea value={blogData.content} onChange={e => setBlogData({...blogData, content: e.target.value})} className="w-full flex-grow p-4 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none font-mono bg-gray-50/50" placeholder="## Subtítulo&#10;Escriba su contenido aquí usando formato Markdown..."/>
               </div>
             </div>

             <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
               <button onClick={() => setShowBlogModal(false)} className="px-5 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition">Cancelar</button>
               <button onClick={handleSaveBlog} disabled={isSavingBlog} className="flex items-center gap-2 px-8 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition shadow-sm">
                 {isSavingBlog ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5"/>} Publicar Artículo
               </button>
             </div>
           </div>
        </div>
      )}

      {/* --- MODAL GESTIÓN DE USUARIOS --- */}
      {showUsersModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
           <div className="bg-white max-w-6xl w-full p-6 shadow-xl relative animate-in slide-in-from-right duration-300 flex flex-col h-full ml-auto overflow-hidden">
             <button onClick={() => setShowUsersModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition z-10">
               <X className="w-5 h-5"/>
             </button>
             
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><Users className="w-6 h-6 text-emerald-600"/> Gestión de Usuarios y Accesos</h2>
                  <p className="text-sm text-gray-500">Controle qué usuarios tienen permisos administrativos en Limpieza México.</p>
                </div>
                <div className="w-full md:w-1/3">
                  <input 
                    type="text" 
                    placeholder="Buscar por nombre, email o WhatsApp..." 
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 text-sm rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 hover:bg-white transition"
                  />
                </div>
             </div>
             
             <div className="flex-grow overflow-auto border border-gray-100 rounded-xl relative shadow-sm">
               <table className="min-w-full text-left text-sm text-gray-600 border-collapse whitespace-nowrap">
                  <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm border-b border-gray-200">
                    <tr>
                       <th className="px-6 py-4 font-bold text-gray-900">Usuario / Empresa</th>
                       <th className="px-6 py-4 font-bold text-gray-900">Contacto</th>
                       <th className="px-6 py-4 font-bold text-gray-900">Origen</th>
                       <th className="px-6 py-4 font-bold text-gray-900">Alta</th>
                       <th className="px-6 py-4 font-bold text-gray-900">Rol de Sistema</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {usersList
                      .filter(usr => 
                        (usr.name || "").toLowerCase().includes(searchUser.toLowerCase()) ||
                        (usr.email || "").toLowerCase().includes(searchUser.toLowerCase()) ||
                        (usr.whatsapp || usr.phone || "").toLowerCase().includes(searchUser.toLowerCase())
                      )
                      .map((usr) => (
                      <tr key={usr.id} className="hover:bg-emerald-50/20 transition duration-150">
                        <td className="px-6 py-4">
                           <div className="font-bold text-gray-900 max-w-xs truncate" title={usr.name || "Usuario Web"}>{usr.name || "Usuario Web"}</div>
                           <div className="text-xs text-gray-500 font-mono mt-0.5">{usr.id.substring(0, 10)}...</div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="font-medium text-gray-800">{usr.email || "Sin correo"}</div>
                           <div className="text-xs text-emerald-600 mt-0.5 flex gap-1 items-center">{usr.whatsapp || usr.phone || "No registrado"}</div>
                        </td>
                        <td className="px-6 py-4">
                           {usr.isOffline ? (
                              <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-600 ring-1 ring-inset ring-stone-500/10">Llamada/Local</span>
                           ) : (
                              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Web/App</span>
                           )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                           {usr.createdAt ? new Date(usr.createdAt).toLocaleDateString() : "Desconocida"}
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                             <select 
                               value={usr.role || 'client'} 
                               disabled={updatingUser === usr.id}
                               onChange={(e) => handleUpdateRole(usr.id, e.target.value)}
                               className={`px-3 py-1.5 rounded-lg text-xs font-bold outline-none border transition-all cursor-pointer ${usr.role === 'admin' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 shadow-sm'}`}
                             >
                               <option value="client">👩‍💼 Cliente</option>
                               <option value="admin">🚨 Administrador</option>
                             </select>
                             {updatingUser === usr.id && <Loader2 className="w-4 h-4 animate-spin text-emerald-600"/>}
                           </div>
                        </td>
                      </tr>
                    ))}
                    {usersList.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center p-12 text-gray-400">
                           <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-500 mb-3"/>
                           Cargando base de datos de usuarios...
                        </td>
                      </tr>
                    )}
                  </tbody>
               </table>
             </div>
           </div>
        </div>
      )}

      {/* --- MODAL ALTA DE CLIENTE OFFLINE --- */}
      {showOfflineModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
           <div className="bg-white max-w-md w-full p-6 shadow-2xl relative animate-in slide-in-from-right duration-300 h-full overflow-y-auto flex flex-col ml-auto">
             <button onClick={() => setShowOfflineModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition z-10">
               <X className="w-5 h-5"/>
             </button>
             <h2 className="text-xl font-bold text-gray-900 mb-2 mt-4">Alta de Cliente</h2>
             <p className="text-sm text-gray-500 mb-6">Registre a un usuario sin cuenta. Si después crean su portal web con este email, el historial se les vinculará en automático.</p>
             
             <div className="space-y-4">
               <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Nombre Completo o Empresa <span className="text-red-500">*</span></label>
                  <input type="text" value={offlineData.name} onChange={e => setOfflineData({...offlineData, name: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 cursor-text"/>
               </div>
               <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Correo Electrónico (Para Vinculación) <span className="text-red-500">*</span></label>
                  <input type="email" value={offlineData.email} onChange={e => setOfflineData({...offlineData, email: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 cursor-text"/>
               </div>
               <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">WhatsApp Relacionado</label>
                  <input type="text" value={offlineData.phone} onChange={e => setOfflineData({...offlineData, phone: e.target.value})} className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 cursor-text"/>
               </div>
             </div>

             <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
               <button onClick={() => setShowOfflineModal(false)} className="px-5 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition overflow-hidden">Cancelar</button>
               <button onClick={handleSaveOfflineClient} disabled={isSavingOffline} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition shadow-sm overflow-hidden text-ellipsis whitespace-nowrap">
                 {isSavingOffline ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5"/>} Guardar Perfil
               </button>
             </div>
           </div>
        </div>
      )}

      {/* --- MODAL GESTIÓN DE PERSONAL / STAFF --- */}
      {showStaffModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
           <div className="bg-white max-w-4xl w-full p-6 shadow-xl relative animate-in slide-in-from-right duration-300 h-full overflow-hidden flex flex-col ml-auto">
             <button onClick={() => setShowStaffModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition z-10">
               <X className="w-5 h-5"/>
             </button>
             <h2 className="text-xl font-bold text-gray-900 mb-2 mt-4 flex items-center gap-2"><CheckCircle2 className="w-6 h-6 text-emerald-600"/> Gestión del Personal y Operarios</h2>
             <p className="text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">Administre las cuentas de los trabajadores. Estas cuentas no requieren correo corporativo, ingresan con Usuario y Contraseña directamente al portal seguro.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow overflow-hidden">
                {/* Formulario Alta */}
                <div className="md:col-span-1 bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col">
                   <h3 className="font-bold text-gray-800 mb-4 pb-2">Registrar Empleado</h3>
                   <div className="space-y-4 overflow-y-auto pr-2">
                     <div>
                        <label className="text-xs font-bold text-gray-700 mb-1 block">Nombre Completo <span className="text-red-500">*</span></label>
                        <input type="text" value={staffData.name} onChange={e => setStaffData({...staffData, name: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-sm"/>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-700 mb-1 block">Nombre de Usuario (Login) <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="ej: juanperez123" value={staffData.username} onChange={e => setStaffData({...staffData, username: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-sm"/>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-700 mb-1 block">Contraseña Asignada <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Contraseña segura..." value={staffData.password} onChange={e => setStaffData({...staffData, password: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-sm"/>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-700 mb-1 block">Rango / Cargo</label>
                        <select value={staffData.role} onChange={e => setStaffData({...staffData, role: e.target.value})} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white">
                           <option value="operario">Operario / Personal</option>
                           <option value="supervisor">Supervisor de Zona</option>
                        </select>
                     </div>
                   </div>
                   <button onClick={handleSaveStaff} disabled={isSavingStaff} className="w-full mt-6 flex justify-center items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition shadow-sm">
                     {isSavingStaff ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>} Generar Credencial
                   </button>
                </div>

                {/* Lista de Personal */}
                <div className="md:col-span-2 border border-gray-100 rounded-xl overflow-hidden flex flex-col relative bg-white">
                   <div className="bg-gray-50/80 p-3 border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm shadow-sm">
                     <h3 className="font-bold text-gray-800 text-sm">Equipo Activo ({usersList.filter(u => u.isStaff).length})</h3>
                   </div>
                   <div className="flex-grow overflow-auto p-0">
                     <table className="w-full text-left text-sm text-gray-600">
                        <tbody className="divide-y divide-gray-50">
                          {usersList.filter(u => u.isStaff).length === 0 ? (
                             <tr><td className="p-8 text-center text-gray-400">Ningún empleado registrado, la flotilla está vacía.</td></tr>
                          ) : usersList.filter(u => u.isStaff).map(usr => (
                             <tr key={usr.id} className="hover:bg-emerald-50/30 transition">
                                <td className="p-4">
                                   <div className="font-bold text-gray-900">{usr.name || "Sin nombre"}</div>
                                   <div className="text-xs text-gray-500 font-mono">Usuario: {usr.username}</div>
                                </td>
                                <td className="p-4">
                                   <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${usr.role === 'supervisor' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                                      {usr.role === 'supervisor' ? '⭐' : '👷‍♂️'} {usr.role.charAt(0).toUpperCase() + usr.role.slice(1)}
                                   </span>
                                </td>
                                <td className="p-4 text-right">
                                   <button className="text-xs font-semibold text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg hover:bg-red-50 transition">Borrar Acceso</button>
                                </td>
                             </tr>
                          ))}
                        </tbody>
                     </table>
                   </div>
                </div>
             </div>
           </div>
        </div>
      )}

      {/* --- MODAL ESPECIFICACIONES DE CONTRATO (FASE 20) --- */}
      {showContractDetails && activeContractInfo && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
           <div className="bg-white max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in slide-in-from-right duration-300 h-full overflow-y-auto flex flex-col ml-auto">
             <button onClick={() => setShowContractDetails(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition z-10">
               <X className="w-5 h-5"/>
             </button>
             <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2 border-b pb-4">
               <FileText className="w-7 h-7 text-emerald-600"/> 
               Especificaciones Operativas del Servicio
             </h2>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Empresa / Cliente</p>
                   <p className="text-gray-900 font-semibold">{activeContractInfo.personName || 'No especificado'}</p>
                   <p className="text-sm text-gray-600 truncate" title={activeContractInfo.userEmail}>{activeContractInfo.userEmail}</p>
                   <p className="text-sm text-gray-600 mt-2 font-mono">📱 {activeContractInfo.contactPhone || 'N/A'}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Logística y Ubicación</p>
                   <p className="text-sm text-gray-800 font-medium">📍 {activeContractInfo.address || 'Pendiente'}</p>
                   <p className="text-sm text-gray-600 mt-2 flex items-center gap-1"><Calendar className="w-4 h-4"/> Evento Mínimo: {activeContractInfo.eventDate ? new Date(`${activeContractInfo.eventDate}T12:00:00`).toLocaleDateString() : 'Por Definir'}</p>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                   <span className="text-gray-600 font-medium">Tipo de Contratación:</span>
                   <span className="font-bold text-gray-900 capitalize px-3 py-1 bg-blue-50 text-blue-800 rounded-md">{activeContractInfo.serviceType}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                   <span className="text-gray-600 font-medium">Personal Solicitado (Pax):</span>
                   <span className="font-bold text-gray-900">{activeContractInfo.staffCount} Operadores ({activeContractInfo.shiftType === 'medio' ? 'Mensualidad' : 'Tiempo Completo'})</span>
                </div>
                {activeContractInfo.contractTerm && (
                  <div className="flex justify-between items-center border-b pb-2">
                     <span className="text-gray-600 font-medium">Plazo Forzoso:</span>
                     <span className="font-bold text-gray-900">{activeContractInfo.contractTerm} Meses</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-b pb-2">
                   <span className="text-gray-600 font-medium">Insumos y Maquinaria:</span>
                   <span className="font-bold text-gray-900">{activeContractInfo.needsSupplies ? 'Incluidos en Cotización ✅' : 'Client Propio ❌'}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                   <span className="text-gray-600 font-medium">Estatus de Plataforma:</span>
                   <span className={`font-bold px-3 py-1 rounded-md text-sm ${activeContractInfo.status === 'aprobado' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}`}>{activeContractInfo.status ? activeContractInfo.status.toUpperCase() : 'PENDIENTE'}</span>
                </div>
             </div>

             <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Responsiva Operativa</h3>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                   <div className="flex-1">
                      <p className="text-sm font-semibold text-emerald-900">Personal Asignado</p>
                      <p className="text-xs text-emerald-700 mt-1">Garantiza que el reporte de supervisión llegue al cliente.</p>
                   </div>
                   <div className="w-full sm:w-64">
                      <select
                        value={activeContractInfo.assignedStaffUid || ""}
                        onChange={(e) => {
                           handleAssignStaff(activeContractInfo.id, e.target.value);
                           setActiveContractInfo({...activeContractInfo, assignedStaffUid: e.target.value});
                        }}
                        className={`w-full px-3 py-2 border rounded-lg text-sm font-bold shadow-sm outline-none bg-white border-emerald-300 text-emerald-900 focus:ring-2 focus:ring-emerald-500`}
                      >
                         <option value="">⚠️ + Re-Asignar Personal</option>
                         {usersList.filter((u:any) => u.isStaff).map((staff:any) => (
                            <option key={staff.id} value={staff.id}>{staff.name} ({staff.role === 'supervisor' ? 'SUP' : 'OP'})</option>
                         ))}
                      </select>
                   </div>
                </div>
             </div>
           </div>
        </div>
      )}

      {/* --- MODAL AGENDA GLOBAL (FASE 20) --- */}
      {showGlobalAgenda && (
         <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
            <div className="bg-gray-50 max-w-5xl w-full h-full shadow-2xl relative animate-in slide-in-from-right duration-300 flex flex-col overflow-hidden border-l border-gray-200 ml-auto mr-0">
               <div className="bg-white px-6 py-5 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                      <List className="w-7 h-7 text-emerald-600"/> Agenda Histórica Global
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Todos los contratos y servicios capturados en el ecosistema.</p>
                  </div>
                  <button onClick={() => setShowGlobalAgenda(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100/50 hover:bg-gray-100 p-2 rounded-full transition">
                    <X className="w-6 h-6"/>
                  </button>
               </div>

               <div className="flex-grow overflow-y-auto p-6">
                  {allContractsHistory.length === 0 ? (
                     <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500"/>
                        <p className="font-medium">Consolidando bases de datos de servicios...</p>
                     </div>
                  ) : (
                     <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha Creación</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Servicio</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente / Empresa</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Operadores</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Estatus</th>
                              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acción</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                             {allContractsHistory.map(row => (
                                <tr key={row.id} className="hover:bg-emerald-50/40 transition">
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                      {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'Heredado'}
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 capitalize">
                                      {row.serviceType}
                                   </td>
                                   <td className="px-6 py-4">
                                      <div className="font-semibold text-gray-800 text-sm truncate w-32" title={row.personName || row.userEmail}>{row.personName || row.userEmail}</div>
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                      {row.staffCount} pax
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${row.status === 'aprobado' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}`}>
                                         {row.status ? row.status.toUpperCase() : 'NUEVO'}
                                      </span>
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-right">
                                      <button onClick={() => { setShowGlobalAgenda(false); handleOpenContractDetails(row); }} className="text-emerald-600 hover:text-emerald-900 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition">Expediente</button>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                        </table>
                     </div>
                  )}
               </div>
            </div>
         </div>
      )}

      {/* --- MODAL GESTOR DE COTIZACIONES (FASE 21) --- */}
      {showQuotationsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
           <div className="bg-gray-50 max-w-5xl w-full h-full shadow-2xl relative animate-in slide-in-from-right duration-300 flex flex-col overflow-hidden border-l border-gray-200 ml-auto mr-0">
              <div className="bg-white px-6 py-5 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                 <div>
                   <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                     <FileText className="w-7 h-7 text-emerald-600"/> Gestor de Cotizaciones
                   </h2>
                   <p className="text-sm text-gray-500 mt-1">Busque en el histórico o emita una nueva cotización formal.</p>
                 </div>
                 <div className="flex items-center gap-4">
                   <button onClick={() => setShowNewQuotation(true)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold shadow transition"><Plus className="w-4 h-4"/> Nueva Cotización</button>
                   <button onClick={() => setShowQuotationsModal(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"><X className="w-6 h-6"/></button>
                 </div>
              </div>

              <div className="p-6">
                 {/* Buscador */}
                 <div className="relative max-w-md w-full mb-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar por ID o Nombre de Cliente..."
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm shadow-sm"
                      value={searchQuotation}
                      onChange={(e) => { setSearchQuotation(e.target.value); setQuotationPage(1); }}
                    />
                 </div>

                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">ID Cotización</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Cliente</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Servicio</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Total (MXN)</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Estatus</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {paginatedQuotes.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400 font-medium">No se encontraron cotizaciones.</td></tr>
                         ) : paginatedQuotes.map(q => (
                            <tr key={q.id} onClick={() => { setActiveQuote(q); setShowQuoteViewer(true); }} className="hover:bg-gray-50 transition cursor-pointer">
                               <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-gray-600">{q.id}</td>
                               <td className="px-6 py-4">
                                  <div className="font-semibold text-gray-900">{q.clientName}</div>
                                  <div className="text-xs text-gray-500">{new Date(q.createdAt).toLocaleDateString()}</div>
                               </td>
                               <td className="px-6 py-4 text-sm text-gray-700 capitalize">{q.serviceType.replace('-', ' ')}</td>
                               <td className="px-6 py-4 text-sm font-bold text-gray-900">${q.amount.toLocaleString()}</td>
                               <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${q.status === 'aceptada' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                                     {q.status.toUpperCase()}
                                  </span>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                    </table>

                    {/* Pagination Controls */}
                    {totalQuotePages > 1 && (
                      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">Página {quotationPage} de {totalQuotePages}</span>
                        <div className="flex gap-2">
                           <button onClick={() => setQuotationPage(p => Math.max(1, p - 1))} disabled={quotationPage === 1} className="px-3 py-1 border rounded bg-white text-sm font-semibold disabled:opacity-50">Anterior</button>
                           <button onClick={() => setQuotationPage(p => Math.min(totalQuotePages, p + 1))} disabled={quotationPage === totalQuotePages} className="px-3 py-1 border rounded bg-white text-sm font-semibold disabled:opacity-50">Siguiente</button>
                        </div>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- CREADOR DE COTIZACIONES AVANZADO (FASE 22) --- */}
      {showNewQuotation && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
             <button onClick={() => setShowNewQuotation(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full">
               <X className="w-5 h-5"/>
             </button>
             <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2"><FileText className="w-6 h-6 text-emerald-600"/> Creador de Cotización Empresarial</h2>
             
             <div className="space-y-6">
                
                {/* Autocompletado de Clientes */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2">1. Buscar Cliente (Empresa / Particular)</label>
                  <div className="relative">
                     <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"/>
                     <input 
                       type="text" 
                       placeholder="Empieza a teclear el nombre o correo del cliente registrado..." 
                       value={quoteSearchClient}
                       onChange={e => {
                          setQuoteSearchClient(e.target.value);
                          setShowClientSuggestions(true);
                          setNewQuoteData({...newQuoteData, userId: "", clientNameFallback: e.target.value});
                       }}
                       onFocus={() => setShowClientSuggestions(true)}
                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium outline-none shadow-sm"
                     />
                     {showClientSuggestions && quoteSearchClient.length > 0 && (
                        <ul className="absolute z-20 w-full bg-white border border-gray-200 shadow-xl rounded-lg mt-1 max-h-48 overflow-y-auto">
                           {clientSuggestions.map(client => (
                              <li key={client.id} onClick={() => {
                                 setNewQuoteData({...newQuoteData, userId: client.id, clientNameFallback: client.name});
                                 setQuoteSearchClient(client.name);
                                 setShowClientSuggestions(false);
                              }} className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-0 transition flex justify-between items-center group">
                                 <div>
                                   <span className="font-bold text-gray-900 group-hover:text-emerald-800">{client.name}</span>
                                   <span className="block text-xs text-gray-500">{client.email}</span>
                                 </div>
                                 <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">ID: {client.id.substring(0,6)}</span>
                              </li>
                           ))}
                           {clientSuggestions.length === 0 && (
                              <li className="px-4 py-3 text-sm text-gray-500 italic">No se encontraron clientes. Regístralo en Offline primero.</li>
                           )}
                        </ul>
                     )}
                  </div>
                  {newQuoteData.userId && <p className="text-emerald-600 text-xs font-bold mt-2 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Cliente Vinculado Exitosamente</p>}
                </div>

                {/* Parámetros Operativos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Tipo de Servicio Base</label>
                    <select value={newQuoteData.serviceType} onChange={e => setNewQuoteData({...newQuoteData, serviceType: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white outline-none">
                       <option value="limpieza-recurrente">Limpieza Recurrente (Contrato)</option>
                       <option value="limpieza-profunda">Limpieza Profunda (Flash)</option>
                       <option value="evento-corporativo">Evento Corporativo (Eventual)</option>
                       <option value="proyecto-especial">Proyecto Especial (Custom)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Vigencia Documento (Días)</label>
                    <input type="number" value={newQuoteData.validityDays} onChange={e => setNewQuoteData({...newQuoteData, validityDays: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"/>
                  </div>
                </div>

                {/* Matriz de Conceptos */}
                <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-200">
                   <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-bold text-gray-700">Matriz de Conceptos Financieros</label>
                      <button onClick={() => setQuoteConcepts([...quoteConcepts, {id: Date.now(), description: "", qty: 1, unitPrice: 0}])} className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-200 transition">+ Añadir Concepto</button>
                   </div>
                   
                   <div className="space-y-3">
                      {quoteConcepts.map((concept, index) => (
                         <div key={concept.id} className="flex flex-col md:flex-row gap-3 items-end bg-white p-3 rounded-xl border border-gray-200 shadow-sm relative group">
                            <button onClick={() => setQuoteConcepts(quoteConcepts.filter(c => c.id !== concept.id))} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-sm"><X className="w-3 h-3"/></button>
                            <div className="flex-1 w-full">
                               <label className="block text-xs font-semibold text-gray-500 mb-1">Descripción del Servicio</label>
                               <input type="text" placeholder="Ej. Elemento de Limpieza Matutino" value={concept.description} onChange={e => {
                                  let newC = [...quoteConcepts];
                                  newC[index].description = e.target.value;
                                  setQuoteConcepts(newC);
                               }} className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:bg-white"/>
                            </div>
                            <div className="w-full md:w-20">
                               <label className="block text-xs font-semibold text-gray-500 mb-1">Cant/Pax</label>
                               <input type="number" min="1" value={concept.qty} onChange={e => {
                                  let newC = [...quoteConcepts];
                                  newC[index].qty = parseInt(e.target.value) || 0;
                                  setQuoteConcepts(newC);
                               }} className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none text-center font-bold"/>
                            </div>
                            <div className="w-full md:w-32">
                               <label className="block text-xs font-semibold text-gray-500 mb-1">Costo Unit (MXN)</label>
                               <input type="number" min="0" placeholder="0.00" value={concept.unitPrice || ''} onChange={e => {
                                  let newC = [...quoteConcepts];
                                  newC[index].unitPrice = parseFloat(e.target.value) || 0;
                                  setQuoteConcepts(newC);
                               }} className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none font-bold text-gray-900 border-l-4 border-l-emerald-500"/>
                            </div>
                            <div className="w-full md:w-32 text-right pt-2 md:pt-0">
                               <p className="text-xs text-gray-400 font-medium mb-1">Subtotal</p>
                               <p className="text-sm font-black text-gray-800">${(concept.qty * (concept.unitPrice || 0)).toLocaleString()}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Extras y Notas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2 border-b pb-1">Cargos Operativos Extra</label>
                     <div className="flex items-center gap-3 mt-3">
                        <div className="bg-orange-50 p-2 rounded-lg text-orange-600"><Settings className="w-5 h-5"/></div>
                        <div className="flex-1">
                           <p className="text-xs font-bold text-gray-800">Insumos y Maquinaria (MXN)</p>
                           <input type="number" min="0" placeholder="0.00" value={newQuoteData.suppliesCost || ''} onChange={e => setNewQuoteData({...newQuoteData, suppliesCost: parseFloat(e.target.value)||0})} className="w-full mt-1 border border-gray-200 px-2 py-1 rounded text-sm font-bold outline-none"/>
                        </div>
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-1">Condiciones Comerciales (Notas)</label>
                     <textarea rows={3} value={newQuoteData.notes} onChange={e => setNewQuoteData({...newQuoteData, notes: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm placeholder-gray-400" placeholder="Ej. El equipo viaja los lunes. Precios más IVA."></textarea>
                   </div>
                </div>

             </div>

             {/* Footer con Totalizador Matemático */}
             <div className="mt-8 pt-5 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-6 bg-gray-50 px-6 py-4 rounded-xl shadow-inner">
                <div>
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Valor Total de Inversión</p>
                   <p className="text-3xl font-black text-emerald-700">${quoteTotalRaw.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button onClick={() => setShowNewQuotation(false)} className="flex-1 sm:flex-none px-5 py-3 text-gray-600 font-semibold hover:bg-gray-200 bg-white border border-gray-200 rounded-xl transition">Descartar</button>
                  <button onClick={handleCreateQuotation} disabled={isSavingQuote} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 border border-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition shadow-xl hover:shadow-emerald-900/20">
                    {isSavingQuote ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5"/>} {isSavingQuote ? 'Procesando...' : 'Guardar y Pre-visualizar'}
                  </button>
                </div>
             </div>
           </div>
        </div>
      )}

      {/* --- VISOR PDF ALTA DEFINICIÓN (FASE 23) --- */}
      {showQuoteViewer && activeQuote && (
        <>
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              body * {
                visibility: hidden;
              }
              #pdf-membrete, #pdf-membrete * {
                visibility: visible;
              }
              #pdf-membrete {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0;
                padding: 0;
              }
              @page {
                size: A4;
                margin: 0;
              }
              /* Force hide next.js wrappers margins */
              body, html {
                background-color: white !important;
                margin: 0 !important;
                padding: 0 !important;
              }
            }
          `}} />
          <div className="fixed inset-0 bg-gray-900/90 z-[60] flex flex-col items-center justify-start p-4 sm:p-8 overflow-y-auto print:static print:p-0 print:m-0 print:block print:overflow-visible">
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { margin: 0; size: auto; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              }
            `}} />
            {/* Action Bar (Not Printed) */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex justify-between items-center max-w-4xl w-full mb-6 shadow-2xl print:hidden sticky top-0 z-10">
               <div className="text-white">
                  <h3 className="font-bold text-lg flex items-center gap-2"><FileText className="w-5 h-5"/> Pre-visualización de Cotización</h3>
                  <p className="text-xs text-white/70">Revise la hoja membretada generada antes de exportarla.</p>
               </div>
               <div className="flex gap-3">
                 <button onClick={() => setShowQuoteViewer(false)} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2"><X className="w-4 h-4"/> Cerrar</button>
                 <button onClick={handlePrint} className="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-2 rounded-xl text-sm font-black transition flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.5)]"><Save className="w-4 h-4"/> Exportar a PDF</button>
               </div>
            </div>

            {/* A4 Sheet (Printable Area) */}
            <div id="pdf-membrete" className="max-w-[210mm] w-full min-h-[297mm] shadow-[0_0_40px_rgba(0,0,0,0.3)] mx-auto overflow-hidden print:shadow-none print:m-0 print:p-0 relative flex flex-col antialiased print:max-w-none print:w-full print:min-h-0 print:block" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
               
               {/* Header Membrete */}
               <div className="px-10 py-8 flex justify-between items-center" style={{ backgroundColor: '#064e3b', borderBottom: '6px solid #10b981', color: '#ffffff', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 rounded-full flex items-center justify-center p-2 shadow-lg" style={{ backgroundColor: '#ffffff' }}>
                       <Image src="/logo.png" alt="Logo" width={60} height={60} className="w-full h-auto" />
                     </div>
                     <div>
                       <h1 className="text-3xl font-black tracking-tighter" style={{ color: '#ffffff' }}>LIMPIEZA MÉXICO</h1>
                       <p className="font-semibold tracking-widest text-xs uppercase" style={{ color: '#6ee7b7' }}>Servicios Corporativos Integrales</p>
                     </div>
                  </div>
                  <div className="text-right text-xs space-y-1 font-medium" style={{ color: '#d1fae5' }}>
                     <p className="flex items-center justify-end gap-1"><Phone className="w-3 h-3"/> +{companySettings.contactoWhatsapp}</p>
                     <p className="flex items-center justify-end gap-1"><Mail className="w-3 h-3"/> contacto@limpiezamexico.com</p>
                     <p className="flex items-center justify-end gap-1"><LinkIcon className="w-3 h-3"/> www.limpiezamexico.com</p>
                  </div>
               </div>

             {/* Document Body */}
             <div className="px-12 py-10 flex-1 flex flex-col z-10">
                {/* Meta Data */}
                <div className="flex justify-between items-end mb-12">
                   <div>
                     <p className="font-bold text-xs uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>Cotización Preparada Para:</p>
                     <h2 className="text-2xl font-black" style={{ color: '#111827' }}>{activeQuote.clientName}</h2>
                     <p className="text-sm mt-1" style={{ color: '#4b5563' }}>{activeQuote.clientEmail} • {activeQuote.clientPhone}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-2xl font-bold mb-1" style={{ color: '#065f46' }}>{activeQuote.id}</p>
                     <p className="text-sm font-medium" style={{ color: '#6b7280' }}>Fecha Emisión: {new Date(activeQuote.createdAt).toLocaleDateString()}</p>
                     <p className="text-sm font-medium" style={{ color: '#6b7280' }}>Vigencia: {activeQuote.validityDays} días laborables</p>
                   </div>
                </div>

                <div className="mb-8">
                   <h3 className="text-sm font-black uppercase border-b-2 pb-2 mb-4" style={{ color: '#1f2937', borderColor: '#059669' }}>Detalle de Servicios Contratados: <span className="capitalize font-medium ml-2" style={{ color: '#047857' }}>{activeQuote.serviceType.replace('-', ' ')}</span></h3>
                   
                    {/* Tabla Estilizada */}
                   <table className="w-full mt-4 border-collapse">
                      <thead>
                         <tr className="border-b border-gray-300" style={{ backgroundColor: '#f3f4f6' }}>
                            <th className="py-3 px-4 text-left text-xs font-black uppercase" style={{ color: '#4b5563' }}>Descripción del Concepto</th>
                            <th className="py-3 px-4 text-center text-xs font-black uppercase" style={{ color: '#4b5563' }}>Cant</th>
                            <th className="py-3 px-4 text-right text-xs font-black uppercase" style={{ color: '#4b5563' }}>Precio Unitario</th>
                            <th className="py-3 px-4 text-right text-xs font-black uppercase" style={{ color: '#4b5563' }}>Subtotal</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {activeQuote.concepts && activeQuote.concepts.length > 0 ? activeQuote.concepts.map((item:any, index:number) => (
                            <tr key={index} className="border-b border-gray-100 last:border-none">
                               <td className="py-4 px-4 text-sm font-bold" style={{ color: '#1f2937' }}>{item.description}</td>
                               <td className="py-4 px-4 text-sm font-semibold text-center" style={{ color: '#4b5563' }}>{item.qty}</td>
                               <td className="py-4 px-4 text-sm font-mono text-right" style={{ color: '#4b5563' }}>${item.unitPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                               <td className="py-4 px-4 text-sm font-mono font-bold text-right" style={{ color: '#111827' }}>${(item.qty * item.unitPrice).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            </tr>
                         )) : (
                            <tr>
                               <td colSpan={4} className="py-4 px-4 text-sm font-bold text-center" style={{ color: '#1f2937' }}>Plan Global (Legacy - Sin Desglose)</td>
                            </tr>
                         )}
                         {Number(activeQuote.suppliesCost) > 0 && (
                            <tr className="border-t border-gray-200" style={{ backgroundColor: '#fff7ed' }}>
                               <td className="py-4 px-4 text-sm font-bold flex items-center gap-2" style={{ color: '#7c2d12' }}>Gastos Operativos (Insumos/Maquinaria)</td>
                               <td className="py-4 px-4 text-sm font-semibold text-center" style={{ color: '#9a3412' }}>-</td>
                               <td className="py-4 px-4 text-sm font-mono text-right" style={{ color: '#9a3412' }}>-</td>
                               <td className="py-4 px-4 text-sm font-mono font-bold text-right" style={{ color: '#7c2d12' }}>${Number(activeQuote.suppliesCost).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                            </tr>
                         )}
                      </tbody>
                   </table>
                </div>

                <div className="flex justify-between items-start mt-4">
                   <div className="w-1/2 pr-8">
                      {activeQuote.notes && (
                        <div className="p-4 border-l-4 rounded-r-lg" style={{ backgroundColor: '#f9fafb', borderColor: '#d1d5db' }}>
                           <p className="text-xs font-bold uppercase mb-2" style={{ color: '#6b7280' }}>Anexos y Condiciones Comerciales</p>
                           <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: '#374151' }}>{activeQuote.notes}</p>
                        </div>
                      )}
                   </div>
                   <div className="w-1/2 lg:w-1/3">
                      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: '#ecfdf5', borderColor: '#d1fae5' }}>
                         <div className="p-4 flex justify-between items-center border-b" style={{ borderColor: '#d1fae5' }}>
                           <p className="text-sm font-bold" style={{ color: '#4b5563' }}>Subtotal Operativo</p>
                           <p className="text-sm font-mono font-bold" style={{ color: '#1f2937' }}>${activeQuote.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                         </div>
                         <div className="p-4 flex justify-between items-center border-b" style={{ borderColor: '#d1fae5' }}>
                           <p className="text-sm font-bold" style={{ color: '#4b5563' }}>I.V.A (16%)</p>
                           <p className="text-sm font-mono font-bold" style={{ color: '#1f2937' }}>${(activeQuote.amount * 0.16).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                         </div>
                         <div className="p-5 flex justify-between items-center" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', backgroundColor: '#047857', color: '#ffffff' }}>
                           <p className="text-sm font-bold uppercase tracking-wider" style={{ color: '#ffffff' }}>Importe Total</p>
                           <p className="text-2xl font-black" style={{ color: '#ffffff' }}>${(activeQuote.amount * 1.16).toLocaleString(undefined, {minimumFractionDigits: 2})} <span className="text-xs" style={{ color: '#a7f3d0' }}>MXN</span></p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Sellos de Fuego */}
                <div className="mt-auto pt-16 grid grid-cols-2 gap-8 w-3/4 mx-auto text-center">
                   <div>
                     <div className="border-b w-full mb-3 pb-8" style={{ borderColor: '#9ca3af' }}></div>
                     <p className="font-bold text-sm" style={{ color: '#1f2937' }}>{activeQuote.clientName}</p>
                     <p className="text-xs" style={{ color: '#6b7280' }}>De Conformidad (Cliente)</p>
                   </div>
                   <div>
                     <div className="border-b w-full mb-3 pb-8 flex justify-center" style={{ borderColor: '#9ca3af' }}><div className="w-16 h-8" style={{ opacity: 0.2 }}><Image src="/logo.png" alt="Sello" width={60} height={30} className="w-full h-auto object-contain filter grayscale"/></div></div>
                     <p className="font-bold text-sm" style={{ color: '#065f46' }}>Dirección Comercial</p>
                     <p className="text-xs" style={{ color: '#6b7280' }}>Limpieza México S.A de C.V</p>
                   </div>
                </div>
             </div>
             
             {/* Footer Membrete */}
             <div className="text-center py-4 px-10 border-t text-xs font-medium" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact', backgroundColor: '#f3f4f6', borderColor: '#e5e7eb', color: '#6b7280' }}>
               <p>{companySettings.direccionFisica}</p>
               <p className="mt-1">Documento Confidencial. Precios sujetos a cambios sin previo aviso salvo vigencia expresa.</p>
             </div>
          </div>
        </div>
        </>
      )}

    </AuthGuard>
  );
}
