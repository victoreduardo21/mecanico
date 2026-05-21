import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wrench,
  Phone,
  MapPin,
  Calendar,
  Star,
  CheckCircle2,
  Clock,
  Instagram,
  MessageSquare,
  Search,
  Navigation,
  ShieldCheck,
  Cpu,
  Bookmark,
  ExternalLink,
  ChevronRight,
  ClipboardCheck,
  Award
} from 'lucide-react';
import { SERVICES, SHOP_INFO } from './data';
import ServiceCard from './components/ServiceCard';
import BudgetCalculator from './components/BudgetCalculator';
import ReviewManager from './components/ReviewManager';
import FAQAccordion from './components/FAQAccordion';
import PhotoGallery from './components/PhotoGallery';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({ isOpen: true, text: 'Aberto agora' });

  // Dynamically calculate operational status based on time
  useEffect(() => {
    const checkStatus = () => {
      // Local time setup
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const hour = now.getHours();
      const minute = now.getMinutes();
      const timeInMinutes = hour * 60 + minute;

      // Monday to Friday: 08:00 - 18:00 (480 mins to 1080 mins)
      // Saturday: 08:00 - 12:00 (480 mins to 720 mins)
      if (day >= 1 && day <= 5) {
        if (timeInMinutes >= 480 && timeInMinutes < 1080) {
          setCurrentStatus({ isOpen: true, text: 'Aberto agora • Fecha às 18:00' });
        } else {
          setCurrentStatus({ isOpen: false, text: 'Fechado agora • Abre às 08:00' });
        }
      } else if (day === 6) {
        if (timeInMinutes >= 480 && timeInMinutes < 720) {
          setCurrentStatus({ isOpen: true, text: 'Aberto agora • Fecha às 12:00' });
        } else {
          setCurrentStatus({ isOpen: false, text: 'Fechado agora • Abre segunda às 08:00' });
        }
      } else {
        setCurrentStatus({ isOpen: false, text: 'Fechado agora • Abre segunda às 08:00' });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check once a minute
    return () => clearInterval(interval);
  }, []);

  const handleToggleServiceSelection = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      setSelectedServiceIds(selectedServiceIds.filter(item => item !== id));
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(SHOP_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filter services on user search or category filter clicking
  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'todos' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#0A0A0B] text-neutral-200 font-sans min-h-screen selection:bg-amber-600 selection:text-white">
      
      {/* Upper Status Ribbon */}
      <div className="bg-amber-600 text-white py-2 px-4 text-center text-xs font-semibold md:flex md:justify-between md:items-center md:max-w-7xl md:mx-auto md:bg-transparent md:text-slate-400 md:border-b md:border-slate-800">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Vila Matias, Santos - SP</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs">
          <span className="flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Seg a Sex: 08:00 - 18:00 | Sáb: 08:00 - 12:00
          </span>
          <a href={`tel:${SHOP_INFO.phoneClean}`} className="text-white hover:text-amber-500 font-bold transition-colors">
            {SHOP_INFO.phone}
          </a>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo / Branding */}
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-600 text-white rounded-lg p-2 font-display font-extrabold text-lg tracking-tighter flex items-center justify-center">
              ZR
            </div>
            <div>
              <span className="font-display font-bold text-base md:text-lg text-white block tracking-tight leading-none uppercase">
                ZR CAR
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 mt-1 block font-semibold">
                Centro Automotivo
              </span>
            </div>
          </div>

          {/* Quick Metrics & Links */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs bg-[#141417] px-3 py-1.5 rounded-lg border border-slate-800 animate-fade-in">
              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
              <span className="font-bold text-white">4.8</span>
              <span className="text-slate-500">({SHOP_INFO.reviewCount} reviews)</span>
            </div>

            <a
              href="#simulador-orcamento"
              className="bg-amber-600 hover:bg-amber-550 text-white text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-3 rounded transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Orçamento Grátis</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-6 md:pt-12 pb-16 overflow-hidden">
        
        {/* Futuristic glowing backdrop */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column / Headings */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Dynamic Status Tag */}
              <div className="inline-flex items-center gap-2 bg-[#141417] border border-slate-800 px-3 py-1.5 rounded-full">
                <span className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="text-xs font-mono font-medium text-slate-350">
                  {currentStatus.text}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight uppercase">
                Precisão <span className="text-amber-500">Mecânica</span> e Honestidade em Santos
              </h1>

              <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light">
                O centro automotivo multimarcas que cuida do seu veículo com transparência total. Alinhamento 3D, freios, suspensão e diagnóstico eletrônico de alto padrão na Vila Matias.
              </p>

              {/* Dynamic CTA Array */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#simulador-orcamento"
                  className="bg-amber-600 hover:bg-amber-550 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded transition-all shadow-[0_4px_25px_rgba(245,158,11,0.2)] flex items-center gap-2 group"
                >
                  <span>Simular Orçamento</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={SHOP_INFO.whatsappUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="bg-[#141417] hover:bg-neutral-900 border border-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-6 py-4 rounded transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>

              {/* Service Features Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="bg-amber-600/10 text-amber-500 p-1.5 rounded-md">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-white text-xs block">Peças Originais</span>
                    <span className="text-[10px] text-slate-500">Garantia assegurada</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="bg-amber-600/10 text-amber-500 p-1.5 rounded-md">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-white text-xs block">Scanner 3D</span>
                    <span className="text-[10px] text-slate-500 font-mono">Alta precisão eletrônica</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="bg-amber-600/10 text-amber-500 p-1.5 rounded-md">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-white text-xs block">Nota 4.8 no Google</span>
                    <span className="text-[10px] text-slate-500">Transparência aprovada</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column / Illustrative Showcase */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="relative rounded-xl overflow-hidden border border-slate-800/80 shadow-2xl bg-[#141417]">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipPuU6bFJHRWFZwNKXSHIMnckp5FvP146fh1jPqq=w243-h174-n-k-no-nu"
                  alt="Fachada ZR CAR Centro Automotivo"
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded dynamic badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 flex justify-between items-center gap-4">
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-amber-500 block font-semibold">Endereço Oficial</span>
                    <span className="text-xs text-white block mt-0.5 leading-snug">
                      R. Almeida de Moraes, 200 - Vila Matias, Santos
                    </span>
                  </div>
                  <button
                    onClick={copyAddressToClipboard}
                    className="bg-neutral-900 hover:bg-amber-600 hover:text-white shrink-0 text-[10px] font-semibold text-white px-2.5 py-1.5 border border-slate-800 rounded-md transition-all cursor-pointer"
                  >
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
              
              {/* Overlap ambient pill */}
              <div className="absolute -top-3 -right-3 z-20 bg-zinc-950 border border-slate-800 rounded-xl p-3 shadow-xl flex items-center gap-2">
                <span className="text-2xl font-extrabold text-white">4.8</span>
                <div className="text-left leading-none">
                  <div className="flex gap-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono font-medium block mt-1">34 avaliações reais</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-16 bg-[#141417]/25 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white uppercase tracking-tight">
              Nossos Serviços Especializados
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">
              Pesquise serviços mecânicos com transparência de dados, tempo médio estimado e estimativas de preço inicial.
            </p>
          </div>

          {/* Search Box & Categories Navigation */}
          <div className="bg-[#141417] border border-slate-800 rounded-xl p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {['todos', 'mecânica', 'suspensão', 'diagnóstico', 'preventiva'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`cursor-pointer text-xs uppercase tracking-wider font-mono font-bold px-3.5 py-1.5 rounded-md transition-all border ${
                      activeCategory === cat
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-neutral-950 text-slate-450 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Dynamic Text Search input */}
              <div className="relative w-full md:max-w-sm shrink-0">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar serviço (freio, óleo...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-900 border border-slate-800 focus:border-amber-600 focus:outline-none rounded-md pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-550 transition-all"
                />
              </div>

            </div>
          </div>

          {/* Services Dynamic Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isSelected={selectedServiceIds.includes(service.id)}
                  onSelectToggle={() => handleToggleServiceSelection(service.id)}
                  onOpenBooking={() => {
                    if (!selectedServiceIds.includes(service.id)) {
                      setSelectedServiceIds([...selectedServiceIds, service.id]);
                    }
                    const elem = document.getElementById('simulador-orcamento');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl max-w-md mx-auto">
              <p className="text-slate-550 text-sm">Não encontramos nenhum serviço com os filtros atuais.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('todos'); }}
                className="mt-3 text-amber-550 text-xs font-semibold hover:underline cursor-pointer"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}

          {/* Service simulation helper footer info */}
          {selectedServiceIds.length > 0 && (
            <div className="mt-8 bg-[#141417]/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm font-medium text-neutral-300">
                Você tem <strong className="text-amber-550">{selectedServiceIds.length}</strong> {selectedServiceIds.length === 1 ? 'serviço selecionado' : 'serviços selecionados'} prontos para simulação de custos!
              </span>
              <a
                href="#simulador-orcamento"
                className="bg-amber-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition"
              >
                Ir para o Simulador
              </a>
            </div>
          )}

        </div>
      </section>

      {/* Simulator Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BudgetCalculator
            initialSelectedServices={selectedServiceIds}
          />
        </div>
      </section>

      {/* Interactive Photo Gallery Section */}
      <PhotoGallery />

      {/* Customer Trust Section (Reviews tab / leave opinion) */}
      <section id="avaliacoes" className="py-16 bg-[#141417]/20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold block mb-1">Reputação Real</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white uppercase tracking-tight">
              O Que Dizem os Nossos Clientes
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">
              Trabalhamos com integridade absoluta para conquistar sua confiança. Veja avaliações de motoristas de Santos que utilizam nossa oficina.
            </p>
          </div>

          <ReviewManager />

        </div>
      </section>

      {/* FAQ and Contact/Location Double Column Grid */}
      <section id="contato" className="py-16 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column / Map & Contacts */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold block mb-1">Localização</span>
                <h3 className="font-display font-semibold text-2xl text-white uppercase tracking-tight">
                  Venha nos Visitar
                </h3>
                <p className="text-sm text-slate-450 mt-1 font-light">
                  Espaço amplo e bem amparado na R. Almeida de Moraes, 200, Vila Matias, Santos. Próximo ao canal 3.
                </p>
              </div>

              {/* Physical Interactive Google Map Embed */}
              <div className="rounded-xl overflow-hidden border border-slate-800 h-64 relative bg-zinc-900">
                <iframe
                  title="Localização ZR CAR Centro Automotivo"
                  src={SHOP_INFO.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale invert opacity-80"
                />
              </div>

              {/* Core contacts dashboard */}
              <div className="space-y-3.5">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(SHOP_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl bg-neutral-900 border border-slate-800 hover:border-slate-700 transition"
                >
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-mono font-bold block h-3 leading-none">Endereço</span>
                    <span className="text-sm text-white block mt-1.5 leading-snug">{SHOP_INFO.address}</span>
                  </div>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`tel:${SHOP_INFO.phoneClean}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#141417]/90 border border-slate-800 hover:border-slate-705 transition"
                  >
                    <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-550 uppercase font-mono block">Telefone</span>
                      <span className="text-sm font-semibold text-white mt-1 block">{SHOP_INFO.phone}</span>
                    </div>
                  </a>

                  <a
                    href={SHOP_INFO.whatsappUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#141417]/90 border border-slate-800 hover:border-slate-705 transition"
                  >
                    <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-550 uppercase font-mono block">WhatsApp</span>
                      <span className="text-sm font-semibold text-white mt-1 block">Clique para enviar</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column / FAQ & Business Hours */}
            <div className="lg:col-span-7 space-y-8">
              
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold block mb-1">Dúvidas Frequentes</span>
                <h3 className="font-display font-medium text-2xl text-white uppercase tracking-tight">
                  Perguntas Comuns
                </h3>
              </div>

              <FAQAccordion />

              {/* Beautiful Table-less Business Hours panel */}
              <div className="bg-[#141417]/80 border border-slate-800 rounded-xl p-6">
                <h4 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span>Horário de Funcionamento da Oficina</span>
                </h4>
                
                <div className="space-y-3 font-mono text-sm max-w-md">
                  {SHOP_INFO.hours.map((hour, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-slate-800/80 last:border-0">
                      <span className="text-neutral-400 font-sans">{hour.days}</span>
                      <span className={`font-semibold ${hour.time === 'Fechado' ? 'text-red-500' : 'text-white'}`}>
                        {hour.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Primary Footer */}
      <footer className="bg-[#0A0A0B] border-t border-slate-800/80 py-12 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
            
            {/* Left Branding */}
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-display font-bold text-lg text-white">ZR CAR CENTRO AUTOMOTIVO</span>
                <span className="text-[10px] bg-amber-600/20 text-amber-500 font-mono px-2 py-0.5 rounded-full font-semibold uppercase">Oficina</span>
              </div>
              <p className="text-slate-500 text-xs mt-2 max-w-md">
                Excelência mecânica, credibilidade e transparência para motoristas de Santos e toda a Baixada Santista.
              </p>
            </div>

            {/* Middle Quick Nav */}
            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
              <a href="#servicos" className="hover:text-white transition">Serviços</a>
              <a href="#simulador-orcamento" className="hover:text-white transition">Simulador</a>
              <a href="#galeria" className="hover:text-white transition">Galeria</a>
              <a href="#avaliacoes" className="hover:text-white transition">Avaliações</a>
              <a href="#contato" className="hover:text-white transition">Localização</a>
            </div>

          </div>

          <div className="border-t border-slate-800/85 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-550 font-mono">
            <span>
              © {new Date().getFullYear()} ZR CAR. R. Almeida de Moraes, 200 - Vila Matias, Santos - SP.
            </span>
            <div className="flex items-center gap-1 text-slate-650">
              <span>Classificação 4.8 Estrelas de Satisfação</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
