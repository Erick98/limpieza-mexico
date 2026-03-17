# Limpieza México - Plataforma Corporativa

Este es el repositorio oficial de la plataforma tecnológica integral "Limpieza México", desarrollada sobre el poderoso framework **Next.js (App Router)** y **TailwindCSS**, e impulsada por **Firebase** como base de datos en tiempo real y Auth.

## Instrucciones de Despliegue en Producción (Vercel)

Preparar y lanzar esta plataforma a producción es un proceso sencillo diseñado para **Vercel**, la plataforma nativa de Next.js. El proyecto ha sido probado exitosamente con `npm run build` sin errores.

### Paso 1: Repositorio (GitHub)
Asegúrese de subir todos estos archivos de código a un repositorio privado en su cuenta de GitHub. Asegúrese de **no incluir** el archivo `.env.local` en el commit (este ya es excluido automáticamente por `.gitignore`).

### Paso 2: Importar en Vercel
1. Crea una cuenta gratuita o inicia sesión en [Vercel](https://vercel.com/).
2. Haz clic en "Add New..." -> "Project".
3. Vincula tu cuenta de GitHub y selecciona el repositorio "Limpieza México" recién creado.

### Paso 3: Variables de Entorno (Crucial)
Antes de darle al gran botón de *Deploy*, en la sección de configuración del proyecto de Vercel, deberás abrir la pestaña **Environment Variables**. 

Deberás recrear todas las variables que se encuentran descritas en el archivo `.env.example` en la raíz de su código. Esto conectará tu código desplegado con tu propia base de datos Firebase real y cuenta de Stripe productiva.

*Revisar archivo `.env.example` en el explorador de archivos para el listado exacto.*

### Paso 4: Deploy
Haz clic en **Deploy**. Vercel construirá e inicializará el proyecto. En menos de 3 minutos, obtendrás una URL pública de alta velocidad con certificados de seguridad SSL gratuitos instalados.

## Notas Técnicas a Considerar
- El proyecto ya tiene implementada la Optimización SEO vía JSON-LD y Sitemaps dinámicos.
- La metadata se genera automáticamente, pero asegúrate de poner tu dominio propio en la constante `NEXT_PUBLIC_SITE_URL` una vez lo tengas (ej. `https://limpiezamexico.com`), para un SEO óptimo.
- Las reglas de Seguridad de Firestore (`firebase/firestore.rules`) requerirán cerrarse propiamente para bloquear peticiones públicas una vez iniciado el flujo de usuarios.
