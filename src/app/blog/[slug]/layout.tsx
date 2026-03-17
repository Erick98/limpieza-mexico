import { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const docRef = doc(db, 'blog_posts', params.slug);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return {
        title: 'Artículo no encontrado | Limpieza México',
        robots: 'noindex'
      };
    }

    const data = snapshot.data();
    const extractContent = typeof data.content === 'string' 
      ? data.content.substring(0, 160).replace(/#/g, '').trim() + '...' 
      : 'Lea nuestro nuevo artículo sobre servicios corporativos e industriales.';

    return {
      title: `${data.title} | Blog de Limpieza México`,
      description: extractContent,
      openGraph: {
        title: data.title,
        description: extractContent,
        url: `/blog/${params.slug}`,
        type: 'article',
        publishedTime: data.createdAt ? new Date(data.createdAt).toISOString() : undefined,
        authors: [data.author || 'Limpieza México'],
        images: [
          {
            url: data.imageUrl || '/images/og-image-default.jpg',
            width: 1200,
            height: 630,
            alt: data.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: data.title,
        description: extractContent,
        images: [data.imageUrl || '/images/og-image-default.jpg'],
      },
    };
  } catch (error) {
    console.warn("Error generando metadata del artículo:", error);
    return {
       title: 'Blog | Limpieza México'
    }
  }
}

export default function BlogArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
