import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES, SHOP_INFO } from '../data';
import { Wrench, CheckCircle2, Phone, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

interface BudgetCalculatorProps {
  initialSelectedServices?: string[];
}

export default function BudgetCalculator({ initialSelectedServices = [] }: BudgetCalculatorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedServices);
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedServices = SERVICES.filter(s => selectedIds.includes(s.id));

  // Simple math to show a nice total range
  const calculateTotal = () => {
    let min = 0;
    let max = 0;
    let hasVariable = false;

    selectedServices.forEach(s => {
      if (s.id === 'align-bal') { min += 120; max += 140; }
      else if (s.id === 'brakes') { min += 220; max += 550; hasVariable = true; }
      else if (s.id === 'suspension') { min += 180; max += 450; hasVariable = true; }
      else if (s.id === 'diagnostics') { min += 100; max += 120; }
      else if (s.id === 'oil-change') { min += 150; max += 290; }
      else if (s.id === 'air-con') { min += 140; max += 180; }
      else if (s.id === 'general-rev') { min += 190; max += 220; }
      else { min += 100; max += 200; }
    });

    return { min, max, hasVariable };
  };

  const { min, max, hasVariable } = calculateTotal();

  const handleNextStep = () => {
    if (step === 1 && selectedIds.length === 0) {
      alert('Por favor, selecione pelo menos um serviço para prosseguir.');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !carBrand || !carModel) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    setSubmitting(true);

    // Simulate short processing
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      // Form text for WhatsApp
      const servicesText = selectedServices.map(s => `• ${s.title}`).join('%0A');
      const textMessage = `Ol%C3%A1%20ZR%20CAR%21%20Gostaria%20de%20solicitar%20um%20agendamento%20e%20or%C3%A7amento%3A%0A%0A` +
        `*Cliente%3A*%20${encodeURIComponent(clientName)}%0A` +
        `*Telefone%3A*%20${encodeURIComponent(clientPhone)}%0A` +
        `*Ve%C3%ADculo%3A*%20${encodeURIComponent(carBrand)}%20${encodeURIComponent(carModel)}%20${encodeURIComponent(carYear)}%0A%0A` +
        `*Servi%C3%A7os%20Desejados%3A*%0A${servicesText}%0A%0A` +
        `*Estimativa%20R%C3%A1pida%3A*%20R%24%20${min}%20a%20R%24%20${max}%0A%0A` +
        `Por%20favor%2C%20confirmem%20a%20disponibilidade%20de%20hor%C3%A1rio.%20Obrigado%21`;

      const finalUrl = `https://wa.me/55${SHOP_INFO.whatsappClean}?text=${textMessage}`;
      
      // Open WhatsApp link in new tab or direct window
      window.open(finalUrl, '_blank');
    }, 1200);
  };

  return (
    <div id="simulador-orcamento" className="bg-[#141417] border border-slate-800 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative neon background light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-600/20 text-amber-500 p-2 rounded-lg">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
              Simulador de Orçamento ZR CAR
            </h3>
            <p className="text-sm text-slate-400">
              Escolha serviços, estime valores e fale direto com o mecânico.
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`h-2 flex-grow rounded transition-all duration-300 ${step >= 1 ? 'bg-amber-600' : 'bg-neutral-800'}`} />
          <div className={`h-2 flex-grow rounded transition-all duration-300 ${step >= 2 ? 'bg-amber-600' : 'bg-neutral-800'}`} />
          <div className={`h-2 flex-grow rounded transition-all duration-300 ${step >= 3 ? 'bg-amber-600' : 'bg-neutral-800'}`} />
          <div className="text-xs font-mono text-slate-500 ml-2">Passo {step} de 3</div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="font-display font-medium text-white mb-4 flex items-center justify-between">
                <span>1. Escolha os Serviços Necessários:</span>
                <span className="text-xs text-neutral-400 font-normal">Multi-seleção</span>
              </h4>

              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 mb-6">
                {SERVICES.map((srv) => {
                  const isSelected = selectedIds.includes(srv.id);
                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                        isSelected
                          ? 'bg-amber-950/20 border-amber-600/60 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                          : 'bg-neutral-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white text-sm md:text-base">{srv.title}</span>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400">
                            {srv.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{srv.description}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono text-slate-300 font-semibold">{srv.priceEstimate.replace('A partir de ', '')}</span>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          isSelected ? 'bg-amber-600 border-amber-600 text-white' : 'border-slate-750 bg-neutral-900'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[3px]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedIds.length > 0 && (
                <div className="bg-neutral-950 border border-slate-800 rounded-xl p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase tracking-wider font-mono">Estimativa Inicial</span>
                    <span className="text-base md:text-lg font-display font-semibold text-white">
                      R$ {min},00 {hasVariable ? `a R$ ${max},00` : ''}
                    </span>
                    {hasVariable && <span className="text-[10px] text-slate-500 block">*Pode variar conforme peças necessárias</span>}
                  </div>
                  <button
                    onClick={handleNextStep}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs tracking-wider uppercase px-5 py-3 rounded transition-colors cursor-pointer"
                  >
                    Próximo Passo
                  </button>
                </div>
              )}

              {selectedIds.length === 0 && (
                <div className="text-center py-6 text-neutral-500 text-sm border border-dashed border-neutral-800 rounded-xl">
                  Selecione ao menos um serviço acima para gerar a estimativa.
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="font-display font-medium text-white mb-4">
                2. Informações do Seu Carro:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-widest mb-1.5 font-mono">Marca *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Fiat, Chevrolet"
                    value={carBrand}
                    onChange={(e) => setCarBrand(e.target.value)}
                    className="w-full bg-neutral-950 text-white border border-slate-800 focus:border-amber-600 focus:outline-none rounded-md px-4 py-3 text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-widest mb-1.5 font-mono">Modelo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Uno, Onix"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full bg-neutral-950 text-white border border-slate-800 focus:border-amber-600 focus:outline-none rounded-md px-4 py-3 text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-widest mb-1.5 font-mono">Ano (Opcional)</label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Ex: 2018"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    className="w-full bg-neutral-950 text-white border border-slate-800 focus:border-amber-600 focus:outline-none rounded-md px-4 py-3 text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="bg-neutral-950 border border-slate-800/80 rounded-xl p-4 mb-6 leading-relaxed">
                <span className="text-[10px] text-zinc-500 font-mono tracking-wider block uppercase mb-1">Serviços Selecionados</span>
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map(s => (
                    <span key={s.id} className="text-xs bg-neutral-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      {s.title}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-lg text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </button>
                <button
                  disabled={!carBrand || !carModel}
                  onClick={handleNextStep}
                  className="bg-amber-600 enabled:hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold uppercase text-xs tracking-wider px-6 py-3 rounded transition-colors"
                >
                  Insira Contato
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="font-display font-medium text-white mb-4 flex items-center justify-between">
                <span>3. Suas Informações para Agendamento:</span>
                <span className="text-xs text-amber-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-ping" /> Pronto para enviar
                </span>
              </h4>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 uppercase tracking-widest mb-1.5 font-mono">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João Silva"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-neutral-950 text-white border border-slate-800 focus:border-amber-600 focus:outline-none rounded-md px-4 py-3 text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 uppercase tracking-widest mb-1.5 font-mono">Telefone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: (13) 99999-9999"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-neutral-950 text-white border border-slate-800 focus:border-amber-600 focus:outline-none rounded-md px-4 py-3 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-neutral-950 border border-slate-800 rounded-xl p-4 gap-4 flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-mono block">Resumo do Pedido</span>
                    <span className="text-sm font-medium text-slate-300 block">
                      {carBrand} {carModel} • {selectedIds.length} {selectedIds.length === 1 ? 'Serviço' : 'Serviços'}
                    </span>
                    <span className="text-base font-display font-bold text-amber-500 mt-1 block">
                      Total Estimado: R$ {min},00 {hasVariable ? `~ R$ ${max},00` : ''}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 leading-tight border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
                    Ao confirmar, você será redirecionado para o WhatsApp da ZR CAR com o relatório de solicitação preenchido para reservar seu horário.
                  </div>
                </div>

                {submitted ? (
                  <div className="bg-emerald-650/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    <span className="font-medium text-white">Solicitação efetuada com sucesso!</span>
                    <span className="text-xs text-neutral-300">Se o WhatsApp não abriu automaticamente, clique no botão para enviar.</span>
                    <a
                      href={`https://wa.me/55${SHOP_INFO.whatsappClean}?text=Ol%C3%A1%21%20Sou%20${encodeURIComponent(clientName)}%20e%20gostaria%20de%20confirmar%20meu%20or%C3%A7amento.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors inline-block"
                    >
                      Abrir WhatsApp Novamente
                    </a>
                  </div>
                ) : (
                  <div className="flex justify-between items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 rounded-lg text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all disabled:opacity-40 shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                          Gerando Agendamento...
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4" /> Confirmar no WhatsApp
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
