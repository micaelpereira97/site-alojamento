import React from 'react';
import { X, FileText, Calendar, Home, AlertCircle, Mail } from 'lucide-react';

interface TermsAndConditionsProps {
  onClose: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-stone-700 to-stone-900 text-white p-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FileText size={28} />
              <h1 className="text-2xl font-bold">Termos e Condições</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-stone-200 text-sm mt-2">Última atualização: 11 de dezembro de 2025</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 text-stone-700">

          {/* Introdução */}
          <section>
            <p className="text-lg leading-relaxed">
              Bem-vindo ao <strong>Douro Valley Apartments</strong>. Ao utilizar o nosso website e efetuar uma reserva,
              concorda com os seguintes termos e condições. Por favor, leia-os atentamente.
            </p>
          </section>

          {/* 1. Identificação */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Home className="text-brand-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">1. Identificação do Estabelecimento</h2>
            </div>
            <div className="bg-stone-50 p-4 rounded-lg space-y-2">
              <p><strong>Nome:</strong> Douro Valley Apartments - Alojamento Local</p>
              <p><strong>Localização:</strong> Vale do Douro, Portugal</p>
              <p><strong>Email:</strong> info@dourovalleyapartments.pt</p>
              <p><strong>Telefone:</strong> +351 XXX XXX XXX</p>
              <p className="text-sm text-stone-600 mt-3">
                <em>Alojamento Local registado nos termos do Decreto-Lei n.º 128/2014, de 29 de agosto.</em>
              </p>
            </div>
          </section>

          {/* 2. Reservas */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="text-brand-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">2. Reservas e Confirmação</h2>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-stone-800">2.1. Processo de Reserva</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>As reservas são efetuadas através do nosso website, utilizando o Google Calendar.</li>
                <li>Ao submeter uma reserva, o hóspede receberá um <strong>convite de calendário</strong> por email.</li>
                <li>A reserva apenas está <strong>confirmada</strong> quando o proprietário aceitar o convite.</li>
                <li>O hóspede receberá um email de confirmação com os detalhes da reserva.</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mt-4">2.2. Disponibilidade</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>As datas apresentadas no calendário refletem a disponibilidade em tempo real.</li>
                <li>O Douro Valley Apartments reserva-se o direito de recusar qualquer reserva.</li>
                <li>Em caso de indisponibilidade imprevista, o hóspede será notificado de imediato.</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mt-4">2.3. Dados Pessoais</h3>
              <p className="ml-4">
                Os dados fornecidos (nome, email, telefone) são utilizados exclusivamente para processar a reserva
                e comunicar com o hóspede. Ver <strong>Política de Privacidade</strong> para mais detalhes.
              </p>
            </div>
          </section>

          {/* 3. Pagamento */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="text-brand-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">3. Pagamento</h2>
            </div>
            <div className="space-y-3">
              <p>
                <strong>O nosso website não processa pagamentos online.</strong> Todas as condições de pagamento
                (valor, método, depósito, etc.) serão acordadas diretamente com o proprietário após a confirmação
                da reserva.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>O pagamento pode ser efetuado por transferência bancária, MBWay ou à chegada (a confirmar).</li>
                <li>Pode ser solicitado um depósito de caução para garantir a reserva.</li>
                <li>O valor final poderá incluir taxas de limpeza ou outros serviços adicionais acordados.</li>
              </ul>
            </div>
          </section>

          {/* 4. Cancelamentos */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">4. Política de Cancelamento</h2>
            <div className="space-y-3">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-semibold text-yellow-800">Cancelamento pelo Hóspede:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2 text-yellow-900">
                  <li><strong>Mais de 14 dias antes:</strong> Reembolso total (se pagamento já efetuado).</li>
                  <li><strong>Entre 7 e 14 dias antes:</strong> Reembolso de 50%.</li>
                  <li><strong>Menos de 7 dias antes:</strong> Sem reembolso.</li>
                </ul>
              </div>

              <p className="text-sm text-stone-600">
                <strong>Nota:</strong> Para cancelar uma reserva, contacte-nos por email ou telefone o mais brevemente possível.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                <p className="font-semibold text-blue-800">Cancelamento pelo Estabelecimento:</p>
                <p className="mt-2 text-blue-900">
                  Em caso de cancelamento por motivos de força maior (ex: manutenção urgente, condições meteorológicas
                  extremas), será oferecida a possibilidade de reagendar ou reembolso total.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Check-in e Check-out */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">5. Check-in e Check-out</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-semibold text-green-800">Check-in:</p>
                <p className="text-green-900 mt-1">A partir das <strong>15:00</strong></p>
                <p className="text-sm text-green-700 mt-2">
                  Por favor, informe a hora prevista de chegada.
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="font-semibold text-red-800">Check-out:</p>
                <p className="text-red-900 mt-1">Até às <strong>11:00</strong></p>
                <p className="text-sm text-red-700 mt-2">
                  Check-out tardio mediante disponibilidade.
                </p>
              </div>
            </div>
            <p className="mt-4 text-stone-600">
              As instruções de acesso serão enviadas por email antes da chegada.
            </p>
          </section>

          {/* 6. Regras da Casa */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">6. Regras da Casa</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Não é permitido fumar</strong> no interior das unidades.</li>
              <li><strong>Animais de estimação:</strong> Contactar previamente para autorização.</li>
              <li><strong>Festas e eventos:</strong> Não são permitidos sem autorização prévia.</li>
              <li><strong>Número máximo de hóspedes:</strong> Conforme capacidade indicada para cada unidade.</li>
              <li><strong>Respeito pela natureza:</strong> Pedimos que preserve o ambiente natural envolvente.</li>
              <li><strong>Silêncio:</strong> Respeite o sossego de outros hóspedes, especialmente entre 23h-8h.</li>
            </ul>
          </section>

          {/* 7. Responsabilidades */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">7. Responsabilidades</h2>
            <div className="space-y-3">
              <h3 className="font-semibold text-stone-800">7.1. Responsabilidade do Hóspede</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Utilizar as instalações de forma adequada e responsável.</li>
                <li>Comunicar imediatamente qualquer dano ou avaria.</li>
                <li>Responsabilizar-se por danos causados às instalações, equipamentos ou terceiros.</li>
                <li>Seguir as regras de segurança e instruções fornecidas.</li>
              </ul>

              <h3 className="font-semibold text-stone-800 mt-4">7.3. Responsabilidade do Estabelecimento</h3>
              <p className="ml-4">
                O Douro Valley Apartments não se responsabiliza por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-8">
                <li>Perda ou dano de objetos pessoais dos hóspedes.</li>
                <li>Interrupções de serviços (água, eletricidade, internet) causadas por fatores externos.</li>
                <li>Condições meteorológicas adversas que possam afetar a estadia.</li>
              </ul>
            </div>
          </section>

          {/* 8. Alterações */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">8. Alterações aos Termos</h2>
            <p>
              O Douro Valley Apartments reserva-se o direito de alterar estes Termos e Condições a qualquer momento.
              As alterações entrarão em vigor imediatamente após publicação no website. A utilização continuada do
              website após as alterações constitui aceitação dos novos termos.
            </p>
          </section>

          {/* 9. Lei Aplicável */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">9. Lei Aplicável e Resolução de Conflitos</h2>
            <p>
              Estes Termos e Condições são regidos pela legislação portuguesa. Qualquer litígio será resolvido nos
              tribunais competentes de Portugal. Em caso de reclamação, o hóspede pode utilizar:
            </p>
            <div className="bg-stone-50 p-4 rounded-lg mt-3">
              <p className="font-semibold">Livro de Reclamações Eletrónico</p>
              <a
                href="https://www.livroreclamacoes.pt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:text-brand-700 underline"
              >
                www.livroreclamacoes.pt
              </a>
            </div>
          </section>

          {/* Contacto */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="text-brand-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">10. Contacto</h2>
            </div>
            <p>
              Para questões ou esclarecimentos sobre estes Termos e Condições, contacte-nos:
            </p>
            <div className="bg-brand-50 p-4 rounded-lg mt-3 space-y-1">
              <p><strong>Email:</strong> info@recantodanatureza.pt</p>
              <p><strong>Telefone:</strong> +351 XXX XXX XXX</p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-6 rounded-b-2xl text-center">
          <p className="text-stone-600 text-sm">
            Ao efetuar uma reserva, declara ter lido e aceite estes Termos e Condições.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
