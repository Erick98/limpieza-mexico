import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, writeBatch } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { newUid, email } = await req.json();

    if (!newUid || !email) {
      return NextResponse.json({ error: "Datos insuficientes." }, { status: 400 });
    }

    // Buscar si existe una cuenta offline con el mismo correo electrónico
    const qOffline = query(
      collection(db, "users"),
      where("email", "==", email),
      where("isOffline", "==", true)
    );
    const offlineSnaps = await getDocs(qOffline);

    if (offlineSnaps.empty) {
      return NextResponse.json({ message: "No se encontraron cuentas offline para vincular." });
    }

    const batch = writeBatch(db);
    let linkedContracts = 0;

    for (const offlineDoc of offlineSnaps.docs) {
      const offlineId = offlineDoc.id;

      // 1. Buscar todos los contratos asociados a ese ID offline
      const qContracts = query(collection(db, "contratos"), where("userId", "==", offlineId));
      const contractSnaps = await getDocs(qContracts);

      // 2. Apuntar esos contratos al nuevo ID real
      contractSnaps.docs.forEach(contractSnap => {
         batch.update(doc(db, "contratos", contractSnap.id), { userId: newUid });
         linkedContracts++;
      });

      // 3. Borrar el perfil offline obsoleto para evitar conflictos
      batch.delete(doc(db, "users", offlineId));
    }

    // Confirmar y comprometer transacciones
    await batch.commit();

    return NextResponse.json({ 
      success: true, 
      message: `Vinculación exitosa. ${linkedContracts} contratos migrados.` 
    });

  } catch (err: any) {
    console.error("Error en motor de vinculación:", err);
    return NextResponse.json(
      { error: "Error procesando la vinculación de historial." },
      { status: 500 }
    );
  }
}
