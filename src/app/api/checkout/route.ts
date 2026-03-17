import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Inicializamos Stripe solo si hay una llave configurada. De lo contrario, usamos un mock.
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-04-10" as any }) 
  : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { payload, success_url, cancel_url } = body;

    // 1. Simulación si no hay llaves reales (Entorno de Desarrollo)
    if (!stripe) {
      console.log("Stripe mock activado. Redirigiendo a éxito.");
      
      // Simulamos un retraso de red
      await new Promise(r => setTimeout(r, 1500));
      
      return NextResponse.json({ 
        url: success_url + "?mock_session_id=123" 
      });
    }

    // 2. Integración Real con Stripe
    const isSubscription = payload.paymentMethod === "stripe_sus";
    let unitAmount = 0;
    
    // Obtener las tarifas dinámicas de la base de datos (segunda capa de seguridad vs hacks en UI)
    const pricingSnap = await getDoc(doc(db, "settings", "pricing"));
    const pricing = pricingSnap.exists() ? pricingSnap.data() : {
      eventoMedio: 800,
      eventoCompleto: 1500,
      contratoMedio: 8000,
      contratoCompleto: 15000,
      expressSurcharge: 500
    };

    if (payload.serviceType === "evento") {
       const basePrice = payload.shiftType === "medio" ? pricing.eventoMedio : pricing.eventoCompleto;
       let totalCost = payload.staffCount * basePrice;
       if (payload.isExpress) totalCost += pricing.expressSurcharge;

       unitAmount = totalCost * 100; // En centavos
    } else if (payload.serviceType === "contrato") {
       const basePrice = payload.shiftType === "medio" ? pricing.contratoMedio : pricing.contratoCompleto;
       unitAmount = payload.staffCount * basePrice * 100; // Suscripción base
    }

    const sessionData: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: payload.serviceType === "evento" ? "Servicio de Limpieza Por Evento" : "Contrato Recurrente Limpieza",
              description: `${payload.staffCount} pax - Turno ${payload.shiftType}`,
            },
            unit_amount: unitAmount,
            ...(isSubscription && {
              recurring: {
                interval: "month",
              }
            })
          },
          quantity: 1,
        },
      ],
      mode: isSubscription ? "subscription" : "payment",
      success_url: `${success_url}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url,
      metadata: {
        userId: payload.userId,
        serviceType: payload.serviceType,
        // Almacenar el resto de la metadata para los Webhooks
      }
    };

    const session = await stripe.checkout.sessions.create(sessionData);

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    fetch(`${origin}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "new_contract",
        data: {
          userId: payload.userId,
          type: payload.serviceType,
          staffCount: payload.staffCount,
          address: payload.address,
          total: (unitAmount / 100).toFixed(2)
        }
      })
    }).catch(e => console.error("Notificación Mails Fallida:", e));

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Error en Stripe Checkout:", err);
    return NextResponse.json(
      { error: "Error procesando el pago con Stripe." },
      { status: 500 }
    );
  }
}
