"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, CalendarClock, ChevronRight, ChevronLeft, 
  Users, CheckCircle2, FileText, Upload, CreditCard, Banknote, PenTool, Loader2
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";

type ServiceType = "evento" | "contrato" | null;
type ContractTerm = "6" | "12" | null;
type ShiftType = "medio" | "completo" | null;
type PersonType = "fisica" | "moral" | null;
type PaymentMethod = "stripe_sus" | "credito" | null;

export default function WizardContratacion() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // -- ESTADOS DEL FORMULARIO --
  const [serviceType, setServiceType] = useState<ServiceType>(null);
  const [staffCount, setStaffCount] = useState<number>(1);
  const [shiftType, setShiftType] = useState<ShiftType>(null);
  const [serviceDate, setServiceDate] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  
  const [contractTerm, setContractTerm] = useState<ContractTerm>(null);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [personType, setPersonType] = useState<PersonType>(null);
  const [personName, setPersonName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [taxId, setTaxId] = useState("");
  const [fiscalAddress, setFiscalAddress] = useState("");
  
  const [ineFile, setIneFile] = useState<File | null>(null);
  const [csfFile, setCsfFile] = useState<File | null>(null);
  const [actaFile, setActaFile] = useState<File | null>(null);
  
  const [signature, setSignature] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  // --- LOGICA DE FIRMA / CANVAS ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // --- PRECIOS DINÁMICOS ---
  const [pricing, setPricing] = useState({
    eventoMedio: 800,
    eventoCompleto: 1500,
    contratoMedio: 8000,
    contratoCompleto: 15000,
    expressSurcharge: 500
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "pricing"), (docSnap) => {
      if (docSnap.exists()) {
        setPricing(docSnap.data() as any);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (step === 4 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
      }
    }
  }, [step]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setSignature(false);
  };
  // --------------------------------

  const toggleDay = (day: string) => {
    setDaysOfWeek(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);
  const totalSteps = serviceType === "evento" ? 3 : 5;

  const handleSubmit = async () => {
    if (!user) {
      alert("Debe iniciar sesión para contratar.");
      router.push("/login");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const isExpress = (() => {
        if (serviceType !== "evento" || !serviceDate) return false;
        const selected = new Date(serviceDate);
        const today = new Date();
        const diffTime = selected.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 1; // Hoy o Mañana
      })();

      const payload = {
        userId: user.uid,
        userEmail: user.email,
        serviceType,
        staffCount,
        shiftType,
        serviceDate,
        serviceAddress,
        isExpress,
        status: "solicitud",
        createdAt: new Date().toISOString(),
        ...(serviceType === "contrato" && {
          contractTerm,
          daysOfWeek,
          personType,
          personName,
          contactPhone,
          taxId,
          fiscalAddress,
          paymentMethod,
          hasSignature: signature
        })
      };

      // Guardamos la solicitud inicial en Firebase ("pendiente")
      const docRef = await addDoc(collection(db, "contratos"), payload);

      // Si es a Crédito, terminamos aquí y mandamos al dashboard
      if (serviceType === "contrato" && paymentMethod === "credito") {
        alert("Hemos recibido sus requerimientos operativos. Un administrador analizará su solicitud y emitirá una cotización formal en breve.");
        router.push("/dashboard/cliente");
        return;
      }

      // Si es Evento o Suscripción Stripe, llamamos a nuestro Endpoint de Checkout
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload: { ...payload, id: docRef.id }, // Mandamos el ID para relacionarlo luego en el Webhook de Stripe
          success_url: `${window.location.origin}/dashboard/cliente`,
          cancel_url: `${window.location.origin}/dashboard/cliente/contratar`,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url; // Redirigir al cliente a la página segura de Stripe
      } else {
         throw new Error("No se pudo obtener URL de Stripe");
      }
      
    } catch (error) {
      console.error("Error al guardar contrato/pago:", error);
      alert("Ocurrió un error al procesar su solicitud o pago. Intente de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 max-w-4xl mx-auto">
      {/* Header del Wizard */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nueva Contratación</h1>
        <p className="text-gray-500 mt-1">Configure los detalles de su servicio paso a paso.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12 mt-4 px-2 sm:px-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-4 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
          <div 
            className="absolute left-0 top-4 h-1 bg-emerald-500 -z-10 transition-all duration-500 rounded-full"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
          
          {Array.from({ length: totalSteps }).map((_, i) => {
            const stepNames = serviceType === "contrato" 
               ? ["Servicio", "Detalles", "Facturación", "Firma", "Pago"]
               : (serviceType === "evento" ? ["Servicio", "Detalles", "Pago"] : ["Servicio", "...", "..."]);
            
            const isCompleted = step > i + 1;
            const isActive = step === i + 1;

            return (
              <div key={i} className="flex flex-col items-center relative z-10 w-24">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                    isCompleted ? "bg-emerald-500 border-emerald-500 text-white scale-110" : 
                    isActive ? "bg-white border-emerald-500 text-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-125" : 
                    "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5"/> : i + 1}
                </div>
                <span className={`text-xs mt-3 text-center hidden sm:block font-medium transition-colors ${
                    isActive ? "text-emerald-700 font-bold" : 
                    isCompleted ? "text-gray-900" : "text-gray-400"
                }`}>
                  {stepNames[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* -- CONTENIDO DE LOS PASOS -- */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
        
        {/* PASO 1: TIPO DE SERVICIO */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900">1. Seleccione el Tipo de Servicio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => { setServiceType("evento"); setStep(2); }}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  serviceType === "evento" ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                }`}
              >
                <div className={`p-4 rounded-full w-fit mb-4 ${serviceType === "evento" ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-600"}`}>
                  <CalendarClock className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Servicio Por Evento</h3>
                <p className="text-gray-500 text-sm">Limpieza profunda de un solo día. Ideal para entregas de obra, eventos especiales o urgencias.</p>
              </button>

              <button 
                onClick={() => { setServiceType("contrato"); setStep(2); }}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  serviceType === "contrato" ? "border-teal-500 bg-teal-50 shadow-md" : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"
                }`}
              >
                <div className={`p-4 rounded-full w-fit mb-4 ${serviceType === "contrato" ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-600"}`}>
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Contrato Recurrente</h3>
                <p className="text-gray-500 text-sm">Personal fijo asignado a sus instalaciones por plazos de 6 o 12 meses. Incluye supervisión y automatización.</p>
              </button>
            </div>
          </div>
        )}

        {/* PASO 2: DETALLES OPERATIVOS */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900">2. Detalles Operativos</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Cantidad de Personal Requerido</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setStaffCount(Math.max(1, staffCount - 1))} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold">-</button>
                  <span className="text-2xl font-bold text-gray-900 w-8 text-center">{staffCount}</span>
                  <button onClick={() => setStaffCount(staffCount + 1)} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold">+</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Jornada</label>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShiftType("medio")}
                    className={`px-6 py-3 rounded-lg border font-medium transition-colors flex-1 md:flex-none ${shiftType === "medio" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                  >Medio Día (4 hrs)</button>
                  <button 
                    onClick={() => setShiftType("completo")}
                    className={`px-6 py-3 rounded-lg border font-medium transition-colors flex-1 md:flex-none ${shiftType === "completo" ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                  >Día Completo (8 hrs)</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {serviceType === "evento" ? "Fecha del Servicio *" : "Inicio del Contrato *"}
                  </label>
                  <input 
                    type="date"
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  {serviceType === "evento" && serviceDate && (
                    <p className="text-xs mt-2 font-medium text-orange-600">
                      * Servicios agendados para mismo día o día siguiente incurren en tarifa Exprés (+${pricing.expressSurcharge} MXN).
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dirección Operativa *</label>
                  <input 
                    type="text"
                    value={serviceAddress}
                    onChange={(e) => setServiceAddress(e.target.value)}
                    placeholder="Calle, Número, Colonia, C.P."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {serviceType === "contrato" && (
                <>
                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Plazo del Contrato</label>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setContractTerm("6")}
                        className={`px-6 py-3 rounded-lg border font-medium transition-colors ${contractTerm === "6" ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                      >6 Meses</button>
                      <button 
                        onClick={() => setContractTerm("12")}
                        className={`px-6 py-3 rounded-lg border font-medium transition-colors ${contractTerm === "12" ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                      >12 Meses</button>
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">Días de la semana</label>
                     <div className="flex flex-wrap gap-2">
                       {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day => (
                         <button 
                           key={day}
                           onClick={() => toggleDay(day)}
                           className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${daysOfWeek.includes(day) ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}
                         >
                           {day}
                         </button>
                       ))}
                     </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* PASO 3: FACTURACIÓN / DOCUMENTOS (O PAGO PARA EVENTOS) */}
        {step === 3 && serviceType === "evento" && (() => {
           const basePrice = shiftType === "medio" ? pricing.eventoMedio : pricing.eventoCompleto;
           let totalToPay = staffCount * basePrice;
           
           const isExpress = (() => {
             if (!serviceDate) return false;
             const selected = new Date(serviceDate);
             const today = new Date();
             const diffTime = selected.getTime() - today.getTime();
             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
             return diffDays <= 1;
           })();

           if (isExpress) totalToPay += pricing.expressSurcharge;

           return (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold text-gray-900">3. Pago del Servicio</h2>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-lg mb-4">Resumen</h3>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li className="flex justify-between"><span>Personal:</span> <span>{staffCount} ({shiftType === "medio" ? "Medio Día" : "Día Completo"})</span></li>
                    <li className="flex justify-between"><span>Costo Base:</span> <span>$ {staffCount * basePrice}.00 MXN</span></li>
                    {isExpress && (
                      <li className="flex justify-between text-orange-600 font-semibold"><span>Recargo Servicio Exprés:</span> <span>+ $ {pricing.expressSurcharge}.00 MXN</span></li>
                    )}
                    <li className="flex justify-between font-bold text-gray-900 border-t pt-2 mt-2"><span>Total a pagar:</span> <span>$ {totalToPay}.00 MXN</span></li>
                  </ul>

                  <div className="border border-emerald-200 bg-white p-6 rounded-xl flex items-center justify-center flex-col gap-4">
                     <CreditCard className="w-12 h-12 text-emerald-500" />
                     <p className="text-gray-500 text-center font-medium">Checkout de Stripe simulado.</p>
                     <button onClick={handleSubmit} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold w-full hover:bg-gray-800 transition">Pagar de Forma Segura</button>
                  </div>
                </div>
             </div>
           );
        })()}

        {step === 3 && serviceType === "contrato" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-gray-900">3. Datos Fiscales y Documentación</h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Contratante</label>
              <div className="flex gap-4 mb-4">
                <button 
                  onClick={() => setPersonType("fisica")}
                  className={`px-6 py-3 rounded-lg border font-medium flex-1 transition-colors ${personType === "fisica" ? "bg-teal-50 text-teal-800 border-teal-300" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                >Persona Física</button>
                <button 
                  onClick={() => setPersonType("moral")}
                  className={`px-6 py-3 rounded-lg border font-medium flex-1 transition-colors ${personType === "moral" ? "bg-teal-50 text-teal-800 border-teal-300" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                >Persona Moral</button>
              </div>
              
              <input 
                type="text" 
                placeholder={personType === "moral" ? "Razón Social" : "Nombre Completo"}
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 mb-4"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono de Contacto en Sitio</label>
                  <input 
                    type="tel" 
                    placeholder="Ej. 55 1234 5678"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">RFC Completo</label>
                  <input 
                    type="text" 
                    placeholder="Ej. XAXX010101000"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value.toUpperCase())}
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Domicilio Fiscal Extendido</label>
                <input 
                  type="text" 
                  placeholder="Calle, Número, Colonia, C.P, Estado"
                  value={fiscalAddress}
                  onChange={(e) => setFiscalAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {personType && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                 <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer">
                   <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2"/>
                   <span className="text-sm font-medium text-gray-700">Subir INE (Frente y Vuelta)</span>
                 </div>
                 <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer">
                   <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2"/>
                   <span className="text-sm font-medium text-gray-700">Constancia de Situación Fiscal</span>
                 </div>
                 {personType === "moral" && (
                   <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer md:col-span-2">
                     <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2"/>
                     <span className="text-sm font-medium text-gray-700">Acta Constitutiva o Poder Notarial</span>
                   </div>
                 )}
              </div>
            )}
          </div>
        )}

        {/* PASO 4: FIRMA DIGITAL (Solo Contratos) */}
        {step === 4 && serviceType === "contrato" && (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-xl font-bold text-gray-900">4. Firma del Contrato</h2>
             <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 h-48 overflow-y-auto text-xs text-gray-600 space-y-4">
               <h3 className="font-bold text-sm text-center">CONTRATO DE PRESTACIÓN DE SERVICIOS DE LIMPIEZA</h3>
               <p>Que celebran por una parte Limpieza México S.A. de C.V., y por la otra {personName || "EL CLIENTE"}, al tenor de las siguientes declaraciones y cláusulas...</p>
               <p><strong>PRIMERA:</strong> El prestador se compromete a brindar el servicio con {staffCount} personas, los días {daysOfWeek.join(", ")} por un periodo de {contractTerm} meses.</p>
               <p><strong>SEGUNDA:</strong> (Extracto de simulación contractual) El costo asume una jornada de tipo {shiftType === "medio" ? "medio tiempo" : "tiempo completo"}...</p>
             </div>

             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Firma Digital</label>
               <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 !h-40 overflow-hidden cursor-crosshair">
                 {!hasSignature && (
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 gap-2">
                     <PenTool className="w-4 h-4"/>
                     <span>Dibuje su firma aquí</span>
                   </div>
                 )}
                 <canvas
                    ref={canvasRef}
                    width={800} // Dimensiones virtuales mayores para no perder resolución
                    height={300}
                    className="w-full h-full touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                 />
               </div>
               <div className="flex justify-end mt-2">
                 <button onClick={clearSignature} className="text-xs text-gray-500 hover:text-red-500 font-semibold">Limpiar firma</button>
               </div>
             </div>

             <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="accept" 
                  checked={signature} 
                  onChange={(e) => setSignature(e.target.checked)} 
                  disabled={!hasSignature}
                  className="w-4 h-4 text-emerald-600 rounded disabled:opacity-50" 
                />
                <label htmlFor="accept" className={`text-sm ${hasSignature ? 'text-gray-900' : 'text-gray-400'}`}>
                  Acepto los términos y certifico mi firma electrónica. (Requerida arriba)
                </label>
             </div>
           </div>
        )}

        {/* PASO 5: METODO DE PAGO (Solo Contratos) */}
        {step === 5 && serviceType === "contrato" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-xl font-bold text-gray-900">5. Método de Pago del Contrato</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setPaymentMethod("stripe_sus")}
                  className={`p-6 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${paymentMethod === "stripe_sus" ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-emerald-300"}`}
                >
                  <CreditCard className={`w-8 h-8 flex-shrink-0 mt-1 ${paymentMethod === "stripe_sus" ? "text-emerald-600" : "text-gray-400"}`} />
                  <div>
                    <h3 className="font-bold text-gray-900">Cargo Automático Total</h3>
                    <p className="text-sm text-gray-500 mt-1">Suscripción mensual vía Stripe. Cargo automático a su tarjeta cada 30 días.</p>
                  </div>
                </button>

                <button 
                  onClick={() => setPaymentMethod("credito")}
                  className={`p-6 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${paymentMethod === "credito" ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-emerald-300"}`}
                >
                  <Banknote className={`w-8 h-8 flex-shrink-0 mt-1 ${paymentMethod === "credito" ? "text-emerald-600" : "text-gray-400"}`} />
                  <div>
                    <h3 className="font-bold text-gray-900">Línea de Crédito a 30 Días</h3>
                    <p className="text-sm text-gray-500 mt-1">Sujeta a aprobación administrativa. Facturación a mes vencido pagadera por SPEI.</p>
                  </div>
                </button>
             </div>
          </div>
        )}

      </div>

      {/* -- FOOTER DE CONTROLES -- */}
      <div className="flex justify-between mt-8 border-t border-gray-200 pt-6">
        {step > 1 && (
          <button 
            onClick={handlePrev}
            className="flex items-center gap-2 px-6 py-3 font-semibold rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> Regresar
          </button>
        )}

        {step < totalSteps && totalSteps > 0 && (
          <button 
            onClick={handleNext}
            disabled={
              (step === 1 && !serviceType) ||
              (step === 2 && (!shiftType || !serviceDate || !serviceAddress || (serviceType === "contrato" && (!contractTerm || daysOfWeek.length === 0)))) ||
              (step === 3 && serviceType === "contrato" && (!personType || !personName || !contactPhone || !taxId || !fiscalAddress)) ||
              (step === 4 && serviceType === "contrato" && !signature)
            }
            className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed ml-auto"
          >
            Continuar <ChevronRight className="w-5 h-5" />
          </button>
        )}
        
        {step === totalSteps && serviceType === "contrato" && (
          <button 
            onClick={handleSubmit}
            disabled={!paymentMethod || isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors ml-auto disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
               <><Loader2 className="w-5 h-5 animate-spin"/> Procesando...</>
            ) : (
               <>Finalizar Contrato <CheckCircle2 className="w-5 h-5"/></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
