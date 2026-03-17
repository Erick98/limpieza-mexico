"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { ArrowLeft, Calendar, User, BookOpen, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPost() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "blog_posts", slug as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
       <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
       </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Artículo no encontrado</h1>
        <p className="text-gray-500 mb-8 max-w-md">El artículo que intenta leer no existe o ha sido eliminado.</p>
        <button onClick={() => router.push('/blog')} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold transition shadow-sm">
          <ArrowLeft className="w-5 h-5"/> Volver al Blog
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      {/* Article Header (Banner) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
         <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors mb-8 group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Blog
         </Link>

         <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wide">
              {post.category || "General"}
            </span>
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <Calendar className="w-4 h-4"/> 
              {new Date(post.createdAt).toLocaleDateString("es-MX", { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
         </div>
         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {post.title}
         </h1>
         <div className="flex items-center gap-2 text-gray-600 font-medium pb-8 border-b border-gray-100">
            <User className="w-5 h-5 text-gray-400" />
            Por {post.author || "Equipo Editorial"}
         </div>
      </div>

      {post.imageUrl && (
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
           <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
           </div>
         </div>
      )}

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-emerald text-gray-800">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
           {post.content}
        </ReactMarkdown>
      </article>

      {/* Footer Return */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-100 flex justify-center">
         <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-6 py-2 border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 font-medium transition text-sm">
           Volver Arriba
         </button>
      </div>
    </div>
  );
}
