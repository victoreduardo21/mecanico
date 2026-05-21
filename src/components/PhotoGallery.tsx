import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, Camera, Grid, Award, Shield } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'serviços' | 'diagnóstico' | 'infraestrutura';
  description: string;
  imageUrl: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Alinhamento de Alta Precisão',
    category: 'serviços',
    description: 'Calibração geométrica computadorizada 3D garantindo maior durabilidade dos pneus e estabilidade de pista.',
    imageUrl: 'https://ingopneus.com.br/wp-content/uploads/2025/07/geometria-em-3d-vantagens-do-alinhamento-de-alta-precisao-300x168.webp'
  },
  {
    id: 'g2',
    title: 'Diagnóstico por Scanner Digital',
    category: 'diagnóstico',
    description: 'Leitura eletrônica avançada da central ECU identificando anomalias e histórico de falhas eletrônicas.',
    imageUrl: 'https://technomotiveniteroi.com.br/wp-content/uploads/2024/10/diagnostico-scanner.jpg'
  },
  {
    id: 'g3',
    title: 'Revisão de Sistemas de Freio',
    category: 'serviços',
    description: 'Substituição milimétrica de pastilhas, teste térmico de discos e sangria monitorada de fluidos.',
    imageUrl: 'https://www.juridbrakes.com.br/uploads/8nbivm47wp8qej2mrjqx.jpg'
  },
  {
    id: 'g4',
    title: 'Infraestrutura e Elevadores Modernos',
    category: 'infraestrutura',
    description: 'Oficina ampla e organizada com elevadores hidráulicos seguros e equipamentos de última geração.',
    imageUrl: 'https://blog.engecass.com.br/wp-content/uploads/2022/05/normas-da-abnt-1080x640.jpg'
  },
  {
    id: 'g5',
    title: 'Ferramental Técnico de Ponta',
    category: 'infraestrutura',
    description: 'Set técnico completo e limpo para intervenções em motores de alta performance de todas as marcas.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g6',
    title: 'Pneus Novos e Calibração',
    category: 'serviços',
    description: 'Substituição e balanceamento de alta precisão com maquinário premium e pneus das principais marcas.',
    imageUrl: 'https://home.car10.com.br/cdn/shop/articles/technician-is-inflate-car-tire-car-maintenance-service-transportation-safety-concept.jpg?v=1624906046'
  }
];

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState<string>('tudo');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeTab === 'tudo'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="galeria" className="py-16 bg-[#0E0E10] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold block mb-1">
            Galeria ZR CAR
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white uppercase tracking-tight">
            Nossa Oficina & Serviços em Fotos
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 font-light">
            Transparência visual de ponta a ponta. Conheça as fotos reais de nossa infraestrutura técnica na Vila Matias, em Santos.
          </p>
        </div>

        {/* Tab Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {['tudo', 'serviços', 'diagnóstico', 'infraestrutura'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`cursor-pointer text-xs font-mono font-semibold uppercase tracking-wider px-4 py-2 rounded-md transition-all border ${
                activeTab === category
                  ? 'bg-amber-600 text-white border-amber-600 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-[#141417] text-slate-400 border-slate-800/80 hover:border-slate-700 hover:text-white'
              }`}
            >
              {category === 'tudo' ? 'Visualizar Tudo' : category}
            </button>
          ))}
        </div>

        {/* Image Bento-style Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedImage(item)}
                className="group relative h-72 rounded-xl overflow-hidden border border-slate-800 bg-[#141417]/80 hover:border-slate-700 hover:shadow-lg transition-all cursor-pointer"
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-80 group-hover:opacity-95 transition-opacity duration-350" />

                {/* Hover Eye Icon */}
                <div className="absolute top-4 right-4 bg-black/75 p-2 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-4 h-4 text-amber-500" />
                </div>

                {/* Info Overlay Panel */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-amber-500 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {item.category}
                  </span>
                  <h3 className="text-white font-display font-semibold text-base mt-2.5 group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 font-light leading-relaxed hidden sm:block">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Subtle highlights row below the bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 p-5 bg-[#141417]/40 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-600/10 text-amber-500 rounded-lg">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">Fotos Reais</span>
              <span className="text-[10px] text-slate-500 block">Todas as fotos são autênticas de nosso espaço de reparo.</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-x border-slate-800/80 pt-3 sm:pt-0 sm:px-6">
            <div className="p-2 bg-amber-600/10 text-amber-500 rounded-lg">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">Ordem & Limpeza</span>
              <span className="text-[10px] text-slate-500 block">Trabalhamos em um ambiente limpo para durabilidade das peças.</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 sm:pl-3">
            <div className="p-2 bg-amber-600/10 text-amber-500 rounded-lg">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">Equipe de Confiança</span>
              <span className="text-[10px] text-slate-500 block">Mecânicos homologados e prontidão máxima para você.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox / Enlarged Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition"
              title="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-[#141417] rounded-xl overflow-hidden border border-slate-800/80 shadow-2xl"
            >
              <div className="h-[430px] md:h-[500px] w-full overflow-hidden bg-black flex items-center justify-center relative">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 bg-[#0E0E10] border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-bold bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    {selectedImage.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">ZR CAR Santos</span>
                </div>
                <h3 className="text-white font-display font-semibold text-xl mt-3">
                  {selectedImage.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2 font-light leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
