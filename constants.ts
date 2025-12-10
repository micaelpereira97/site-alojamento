import { Unit, Service, Activity } from './types';

export const UNITS: Unit[] = [
  {
    id: 'unit-1',
    name: 'Casa da Serra',
    description: 'Uma casa rústica em pedra com um terraço deslumbrante sobre o vale. Perfeita para quem procura a serenidade das vinhas e do rio.',
    pricePerNight: 120,
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['Wi-Fi', 'Lareira', 'Cozinha Completa', 'Terraço Panorâmico', 'Vista Rio'],
    imageUrl: '/images/casa-da-serra/458670019.jpg', // Foto principal/capa
    images: [
      '/images/casa-da-serra/457605327.jpg',
      '/images/casa-da-serra/457605334.jpg',
      '/images/casa-da-serra/457605347.jpg',
      '/images/casa-da-serra/457605364.jpg',
      '/images/casa-da-serra/458670005.jpg',
      '/images/casa-da-serra/458670008.jpg',
      '/images/casa-da-serra/458670010.jpg',
      '/images/casa-da-serra/458670011.jpg',
      '/images/casa-da-serra/458670017.jpg',
      '/images/casa-da-serra/458670019.jpg',
      '/images/casa-da-serra/458670023.jpg',
      '/images/casa-da-serra/458670026.jpg',
      '/images/casa-da-serra/458670029.jpg',
      '/images/casa-da-serra/458670031.jpg',
      '/images/casa-da-serra/458673346-1.jpg',
      '/images/casa-da-serra/467087349.jpg'
    ],
    googleCalendarId: 'b7535e176efe76894b1ee91827e733cd1a8240910bae246ea03866ba154e33a5@group.calendar.google.com'
  },
  {
    id: 'unit-2',
    name: 'Loft do Rio',
    description: 'Um espaço moderno de vidro e madeira situado nas margens do rio. Ideal para escapadinhas românticas.',
    pricePerNight: 95,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Wi-Fi', 'Ar Condicionado', 'Varanda Rio', 'Jacuzzi Privado'],
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80', // Casa moderna vidro
    images: [
      'https://images.unsplash.com/photo-1505693416388-b034631ac954?w=800&q=80', // Interior moderno branco
      'https://images.unsplash.com/photo-1571896349842-6e5c48dc52e3?w=800&q=80', // Quarto aconchegante
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'  // Casa de banho luxo
    ],
    googleCalendarId: '72c687fee97f44b5cb98815c596a4a40a4f8013bb7af28d22f18dba7ca3201b9@group.calendar.google.com'
  },
  {
    id: 'unit-3',
    name: 'Cabana da Floresta',
    description: 'Imersão total na natureza numa cabana de madeira ecológica. Acorde com o som dos pássaros.',
    pricePerNight: 80,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Energia Solar', 'Rede de Descanso', 'Trilhos Privados', 'Fogão a Lenha'],
    imageUrl: 'https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?w=800&q=80', // Cabana madeira floresta
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', // Interior madeira relax
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80', // Vista floresta
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80'  // Detalhe natureza
    ],
    googleCalendarId: 'b3bc51ca0eff9214930e45830fab07c51b41afc2fc695d930827d64a20273c11@group.calendar.google.com'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'svc-1',
    title: 'Pequeno-Almoço Regional',
    description: 'Desperte os sentidos com uma experiência gastronómica autêntica. O nosso cesto de pequeno-almoço é uma celebração dos sabores da serra, preparado com carinho e entregue discretamente à sua porta todas as manhãs. \n\nO Menu Inclui:\n- Pão de centeio cozido em forno de lenha local ainda quente;\n- Queijo fresco e curado dos pastores da Serra da Lousã;\n- Compotas artesanais de abóbora, mirtilo e frutos silvestres;\n- Mel de urze dourado, produzido nas encostas vizinhas;\n- Sumo de laranja natural, espremido minutos antes da entrega;\n- Seleção de frutas da época e iogurtes naturais;\n- Café, leite e uma seleção de chás biológicos.\n\nDisponível mediante pedido prévio até às 20h do dia anterior.',
    iconName: 'Coffee',
    images: [
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=80', // Comida vista de cima
      'https://images.unsplash.com/photo-1496042399014-dc73c4f2bde1?w=800&q=80', // Mesa na natureza
      'https://images.unsplash.com/photo-1525351484163-7529414395d8?w=800&q=80', // Café e pão
      'https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=800&q=80'  // Pastelaria
    ]
  },
  {
    id: 'svc-2',
    title: 'Limpeza & Conforto',
    description: 'O luxo de um hotel com a privacidade de uma casa. O nosso serviço de limpeza garante que o seu espaço se mantém imaculado durante toda a estadia, permitindo-lhe relaxar completamente sem preocupações domésticas.\n\nO serviço inclui a higienização completa dos espaços, reposição de amenities de banho de marca ecológica, e a troca de toalhas e roupa de cama de algodão egípcio (a cada 3 dias ou mediante pedido). Usamos exclusivamente produtos de limpeza ecológicos e hipoalergénicos, respeitando a sua saúde e a natureza que nos envolve.',
    iconName: 'Sparkles',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80', // Casa de banho limpa
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', // Cama feita
      'https://images.unsplash.com/photo-1616047006789-b7af5afb8c2e?w=800&q=80'  // Sala organizada
    ]
  },
  {
    id: 'svc-3',
    title: 'Aventura em Duas Rodas',
    description: 'Sinta a adrenalina e a liberdade de explorar a Serra da Lousã. Dispomos de uma frota de bicicletas de montanha e e-bikes (elétricas) de alta gama, perfeitas para todos os níveis de experiência.\n\nSeja para um passeio suave ao longo da margem do rio ou para desafiar os trilhos técnicos de downhill conhecidos mundialmente, temos o equipamento certo para si. Incluímos capacete, kit de reparação e mapas digitais com rotas exclusivas que passam por cascatas secretas e miradouros de cortar a respiração.',
    iconName: 'Bike',
    images: [
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80', // Bicicleta na montanha
      'https://images.unsplash.com/photo-1474962558142-9ca839d74deb?w=800&q=80', // Trilho floresta
      'https://images.unsplash.com/photo-1576435728678-38d01d52e38b?w=800&q=80'  // Casal a andar de bicicleta
    ]
  },
  {
    id: 'svc-4',
    title: 'Bem-Estar & Massagens',
    description: 'Transforme a sua estadia num retiro de spa privado. As nossas terapeutas certificadas deslocam-se à sua casa para proporcionar momentos de puro relaxamento, utilizando óleos essenciais biológicos produzidos na região.\n\nEscolha entre uma massagem de relaxamento profundo, ideal para aliviar o stress, uma massagem desportiva para recuperar das caminhadas, ou a nossa assinatura "Ritual da Floresta", que combina pedras quentes com aromaterapia de pinho e eucalipto. O serviço pode ser realizado no interior da sua casa ou, se o tempo permitir, no terraço privado ao som da natureza.',
    iconName: 'HeartHandshake',
    images: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db48e?w=1200&q=80', // Massagem Spa
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', // Pedras quentes
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80'  // Ambiente relaxante
    ]
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Trilhos de Caminhada',
    description: 'Descubra mais de 20km de trilhos sinalizados pela floresta nativa.',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    distance: 'No local',
  },
  {
    id: 'act-2',
    title: 'Praia Fluvial',
    description: 'Águas cristalinas perfeitas para nadar nos dias de verão.',
    imageUrl: 'https://images.unsplash.com/photo-1533378936993-41c6db05e3f1?w=800&q=80',
    distance: '2 km',
  },
  {
    id: 'act-3',
    title: 'Vila Histórica',
    description: 'Visite o castelo medieval e prove a gastronomia local nos restaurantes típicos.',
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd81?w=800&q=80',
    distance: '5 km',
  }
];