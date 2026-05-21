import { Service, Review, FAQItem } from './types';

export const SHOP_INFO = {
  name: 'ZR CAR Centro Automotivo',
  rating: 4.8,
  reviewCount: 34,
  phone: '(13) 3323-0951',
  phoneClean: '1333230951',
  whatsapp: '(13) 99745-8233',
  whatsappClean: '13997458233',
  whatsappUrl: 'https://wa.me/5513997458233?text=Ol%C3%A1%21%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20o%20meu%20ve%C3%ADculo.',
  instagramUrl: 'https://instagram.com/zrcar_centroautomotivo',
  address: 'R. Almeida de Moraes, 200 - Vila Matias, Santos - SP, 11015-450',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.2227183060673!2d-46.331592399999995!3d-23.9525624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce0374e2a6d713%3A0xe53086eb01ae0cae!2sR.%20Almeida%20de%20Moraes%2C%20200%20-%20Vila%20Matias%2C%20Santos%20-%20SP%2C%2011015-450!5e0!3m2!1spt-BR!2sbr!4v1716300000000!5m2!1spt-BR!2sbr',
  hours: [
    { days: 'Segunda a Sexta', time: '08:00 às 18:00' },
    { days: 'Sábado', time: '08:00 às 12:00' },
    { days: 'Domingo', time: 'Fechado' }
  ]
};

