import React, { useState } from 'react';
import { UNITS, ACTIVITIES, SERVICES } from './constants';
import { Tab, Unit, Service } from './types';
import { UnitCard } from './components/UnitCard';
import { BookingCalendar } from './components/BookingCalendar';
import { ChatWidget } from './components/ChatWidget';
import { GoogleMap } from './components/GoogleMap';
import { MapPin, Phone, Mail, Instagram, Facebook, Menu, X, CheckCircle, Calendar as CalendarIcon, Leaf, ExternalLink, Settings, ShieldCheck, Info, Coffee, Sparkles, Bike, HeartHandshake, BedDouble, Bath, Users, Maximize, ArrowRight, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingDates, setBookingDates] = useState<{start: Date | null, end: Date | null}>({ start: null, end: null });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // --- Handlers ---
  const handleNavClick = (tab: Tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setSelectedService(null); // Reset service selection when changing tabs
    window.scrollTo(0, 0);
  };

  const handleBookClick = (unit: Unit) => {
    setSelectedUnit(unit);
    setBookingDates({ start: null, end: null });
    setShowBookingModal(true);
  };

  const handleDateSelect = (start: Date | null, end: Date | null) => {
    setBookingDates({ start, end });
  };

  const createGoogleCalendarEventUrl = (unit: Unit, start: Date, end: Date) => {
    // Formato necessário para o Google Calendar: YYYYMMDD
    const startStr = format(start, 'yyyyMMdd');
    const endStr = format(end, 'yyyyMMdd');
    
    const title = encodeURIComponent(`Reserva: ${unit.name}`);
    const details = encodeURIComponent(`Pedido de reserva via website.\n\nUnidade: ${unit.name}\n\nPor favor, aguarde a confirmação do proprietário (aceitação deste convite).`);
    const location = encodeURIComponent("Recanto da Natureza - Serra da Lousã");
    
    // O ID do calendário funciona como um email para receber convites
    const inviteEmail = unit.googleCalendarId;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}&add=${inviteEmail}`;
  };

  const handleGoogleCalendarBooking = () => {
    if (!selectedUnit || !bookingDates.start || !bookingDates.end) return;

    const url = createGoogleCalendarEventUrl(selectedUnit, bookingDates.start, bookingDates.end);
    
    // Abrir numa nova aba
    window.open(url, '_blank');
    
    setShowBookingModal(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 8000);
  };

  const getServiceIcon = (iconName: string) => {
    switch(iconName) {
      case 'Coffee': return <Coffee size={32} />;
      case 'Sparkles': return <Sparkles size={32} />;
      case 'Bike': return <Bike size={32} />;
      case 'HeartHandshake': return <HeartHandshake size={32} />;
      default: return <CheckCircle size={32} />;
    }
  };

  // --- Render Sections ---

  const renderHome = () => (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative h-[80vh] w-full flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80" 
          alt="Floresta densa e tranquila" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl text-white">
          <div className="inline-block border border-white/30 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-sm font-medium mb-6 uppercase tracking-widest">
            Alojamento Local & Natureza
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Desligue do mundo.<br />Conecte-se com a vida.
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 text-white/90">
            Três refúgios exclusivos rodeados pela serenidade da floresta.
          </p>
          <button 
            onClick={() => handleNavClick(Tab.ACCOMMODATION)}
            className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg border-2 border-transparent"
          >
            Reservar Agora
          </button>
        </div>
      </div>

      {/* Intro Section */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">Uma experiência autêntica</h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              O Recanto da Natureza nasceu do desejo de partilhar a beleza intocada desta região. 
              Cada uma das nossas casas foi pensada para respeitar o ambiente envolvente, utilizando materiais locais 
              e práticas sustentáveis.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex flex-col gap-2">
                <Leaf className="text-brand-600" size={32} />
                <h4 className="font-bold text-stone-800">100% Sustentável</h4>
                <p className="text-sm text-stone-500">Energia solar e água de nascente.</p>
              </div>
              <div className="flex flex-col gap-2">
                <MapPin className="text-brand-600" size={32} />
                <h4 className="font-bold text-stone-800">Localização Privilegiada</h4>
                <p className="text-sm text-stone-500">No coração do parque natural.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&q=80" alt="Natureza" className="rounded-lg object-cover h-full w-full shadow-lg translate-y-8" />
            <img src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=400&q=80" alt="Interior" className="rounded-lg object-cover h-full w-full shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccommodation = () => (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto animate-fade-in">
      {/* Banner Elegante Verde */}
      <div className="bg-brand-900 rounded-3xl py-16 px-8 text-center mb-16 shadow-xl relative overflow-hidden">
        {/* Elemento decorativo de fundo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-gradient-to-br from-brand-400 to-transparent pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 relative z-10 tracking-tight">Onde Ficar</h2>
        <div className="w-24 h-1 bg-brand-500 mx-auto mb-6 rounded-full relative z-10"></div>
        <p className="text-brand-100 max-w-2xl mx-auto text-lg leading-relaxed relative z-10 font-light">
          Escolha o refúgio perfeito para a sua estadia. Cada espaço tem uma personalidade única e oferece total privacidade.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {UNITS.map(unit => (
          <UnitCard key={unit.id} unit={unit} onBook={handleBookClick} />
        ))}
      </div>
    </div>
  );

  const renderActivities = () => (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">O Que Fazer</h2>
        <p className="text-stone-600 max-w-2xl mx-auto">
          A aventura começa à porta de casa. Explore a região com as nossas sugestões.
        </p>
      </div>
      <div className="space-y-12">
        {ACTIVITIES.map((activity, index) => (
          <div key={activity.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2 h-80 overflow-hidden rounded-2xl shadow-xl">
              <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="inline-block bg-brand-100 text-brand-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {activity.distance}
              </div>
              <h3 className="text-3xl font-serif font-bold text-stone-800">{activity.title}</h3>
              <p className="text-stone-600 text-lg leading-relaxed">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServiceDetail = (service: Service) => {
    return (
      <div className="animate-fade-in pt-20">
        {/* Service Hero */}
        <div className="relative h-[60vh] w-full">
          <img 
            src={service.images ? service.images[0] : ''} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
            <div className="bg-white/20 p-4 rounded-full mb-6 backdrop-blur-sm">
               <div className="text-white">
                  {getServiceIcon(service.iconName)}
               </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-center">{service.title}</h2>
            <button 
              onClick={() => setSelectedService(null)}
              className="mt-8 flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm transition border border-white/30 text-sm font-medium tracking-wide uppercase"
            >
              <ArrowLeft size={16} /> Voltar aos Serviços
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Content */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-stone-100 -mt-24 relative z-10">
             <div className="prose prose-stone prose-lg max-w-none">
                <p className="whitespace-pre-line text-stone-600 leading-relaxed text-lg">
                  {service.description}
                </p>
             </div>

             {/* Gallery Grid */}
             {service.images && service.images.length > 0 && (
               <div className="mt-12">
                 <h3 className="font-serif font-bold text-2xl text-stone-800 mb-6">Galeria de Imagens</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {service.images.map((img, idx) => (
                     <div 
                        key={idx} 
                        className={`overflow-hidden rounded-xl cursor-pointer group relative shadow-md ${idx === 0 ? 'md:col-span-2 h-64 md:h-96' : 'h-64'}`}
                        onClick={() => setLightboxImage(img)}
                     >
                       <img 
                         src={img} 
                         alt={`${service.title} ${idx + 1}`} 
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                       />
                       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize className="text-white drop-shadow-md w-8 h-8" />
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    );
  };

  const renderServicesList = () => (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">Serviços Exclusivos</h2>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Pequenos luxos para tornar a sua estadia inesquecível. Clique em cada serviço para saber mais.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {SERVICES.map(service => (
          <div 
            key={service.id} 
            onClick={() => {
              setSelectedService(service);
              window.scrollTo(0, 0);
            }}
            className="group bg-white rounded-xl border border-stone-100 shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-pointer flex flex-col h-full"
          >
            <div className="h-80 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/20 transition-colors" />
              <img 
                src={service.images ? service.images[0] : ''} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <div className="bg-white/20 p-2 rounded-full w-min mb-3 backdrop-blur-sm">
                   {getServiceIcon(service.iconName)}
                </div>
                <h3 className="text-2xl font-serif font-bold">{service.title}</h3>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow justify-between">
              <p className="text-stone-600 line-clamp-3 mb-6">
                {service.description}
              </p>
              
              <div className="flex items-center text-brand-700 font-bold text-sm tracking-wide uppercase group-hover:translate-x-2 transition-transform">
                Ver Detalhes <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLocation = () => (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto animate-fade-in h-full">
       <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">Localização</h2>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Perdidos na natureza, mas fáceis de encontrar.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
        <div className="md:col-span-1 p-8 bg-brand-900 text-white flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                <MapPin /> Morada
              </h3>
              <p className="text-brand-100">Estrada Nacional 2, km 45<br/>Serra da Lousã, Portugal</p>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                <Phone /> Contactos
              </h3>
              <p className="text-brand-100 mb-1">+351 912 345 678</p>
              <p className="text-brand-100">ola@recantodanatureza.pt</p>
            </div>
             <div>
              <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                <CalendarIcon /> Check-in
              </h3>
              <p className="text-brand-100 mb-1">Check-in: 15:00 - 20:00</p>
              <p className="text-brand-100">Check-out: até às 11:00</p>
            </div>
        </div>
        <div className="md:col-span-2 h-96 md:h-auto">
          <GoogleMap
            address="Serra da Lousã, Portugal"
            zoom={13}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-stone-100">
        <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Termos e Condições</h1>
        <div className="prose prose-stone max-w-none">
          <p className="text-sm text-stone-500 mb-8">Última atualização: 9 de Dezembro de 2025</p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">1. Aceitação dos Termos</h2>
          <p>
            Ao utilizar o website do Recanto da Natureza e ao efetuar uma reserva, você aceita e concorda em ficar vinculado aos presentes Termos e Condições. Se não concordar com estes termos, por favor não utilize os nossos serviços.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">2. Reservas</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Processo de Reserva</h3>
          <p>
            As reservas são efetuadas através do nosso sistema de calendário integrado com Google Calendar. Ao submeter uma reserva, você envia um pedido que está sujeito a confirmação pelo proprietário.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Confirmação</h3>
          <p>
            A reserva só é considerada confirmada após aceitação expressa pelo proprietário através do Google Calendar. Receberá uma notificação por email quando a sua reserva for confirmada.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Pagamento</h3>
          <p>
            O pagamento da estadia deverá ser efetuado conforme acordado no momento da confirmação da reserva. Aceitamos transferência bancária, MBWay e outros métodos a combinar diretamente com o proprietário.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">3. Política de Cancelamento</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cancelamento até 30 dias antes:</strong> Reembolso total</li>
            <li><strong>Cancelamento entre 15-29 dias antes:</strong> Reembolso de 50%</li>
            <li><strong>Cancelamento com menos de 15 dias:</strong> Sem reembolso</li>
          </ul>
          <p className="mt-4">
            Os cancelamentos devem ser comunicados por escrito para ola@recantodanatureza.pt
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">4. Check-in e Check-out</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Check-in:</strong> Entre as 15:00 e as 20:00</li>
            <li><strong>Check-out:</strong> Até às 11:00</li>
            <li>Check-ins tardios ou check-outs antecipados podem ser acordados mediante disponibilidade</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">5. Regras da Propriedade</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>É proibido fumar no interior das unidades</li>
            <li>Animais de estimação apenas mediante autorização prévia</li>
            <li>Respeite o sossego dos vizinhos e da natureza envolvente</li>
            <li>Número máximo de hóspedes não pode exceder a capacidade da unidade</li>
            <li>Festas ou eventos não são permitidos sem autorização prévia</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">6. Responsabilidades do Hóspede</h2>
          <p>
            O hóspede é responsável por quaisquer danos causados à propriedade durante a sua estadia. Reservamo-nos o direito de cobrar pelos danos causados.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">7. Limitação de Responsabilidade</h2>
          <p>
            O Recanto da Natureza não se responsabiliza por perdas, danos ou lesões ocorridas durante a estadia, exceto nos casos previstos por lei.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">8. Alterações aos Termos</h2>
          <p>
            Reservamo-nos o direito de alterar estes Termos e Condições a qualquer momento. As alterações entrarão em vigor imediatamente após a sua publicação no website.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">9. Lei Aplicável</h2>
          <p>
            Estes Termos e Condições são regidos pela lei portuguesa. Qualquer litígio será submetido aos tribunais competentes de Portugal.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">10. Contacto</h2>
          <p>
            Para questões relacionadas com estes Termos e Condições, contacte-nos:
          </p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>Email:</strong> ola@recantodanatureza.pt</li>
            <li><strong>Telefone:</strong> +351 912 345 678</li>
            <li><strong>Morada:</strong> Estrada Nacional 2, km 45, Serra da Lousã, Portugal</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <button
            onClick={() => handleNavClick(Tab.HOME)}
            className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Voltar à Página Inicial
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-stone-100">
        <h1 className="text-4xl font-serif font-bold text-stone-800 mb-8">Política de Privacidade</h1>
        <div className="prose prose-stone max-w-none">
          <p className="text-sm text-stone-500 mb-8">Última atualização: 9 de Dezembro de 2025</p>

          <p className="text-lg text-stone-700 mb-6">
            O Recanto da Natureza respeita a sua privacidade e está comprometido em proteger os seus dados pessoais. Esta política descreve como recolhemos, utilizamos e protegemos as suas informações.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">1. Responsável pelo Tratamento de Dados</h2>
          <p>
            <strong>Recanto da Natureza</strong><br />
            Estrada Nacional 2, km 45<br />
            Serra da Lousã, Portugal<br />
            Email: ola@recantodanatureza.pt<br />
            Telefone: +351 912 345 678
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">2. Dados que Recolhemos</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Dados Fornecidos por Si</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Informações de Reserva:</strong> Nome, email, telefone, datas de estadia, número de hóspedes</li>
            <li><strong>Informações de Pagamento:</strong> Detalhes necessários para processar o pagamento (não armazenamos dados completos de cartão de crédito)</li>
            <li><strong>Comunicações:</strong> Mensagens enviadas através do chat ou email</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Dados Recolhidos Automaticamente</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dados de Navegação:</strong> Endereço IP, browser, sistema operativo</li>
            <li><strong>Cookies:</strong> Utilizamos cookies essenciais para o funcionamento do site</li>
            <li><strong>Interações com IA:</strong> Conversas com o chat bot "Flora" para melhorar o serviço</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">3. Como Utilizamos os Seus Dados</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processar e confirmar reservas</li>
            <li>Comunicar informações sobre a sua estadia</li>
            <li>Enviar confirmações e lembretes por email</li>
            <li>Responder às suas questões e pedidos</li>
            <li>Melhorar os nossos serviços e website</li>
            <li>Cumprir obrigações legais</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">4. Base Legal para o Tratamento</h2>
          <p>
            Processamos os seus dados pessoais com base em:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Execução do Contrato:</strong> Para processar e gerir a sua reserva</li>
            <li><strong>Consentimento:</strong> Para comunicações de marketing (pode retirar a qualquer momento)</li>
            <li><strong>Interesses Legítimos:</strong> Para melhorar os nossos serviços</li>
            <li><strong>Obrigações Legais:</strong> Para cumprimento fiscal e legal</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">5. Partilha de Dados</h2>
          <p>
            Os seus dados podem ser partilhados com:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google (Firebase, Calendar, Maps, Gemini AI):</strong> Para funcionalidades do website</li>
            <li><strong>Processadores de Pagamento:</strong> Para processar transações</li>
            <li><strong>Autoridades:</strong> Quando legalmente obrigatório</li>
          </ul>
          <p className="mt-4">
            <strong>Nunca</strong> vendemos os seus dados a terceiros para fins de marketing.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">6. Transferências Internacionais</h2>
          <p>
            Alguns dos nossos prestadores de serviços (como Google) podem processar dados fora da União Europeia. Garantimos que existem salvaguardas adequadas em vigor, como Cláusulas Contratuais-Tipo aprovadas pela Comissão Europeia.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">7. Período de Conservação</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Dados de Reserva:</strong> 7 anos (obrigações fiscais)</li>
            <li><strong>Comunicações de Marketing:</strong> Até retirar o consentimento</li>
            <li><strong>Dados de Navegação:</strong> Máximo de 12 meses</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">8. Os Seus Direitos (RGPD)</h2>
          <p>
            De acordo com o Regulamento Geral sobre a Proteção de Dados, tem o direito de:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Acesso:</strong> Obter cópia dos seus dados pessoais</li>
            <li><strong>Retificação:</strong> Corrigir dados incorretos ou incompletos</li>
            <li><strong>Apagamento:</strong> Solicitar a eliminação dos seus dados ("direito a ser esquecido")</li>
            <li><strong>Limitação:</strong> Restringir o tratamento dos seus dados</li>
            <li><strong>Portabilidade:</strong> Receber os seus dados em formato estruturado</li>
            <li><strong>Oposição:</strong> Opor-se ao tratamento dos seus dados</li>
            <li><strong>Retirar Consentimento:</strong> A qualquer momento, sem afetar a licitude do tratamento anterior</li>
          </ul>
          <p className="mt-4">
            Para exercer estes direitos, contacte-nos: <strong>ola@recantodanatureza.pt</strong>
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">9. Cookies</h2>
          <p>
            Utilizamos cookies essenciais para o funcionamento do website. Não utilizamos cookies de tracking ou publicidade de terceiros. Pode configurar o seu browser para bloquear cookies, mas isso pode afetar a funcionalidade do site.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">10. Segurança</h2>
          <p>
            Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado, perda ou destruição, incluindo:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encriptação SSL/TLS</li>
            <li>Firewalls e sistemas de segurança</li>
            <li>Acesso restrito aos dados pessoais</li>
            <li>Formação de pessoal sobre proteção de dados</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">11. Reclamações</h2>
          <p>
            Se considera que os seus direitos foram violados, pode apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD):
          </p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>Website:</strong> <a href="https://www.cnpd.pt" target="_blank" rel="noreferrer" className="text-brand-600 underline">www.cnpd.pt</a></li>
            <li><strong>Email:</strong> geral@cnpd.pt</li>
            <li><strong>Morada:</strong> Av. D. Carlos I, 134, 1º, 1200-651 Lisboa</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">12. Alterações a esta Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações significativas através do website ou por email.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-8 mb-4">13. Contacto</h2>
          <p>
            Para questões sobre esta Política de Privacidade ou sobre os seus dados pessoais:
          </p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>Email:</strong> ola@recantodanatureza.pt</li>
            <li><strong>Telefone:</strong> +351 912 345 678</li>
            <li><strong>Morada:</strong> Estrada Nacional 2, km 45, Serra da Lousã, Portugal</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <button
            onClick={() => handleNavClick(Tab.HOME)}
            className="text-brand-600 hover:text-brand-700 font-medium flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Voltar à Página Inicial
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${selectedService ? 'bg-transparent text-white border-transparent' : 'bg-white/90 backdrop-blur-md border-b border-stone-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={() => handleNavClick(Tab.HOME)}
            >
              <Leaf className={`h-8 w-8 mr-2 ${selectedService ? 'text-white' : 'text-brand-600'}`} />
              <span className={`font-serif font-bold text-xl ${selectedService ? 'text-white' : 'text-stone-800'}`}>Recanto da Natureza</span>
            </div>
            
            {/* Desktop Menu */}
            {!selectedService && (
              <div className="hidden md:flex space-x-8">
                {[
                  { id: Tab.HOME, label: 'Início' },
                  { id: Tab.ACCOMMODATION, label: 'Onde Ficar' },
                  { id: Tab.ACTIVITIES, label: 'O Que Fazer' },
                  { id: Tab.SERVICES, label: 'Serviços' },
                  { id: Tab.LOCATION, label: 'Localização' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-sm font-medium transition-colors ${
                      activeTab === item.id 
                        ? 'text-brand-600 border-b-2 border-brand-600' 
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Mobile Menu Button */}
            {!selectedService && (
              <div className="md:hidden flex items-center">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-stone-500 hover:text-stone-800 p-2">
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && !selectedService && (
          <div className="md:hidden bg-white border-b border-stone-200 absolute w-full animate-fade-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                { id: Tab.HOME, label: 'Início' },
                { id: Tab.ACCOMMODATION, label: 'Onde Ficar' },
                { id: Tab.ACTIVITIES, label: 'O Que Fazer' },
                { id: Tab.SERVICES, label: 'Serviços' },
                { id: Tab.LOCATION, label: 'Localização' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-4 text-base font-medium rounded-md ${
                    activeTab === item.id 
                      ? 'bg-brand-50 text-brand-700' 
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {activeTab === Tab.HOME && renderHome()}
        {activeTab === Tab.ACCOMMODATION && renderAccommodation()}
        {activeTab === Tab.ACTIVITIES && renderActivities()}
        {/* Conditional rendering for Services */}
        {activeTab === Tab.SERVICES && (
          selectedService ? renderServiceDetail(selectedService) : renderServicesList()
        )}
        {activeTab === Tab.LOCATION && renderLocation()}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center text-white font-serif font-bold text-xl mb-4">
                <Leaf className="mr-2" /> Recanto da Natureza
             </div>
             <p className="text-sm leading-relaxed mb-4">
               Alojamento local sustentável no coração da serra. A sua casa longe de casa.
             </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => handleNavClick(Tab.ACCOMMODATION)} className="hover:text-white transition">Alojamento</button></li>
              <li><button onClick={() => handleNavClick(Tab.ACTIVITIES)} className="hover:text-white transition">Experiências</button></li>
              <li><button onClick={() => handleNavClick(Tab.LOCATION)} className="hover:text-white transition">Contactos</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Termos & Condições</a></li>
              <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
              <li><button onClick={() => setShowAdminModal(true)} className="flex items-center gap-2 hover:text-white transition mt-2"><Settings size={14}/> Área do Proprietário</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Siga-nos</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-500 transition"><Instagram size={24} /></a>
              <a href="#" className="hover:text-brand-500 transition"><Facebook size={24} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs">
          &copy; {new Date().getFullYear()} Recanto da Natureza. Todos os direitos reservados.
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && selectedUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col relative">
            
            <button 
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition z-20 shadow-sm"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row h-full overflow-hidden">
              
              {/* Coluna Esquerda: Detalhes e Galeria */}
              <div className="md:w-1/2 bg-stone-50 flex flex-col h-full overflow-y-auto custom-scrollbar">
                
                {/* Galeria Principal */}
                <div 
                  className="w-full h-80 md:h-[500px] relative group cursor-pointer"
                  onClick={() => setLightboxImage(selectedUnit.imageUrl)}
                >
                  <img src={selectedUnit.imageUrl} alt={selectedUnit.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
                    <Maximize size={20} />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 pt-12">
                     <h3 className="font-serif font-bold text-3xl text-white shadow-sm">{selectedUnit.name}</h3>
                  </div>
                </div>

                {/* Grid Galeria Extra (Agora em 2 colunas e muito maiores) */}
                {selectedUnit.images && selectedUnit.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {selectedUnit.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className="h-48 md:h-64 overflow-hidden relative cursor-pointer group rounded-lg shadow-md"
                        onClick={() => setLightboxImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`Galeria ${idx}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize className="text-white drop-shadow-md w-8 h-8" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center gap-6 mb-8 text-stone-600 border-b border-stone-200 pb-6">
                    <div className="flex flex-col items-center gap-1">
                      <Users size={24} className="text-brand-600" />
                      <span className="text-xs uppercase tracking-wider font-bold">Capacidade</span>
                      <span className="font-medium">{selectedUnit.capacity} Pessoas</span>
                    </div>
                    <div className="w-px h-10 bg-stone-200"></div>
                    <div className="flex flex-col items-center gap-1">
                      <BedDouble size={24} className="text-brand-600" />
                      <span className="text-xs uppercase tracking-wider font-bold">Quartos</span>
                      <span className="font-medium">{selectedUnit.bedrooms}</span>
                    </div>
                    <div className="w-px h-10 bg-stone-200"></div>
                    <div className="flex flex-col items-center gap-1">
                      <Bath size={24} className="text-brand-600" />
                      <span className="text-xs uppercase tracking-wider font-bold">WC</span>
                      <span className="font-medium">{selectedUnit.bathrooms}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-stone-800 mb-2">Sobre este espaço</h4>
                      <p className="text-stone-600 text-sm leading-relaxed">{selectedUnit.description}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 mb-2">Comodidades</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedUnit.amenities.map((amenity, idx) => (
                          <span key={idx} className="bg-white border border-stone-200 px-3 py-1 rounded-full text-xs text-stone-600 font-medium">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Reserva */}
              <div className="md:w-1/2 p-8 bg-white flex flex-col h-full overflow-y-auto">
                <div className="flex-grow">
                  <div className="mb-8 flex items-end justify-between">
                     <div>
                       <h4 className="font-serif font-bold text-2xl text-stone-800">Reserve a sua estadia</h4>
                       <p className="text-stone-500 text-sm">Selecione as datas no calendário</p>
                     </div>
                     <div className="text-right">
                       <span className="text-3xl font-bold text-brand-700 block">{selectedUnit.pricePerNight}€</span>
                       <span className="text-stone-400 text-xs">por noite</span>
                     </div>
                  </div>

                  <div className="flex justify-center mb-8">
                     <BookingCalendar onDateSelect={handleDateSelect} />
                  </div>

                  {bookingDates.start && bookingDates.end && (
                     <div className="bg-brand-50 p-6 rounded-xl border border-brand-100 mb-6 animate-fade-in">
                       <div className="flex justify-between items-center mb-4">
                         <div className="text-stone-600">
                           <span className="block text-xs font-bold uppercase tracking-wider text-stone-400">Check-in</span>
                           <span className="font-serif font-bold text-lg">{format(bookingDates.start, 'dd MMM', {locale: pt})}</span>
                         </div>
                         <div className="h-px bg-brand-200 w-12"></div>
                         <div className="text-right text-stone-600">
                           <span className="block text-xs font-bold uppercase tracking-wider text-stone-400">Check-out</span>
                           <span className="font-serif font-bold text-lg">{format(bookingDates.end, 'dd MMM', {locale: pt})}</span>
                         </div>
                       </div>
                       
                       <div className="flex justify-between items-center pt-4 border-t border-brand-200">
                         <span className="font-medium text-stone-700">Total Estadia</span>
                         <span className="text-2xl font-bold text-brand-700">
                            {(selectedUnit.pricePerNight * Math.ceil((bookingDates.end.getTime() - bookingDates.start.getTime()) / (1000 * 60 * 60 * 24))).toFixed(2)}€
                         </span>
                       </div>
                     </div>
                  )}
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <div className="text-xs text-stone-500 mb-4 text-center">
                    Ao continuar, será redirecionado para o seu Google Calendar para enviar o convite de reserva.
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 py-3 rounded-xl text-stone-600 hover:bg-stone-50 border border-transparent hover:border-stone-200 font-medium transition"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={handleGoogleCalendarBooking}
                      disabled={!bookingDates.start || !bookingDates.end}
                      className="flex-[2] py-3 rounded-xl bg-brand-700 text-white font-bold hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-brand-900/10 flex items-center justify-center gap-2"
                    >
                      <span>Continuar no Google Calendar</span>
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition p-2 bg-white/10 rounded-full"
            onClick={() => setLightboxImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={lightboxImage} 
            alt="Ecrã inteiro" 
            className="max-w-full max-h-full object-contain rounded-sm shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowAdminModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-brand-100 p-3 rounded-full text-brand-700">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-800">Área do Proprietário</h3>
                <p className="text-sm text-stone-500">Gestão de Reservas</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="flex items-center gap-2 font-bold text-blue-800 text-sm mb-2">
                  <Info size={16} /> Como Aceitar Reservas
                </h4>
                <ol className="text-sm text-blue-800/80 space-y-2 list-decimal list-inside">
                  <li>O cliente envia um pedido de reserva.</li>
                  <li>Você recebe um <strong>email</strong> ou notificação no Google Calendar.</li>
                  <li>Abra o evento no seu calendário.</li>
                  <li>Clique em <strong>"Sim" (Aceitar)</strong> no convite.</li>
                  <li>A data ficará automaticamente bloqueada no site.</li>
                </ol>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-stone-700">Acesso Rápido aos Calendários:</p>
                <a 
                  href="https://calendar.google.com/calendar/r" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200 transition group"
                >
                  <span className="flex items-center gap-2 text-stone-700 font-medium">
                    <CalendarIcon size={16} className="text-brand-600" />
                    Abrir Google Calendar
                  </span>
                  <ExternalLink size={16} className="text-stone-400 group-hover:text-stone-600" />
                </a>
              </div>
              
              <div className="text-xs text-stone-400 text-center pt-2 border-t border-stone-100">
                Dica: Verifique se as notificações de email estão ativas nas definições de cada calendário.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showConfirmation && (
        <div className="fixed top-24 right-4 z-50 bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in-left">
          <CalendarIcon className="text-blue-600" size={24} />
          <div>
            <h4 className="font-bold">A abrir o Google Calendar...</h4>
            <p className="text-sm text-blue-700">Por favor, guarde o evento para enviar o seu pedido.</p>
          </div>
        </div>
      )}

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default App;