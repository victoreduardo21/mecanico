import React from 'react';
import { Service } from '../types';
import { motion } from 'motion/react';
import { Wrench, Shield, Clock, Plus, Check, ChevronDown } from 'lucide-react';

interface ServiceCardProps {
  key?: string | number;
  service: Service;
  isSelected: boolean;
  onSelectToggle: () => void;
  onOpenBooking: () => void;
}

export default function ServiceCard({ service, isSelected, onSelectToggle, onOpenBooking }: ServiceCardProps): React.JSX.Element {
  const [expanded, setExpanded] = React.useState(false);

  // Pick dynamic descriptive icon
  const getIcon = (id: string) => {
    switch (id) {
      case 'align-bal':
        return <Wrench className="w-5 h-5 text-amber-500" />;
      case 'brakes':
        return <Shield className="w-5 h-5 text-amber-500" />;
      case 'suspension':
        return <Wrench className="w-5 h-5 text-amber-500" />;
      case 'oil-change':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'air-con':
        return <Wrench className="w-5 h-5 text-amber-500" />;
      default:
        return <Wrench className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className={`bg-[#141417] border rounded-xl overflow-hidden flex flex-col justify-between transition-all group ${
        isSelected
          ? 'border-amber-600/70 shadow-[0_4px_20px_rgba(245,158,11,0.15)]'
          : 'border-slate-800 hover:border-slate-700 hover:shadow-lg'
      }`}
    >
      <div>
        {service.imageUrl && (
          <div className="w-full h-44 overflow-hidden relative border-b border-slate-800/80">
            <img
              src={service.imageUrl}
              alt={service.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://www.centroautomotivorr.com.br/wp-content/uploads/2021/06/ALINHAMENTO-.jpeg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141417]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        )}
        
        <div className="p-5 md:p-6 pb-2">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="p-3 bg-neutral-950 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
              {getIcon(service.id)}
            </div>
            <span className="text-[10px] font-mono uppercase bg-neutral-950 border border-slate-800 px-2.5 py-1 rounded-full text-slate-400">
              {service.category}
            </span>
          </div>

          <h4 className="font-display font-semibold text-lg text-white group-hover:text-amber-500 transition-colors mb-2">
            {service.title}
          </h4>

          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            {service.description}
          </p>

          {/* Collapsible item details */}
          <div className="mb-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {expanded ? 'Ocultar detalhes' : 'Ver vantagens e itens inclusos'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
            </button>

            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-3 space-y-1.5 pl-1 border-l-2 border-slate-800"
              >
                {service.features.map((feat, index) => (
                  <li key={index} className="text-xs text-slate-400 flex items-start gap-1.5">
                    <span className="text-amber-500 mt-1 shrink-0">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 pt-4 border-t border-slate-800/80 mt-2 flex items-center justify-between gap-3 bg-[#111113]/40">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Estimativa</div>
          <div className="font-display font-bold text-white text-sm md:text-base">
            {service.priceEstimate.replace('A partir de ', 'R$ ')}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSelectToggle}
            className={`cursor-pointer p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              isSelected
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-neutral-950 hover:bg-slate-800 text-slate-350 border border-slate-800'
            }`}
            title={isSelected ? 'Remover da simulação' : 'Adicionar à simulação'}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" />
                <span>Simulando</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Simular</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