export const SERVICES: Service[] = [
  {
    id: 'align-bal',
    title: 'Alinhamento 3D + Balanceamento',
    category: 'suspensão',
    priceEstimate: 'A partir de R$ 120,00',
    description: 'Computadores de alta precisão 3D para alinhamento da geometria do veículo e balanceamento das rodas para eliminar vibrações ao dirigir.',
    estimatedTime: '45 minutos',
    features: ['Alinhamento de eixos dianteiro/traseiro', 'Balanceamento de rodas de liga leve/aço', 'Inspeção preventiva dos pneus', 'Garantia de 3 meses'],
    imageUrl: 'https://www.centroautomotivorr.com.br/produtos/alinhamento-3d-balanceamento/'
  },
  {
    id: 'brakes',
    title: 'Manutenção de Freios',
    category: 'mecânica',
    priceEstimate: 'Sob Orçamento (Peças + Mão de obra)',
    description: 'Diagnóstico e troca preventiva/corretiva de pastilhas de freio, discos, tambores, sapatas e sangria de fluido com equipamento de vácuo especial.',
    estimatedTime: '1 h a 2 h',
    features: ['Pastilhas e discos premium homologados', 'Verificação eletrônica de ABS', 'Auditoria de fluido de freio (teste de ebulição)', 'Limpeza de pinças'],
    imageUrl: 'https://prd-us-brc-wapp-01.azurewebsites.net/content/images/2021/08/manutencao-de-freios-voce-sabe-quando-e-o-momento-de-fazer.jpg'
  },
  {
    id: 'suspension',
    title: 'Diagnóstico e Troca de Suspensão',
    category: 'suspensão',
    priceEstimate: 'A partir de R$ 180,00',
    description: 'Análise detalhada de amortecedores, molas, buchas, pivôs, terminais de direção e barras estabilizadoras para garantir estabilidade e conforto.',
    estimatedTime: '1 h a 3 h',
    features: ['Teste de folgas mecânicas automatizado', 'Amortecedores originais com garantia', 'Substituição de batentes e coifas', 'Revisão pós-instalação'],
    imageUrl: 'https://oclubedomecanico.com.br/wp-content/uploads/2025/04/suspension-closeup-view-from-car-scaled.webp'
  },
  {
    id: 'diagnostics',
    title: 'Scanner e Elétrica Computadorizada',
    category: 'diagnóstico',
    priceEstimate: 'A partir de R$ 100,00',
    description: 'Rastreamento completo do sistema eletrônico da injeção com scanners de última geração para identificar falhas registradas na ECU do veículo.',
    estimatedTime: '30 minutos',
    features: ['Leitura de falhas ativas e históricas', 'Limpeza de códigos de erro das luzes do painel', 'Análise de parâmetros em tempo real', 'Relatório impresso/digital'],
    imageUrl: 'https://conecta.fg.com.br/wp-content/uploads/2019/11/Raven-Scanner-3.mp4_snapshot_00.26.988-800x450.jpg'
  },
  {
    id: 'oil-change',
    title: 'Troca de Óleo e Filtros Essenciais',
    category: 'preventiva',
    priceEstimate: 'A partir de R$ 150,00 (conforme veículo)',
    description: 'Substituição rápida de lubrificantes homologados pelos fabricantes de motores (mineral, sintético e semi-sintético) e filtros relacionados.',
    estimatedTime: '30 minutos',
    features: ['Linha completa de óleos licenciados (SAE, API)', 'Troca do filtro de óleo incluída', 'Verificação gratuita de 10 fluidos', 'Descarte ecologicamente correto'],
    imageUrl: 'https://tresestrelasautocenter.com.br/wp-content/uploads/2022/09/Quandoprecisotrocaroleodocaminho_5cf56ff8a1c8d.jpg'
  },
  {
    id: 'air-con',
    title: 'Carga de Ar Condicionado e Higienização',
    category: 'preventiva',
    priceEstimate: 'A partir de R$ 140,00',
    description: 'Carga de gás refrigerante de acordo com peso específico, teste de vazamentos sob vácuo e aplicação de ozônio antimicrobial na cabine.',
    estimatedTime: '45 minutos',
    features: ['Recarga precisa de gás R134a', 'Substituição opcional do filtro de cabine', 'Higienização eliminando odores e fungos', 'Termo-inspeção do fluxo de ar'],
    imageUrl: 'https://arcondicionadoprochaskar.com.br/wp-content/uploads/2025/09/ar-condicionado-automotivo-carga-de-gas-filtros-e-higienizacao.jpg'
  },
  {
    id: 'general-rev',
    title: 'Revisão Preventiva (Check-up de Viagem)',
    category: 'preventiva',
    priceEstimate: 'A partir de R$ 190,00',
    description: 'Inspeção visual e instrumental de mais de 45 itens críticos do carro para garantir que sua viagem ocorra sem nenhum susto ou imprevisto.',
    estimatedTime: '1 h a 1h30',
    features: ['Verificação de correias e polias', 'Medição do desgaste de pneus', 'Varredura elétrica do alternador/bateria', 'Inspeção do fluido de arrefecimento'],
    imageUrl: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=600'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Renato Silva',
    rating: 5,
    text: 'Atendimento nota dez! Levei o carro para alinhar e balancear, resolveram um barulho na suspensão que nenhuma outra oficina encontrava. Transparência total nos preços e prazos.',
    date: 'Há 1 mês',
    verified: true
  },
  {
    id: '2',
    author: 'Clara Mendes',
    rating: 5,
    text: 'Melhor oficina mecânica de Santos. Fui muito bem recebida. Explicaram exatamente o problema dos freios do meu carro sem tentar empurrar serviços desnecessários. Recomendo muito!',
    date: 'Há 2 semanas',
    verified: true
  },
  {
    id: '3',
    author: 'Marcos Aurelio Alves',
    rating: 4,
    text: 'Profissionais honestos e atenciosos. O diagnóstico por computador foi super rápido e a troca de óleo correu no horário combinado. Preço justo.',
    date: 'Há 3 meses',
    verified: true
  },
  {
    id: '4',
    author: 'Juliana Pinho',
    rating: 5,
    text: 'Sempre trago para fazer a revisão preventiva antes de viajar. O pessoal da ZR CAR é super caprichoso. Oficina limpa e organizada, recomendo com certeza.',
    date: 'Há 1 semana',
    verified: true
  },
  {
    id: '5',
    author: 'Felipe Neves',
    rating: 5,
    text: 'Serviço de primeira! Higienização do ar condicionado e carga de gás resolveu o problema do calor. Atendimento rápido e preço de acordo com a qualidade.',
    date: 'Há 1 mês',
    verified: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Vocês trabalham com carros importados?',
    answer: 'Sim, trabalhamos com veículos nacionais e importados de todas as grandes fabricantes. Dispomos de scanners computadorizados atualizados que cobrem marcas europeias, asiáticas e americanas.',
    category: 'Geral'
  },
  {
    id: 'faq2',
    question: 'Quanto tempo leva para fazer um alinhamento e balanceamento?',
    answer: 'Na ZR CAR de Santos, o alinhamento 3D e o balanceamento levam em média de 40 a 50 minutos. Temos instalações otimizadas para garantir eficiência e velocidade para nossos clientes.',
    category: 'Serviços'
  },
  {
    id: 'faq3',
    question: 'Preciso agendar uma visita ou posso ir direto?',
    answer: 'Você pode vir diretamente à nossa oficina na Rua Almeida de Moraes, Vila Matias. Porém, agendar pelo WhatsApp ou através deste site evita esperas indesejadas e garante atendimento imediato.',
    category: 'Funcionamento'
  },
  {
    id: 'faq4',
    question: 'Quais as formas de pagamento aceitas?',
    answer: 'Aceitamos cartões de Crédito (com parcelamento em até 6x sem juros dependendo do valor), cartões de Débito, PIX e Dinheiro físico.',
    category: 'Geral'
  },
  {
    id: 'faq5',
    question: 'Qual é a garantia dos serviços prestados?',
    answer: 'Todos os nossos serviços contam com garantia legal mínima de 90 dias. Para peças de suspensão e freios de fabricantes oficiais parceiros, algumas garantias se estendem por 1 ano ou mais.',
    category: 'Geral'
  }
];
