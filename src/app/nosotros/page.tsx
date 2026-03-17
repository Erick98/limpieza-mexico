import { Award, Target, TrendingUp, Users } from "lucide-react";

export default function Nosotros() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Nuestra <span className="text-emerald-600">Historia</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Limpieza México nació con una visión clara: dignificar el sector de limpieza e inyectarle toda la tecnología, procesos y garantías operativas de clase mundial que la industria moderna demanda.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Durante más de una década hemos capacitado a miles de colaboradores y transformado los entornos de trabajo y hogares de nuestros clientes bajo estándares estrictos de calidad, confianza y responsabilidad social.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
              <img src="/images/team_group.png" alt="Equipo de Limpieza México" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-emerald-900/20 mix-blend-multiply" />
            </div>
          </div>
        </div>

        {/* Stats / Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 text-center">
          {[
            { num: "15+", label: "Años de Experiencia", icon: <TrendingUp className="w-6 h-6 mx-auto mb-2 text-emerald-500" /> },
            { num: "2,500+", label: "Colaboradores Activos", icon: <Users className="w-6 h-6 mx-auto mb-2 text-emerald-500" /> },
            { num: "15M", label: "M² Limpiados Mensuales", icon: <Target className="w-6 h-6 mx-auto mb-2 text-emerald-500" /> },
            { num: "ISO 9001", label: "Certificaciones", icon: <Award className="w-6 h-6 mx-auto mb-2 text-emerald-500" /> }
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              {stat.icon}
              <div className="text-4xl font-extrabold text-gray-900 mb-2">{stat.num}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Academy Section */}
        <div className="bg-gray-950 text-white rounded-3xl p-12 lg:p-16 mb-24 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-emerald-600/20 blur-3xl z-0" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold tracking-wide border border-emerald-500/30 mb-6">
                EXCLUSIVA INICIATIVA INTERNA
              </div>
              <h2 className="text-4xl font-bold mb-6">Limpieza México Academy</h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                El corazón de nuestro servicio de excelencia. Es nuestra universidad corporativa donde cada colaborador, desde limpieza hasta gerentes operativos, recibe capacitación teórica, técnica y de inteligencia emocional antes de pisar las instalaciones de un cliente.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" /> Capacitación en Insumos Químicos Seguros
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" /> Protocolos de Actuación en Riesgos Sanitarios
                </li>
                <li className="flex gap-3 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" /> Clases de Desarrollo Humano y Confianza
                </li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[300px]">
              <img src="/images/team_training.png" alt="Capacitación del personal en Limpieza México Academy" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
