import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Correo principal de los administradores donde recibirán los avisos
const ADMIN_EMAILS = process.env.ADMIN_EMAILS || process.env.SMTP_USER || "erick@limpiezamexico.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, data } = body;

    let subject = "Nueva Notificación de Plataforma";
    let htmlContent = "";

    switch (action) {
      case "new_user":
        subject = `🎉 Nuevo prospecto/cliente registrado: ${data.email}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #059669;">¡Nuevo Usuario Registrado!</h2>
            <p>Se ha registrado una nueva cuenta en la plataforma de Limpieza México.</p>
            <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 20px;">
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>WhatsApp:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.whatsapp || "No proporcionado"}</td></tr>
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>UID:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.uid}</td></tr>
            </table>
            <p style="margin-top: 30px; font-size: 12px; color: #888;">Este es un mensaje automático del sistema.</p>
          </div>
        `;
        break;

      case "new_contract":
        subject = `💰 ¡Nuevo Servicio Contratado! (${data.type === 'evento' ? 'Evento Único' : 'Recurrente'})`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #059669;">Nuevo Contrato / Pago Exitoso</h2>
            <p>El sistema ha procesado exitosamente la contratación de un nuevo servicio.</p>
            <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 20px;">
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Cliente ID:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.userId}</td></tr>
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Tipo de Servicio:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.type} a la medida</td></tr>
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Personal Solicitado:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.staffCount} elementos</td></tr>
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Dirección Operativa:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.address || 'N/A'}</td></tr>
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Monto Autorizado:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">$${data.total} USD/MXN</td></tr>
            </table>
            <div style="margin-top: 20px;">
              <a href="https://limpiezamexico.com/dashboard/admin" style="display: inline-block; padding: 10px 20px; background-color: #059669; color: white; text-decoration: none; border-radius: 5px;">Ver en el Panel de Administrador</a>
            </div>
          </div>
        `;
        break;

      default:
        subject = "Aviso del Sistema";
        htmlContent = `<p>Ha ocurrido una acción no clasificada en el sistema: ${JSON.stringify(data)}</p>`;
    }

    // Leer la Caché de Múltiples Administradores para el Enrutamiento (Multiplexación)
    let destinationEmails = ADMIN_EMAILS as string;
    try {
      const cacheSnap = await getDoc(doc(db, "settings", "admins_cache"));
      if (cacheSnap.exists()) {
        const cacheData = cacheSnap.data();
        if (cacheData.emails && Array.isArray(cacheData.emails) && cacheData.emails.length > 0) {
            destinationEmails = cacheData.emails.join(", "); 
        }
      }
    } catch (cacheError) {
      console.error("No se pudo leer la caché de admins, usando default:", cacheError);
    }

    const success = await sendEmail(destinationEmails, subject, htmlContent);

    if (success) {
      return NextResponse.json({ success: true, message: "Notificación enviada" });
    } else {
      return NextResponse.json({ success: false, message: "Fallo en el servicio de correo (Revisar SMTP_USER/PASS)" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error procesando notificacion en el webhook:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
