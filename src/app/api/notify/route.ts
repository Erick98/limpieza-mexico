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

      case "new_contact":
        subject = `📞 NUEVO MENSAJE DE CONTACTO: ${data.name}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0284c7;">Nueva Solicitud desde Formulario Web</h2>
            <p>Un cliente potencial ha completado el formulario en la página de contacto.</p>
            <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee; width: 150px;"><strong>Nombre:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Empresa:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company || "No especificada"}</td></tr>
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Teléfono:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone}</td></tr>
               <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Servicio:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.service || "No especificado"}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #0284c7;">
               <h4 style="margin-top: 0; color: #0f172a;">Detalles del proyecto:</h4>
               <p style="white-space: pre-line;">${data.message || "Sin detalles adicionales."}</p>
            </div>
            <p style="margin-top: 30px; font-size: 12px; color: #888;">Responder a este correo no contactará directamente al usuario. Use la información de contacto provista arriba.</p>
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

    // Enviar correo de bienvenida al cliente si es un nuevo usuario
    if (action === "new_user" && data.email) {
      const welcomeSubject = "¡Bienvenido a Limpieza México!";
      const welcomeHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #059669; text-align: center;">¡Bienvenido a Limpieza México!</h2>
          <p style="font-size: 16px; line-height: 1.5;">Hola,</p>
          <p style="font-size: 16px; line-height: 1.5;">Gracias por registrarte en nuestra plataforma. Estamos muy felices de tenerte con nosotros.</p>
          <p style="font-size: 16px; line-height: 1.5;">A través de tu cuenta podrás gestionar y contratar servicios de limpieza a la medida, solicitar cotizaciones y administrar tu personal.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 14px; color: #666; text-align: center;">Si tienes alguna pregunta, responde a este correo y te atenderemos con gusto.</p>
          <p style="font-size: 14px; text-align: center;"><strong>El equipo de Limpieza México</strong></p>
        </div>
      `;
      // No bloqueamos la respuesta principal si falla el correo de bienvenida
      await sendEmail(data.email, welcomeSubject, welcomeHtml).catch(err => console.error("Error al enviar bienvenida:", err));
    }

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
