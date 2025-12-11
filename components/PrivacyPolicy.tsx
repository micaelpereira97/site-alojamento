import React from 'react';
import { X, Shield, Database, Eye, UserCheck, Lock, Mail, FileText } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield size={28} />
              <h1 className="text-2xl font-bold">Política de Privacidade</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-2">
            Conformidade com o Regulamento Geral de Proteção de Dados (RGPD)
          </p>
          <p className="text-blue-200 text-sm">Última atualização: 11 de dezembro de 2025</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 text-stone-700">

          {/* Introdução */}
          <section>
            <p className="text-lg leading-relaxed">
              O <strong>Douro Valley Apartments</strong> compromete-se a proteger a privacidade e os dados pessoais dos
              seus utilizadores, em conformidade com o <strong>Regulamento (UE) 2016/679 (RGPD)</strong> e a legislação
              portuguesa aplicável.
            </p>
            <p className="mt-3">
              Esta Política de Privacidade explica como recolhemos, utilizamos, armazenamos e protegemos os seus dados pessoais.
            </p>
          </section>

          {/* 1. Responsável pelo Tratamento */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <UserCheck className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">1. Responsável pelo Tratamento de Dados</h2>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <p><strong>Entidade:</strong> Douro Valley Apartments - Alojamento Local</p>
              <p><strong>Localização:</strong> Vale do Douro, Portugal</p>
              <p><strong>Email:</strong> info@dourovalleyapartments.pt</p>
              <p><strong>Telefone:</strong> +351 XXX XXX XXX</p>
            </div>
            <p className="mt-3 text-sm text-stone-600">
              Para questões relacionadas com a proteção de dados, contacte-nos através dos meios acima indicados.
            </p>
          </section>

          {/* 2. Dados Recolhidos */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Database className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">2. Dados Pessoais Recolhidos</h2>
            </div>

            <h3 className="font-semibold text-stone-800 mt-4">2.1. Dados Fornecidos pelo Utilizador</h3>
            <p className="mb-2">Ao efetuar uma reserva, recolhemos os seguintes dados:</p>
            <div className="bg-stone-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Nome completo</strong></li>
                <li><strong>Endereço de email</strong></li>
                <li><strong>Número de telefone</strong></li>
                <li><strong>Datas de reserva</strong> (check-in e check-out)</li>
                <li><strong>Unidade de alojamento</strong> selecionada</li>
                <li><strong>Observações ou pedidos especiais</strong> (opcional)</li>
              </ul>
            </div>

            <h3 className="font-semibold text-stone-800 mt-4">2.2. Dados Recolhidos Automaticamente</h3>
            <div className="bg-stone-50 p-4 rounded-lg mt-2">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Endereço IP</strong></li>
                <li><strong>Tipo de navegador</strong> e dispositivo</li>
                <li><strong>Páginas visitadas</strong> no website</li>
                <li><strong>Data e hora de acesso</strong></li>
                <li><strong>Cookies</strong> (ver Política de Cookies)</li>
              </ul>
            </div>

            <h3 className="font-semibold text-stone-800 mt-4">2.3. Dados NÃO Recolhidos</h3>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-2">
              <p className="text-green-900">
                <strong>O nosso website NÃO recolhe nem processa dados de pagamento.</strong> Não armazenamos informações
                de cartões de crédito, débito ou outras formas de pagamento eletrónico.
              </p>
            </div>
          </section>

          {/* 3. Finalidade do Tratamento */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">3. Finalidade do Tratamento de Dados</h2>
            </div>
            <p className="mb-3">Os seus dados pessoais são utilizados para:</p>

            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-800">✓ Processamento de Reservas</p>
                <p className="text-sm text-blue-900 mt-1">
                  Confirmar e gerir a sua reserva, incluindo envio de confirmações e lembretes.
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-800">✓ Comunicação</p>
                <p className="text-sm text-blue-900 mt-1">
                  Contactá-lo relativamente à sua reserva, alterações, ou informações importantes.
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-800">✓ Cumprimento de Obrigações Legais</p>
                <p className="text-sm text-blue-900 mt-1">
                  Cumprir requisitos legais aplicáveis ao alojamento local (ex: registo de hóspedes).
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-blue-800">✓ Melhorias do Serviço</p>
                <p className="text-sm text-blue-900 mt-1">
                  Análise estatística (anónima) para melhorar a experiência do utilizador.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
              <p className="font-semibold text-yellow-800">Marketing (Apenas com Consentimento)</p>
              <p className="text-sm text-yellow-900 mt-1">
                Envio de newsletters ou ofertas especiais <strong>apenas se der o seu consentimento explícito</strong>.
                Pode retirar o consentimento a qualquer momento.
              </p>
            </div>
          </section>

          {/* 4. Base Legal */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">4. Base Legal para o Tratamento</h2>
            </div>
            <p className="mb-3">O tratamento dos seus dados pessoais baseia-se em:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Execução de contrato:</strong> Necessário para processar e cumprir a sua reserva.
              </li>
              <li>
                <strong>Obrigação legal:</strong> Cumprimento de requisitos legais (ex: registo de hóspedes).
              </li>
              <li>
                <strong>Consentimento:</strong> Para marketing ou outras finalidades onde o consentimento é solicitado.
              </li>
              <li>
                <strong>Interesse legítimo:</strong> Melhorias do serviço e segurança do website.
              </li>
            </ul>
          </section>

          {/* 5. Partilha de Dados */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">5. Partilha de Dados com Terceiros</h2>
            <p className="mb-3">
              Os seus dados pessoais <strong>não são vendidos nem alugados</strong> a terceiros. Podem ser partilhados apenas nas seguintes situações:
            </p>

            <div className="space-y-2">
              <div className="bg-stone-50 p-3 rounded-lg">
                <p className="font-semibold">Google Calendar</p>
                <p className="text-sm text-stone-600 mt-1">
                  Para processar reservas através do Google Calendar (nome, email, datas).
                </p>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg">
                <p className="font-semibold">Autoridades Competentes</p>
                <p className="text-sm text-stone-600 mt-1">
                  Quando exigido por lei (ex: Turismo de Portugal, autoridades fiscais).
                </p>
              </div>

              <div className="bg-stone-50 p-3 rounded-lg">
                <p className="font-semibold">Fornecedores de Serviços</p>
                <p className="text-sm text-stone-600 mt-1">
                  Prestadores de serviços técnicos (hosting, email) sob acordos de confidencialidade.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Segurança */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">6. Segurança dos Dados</h2>
            </div>
            <p className="mb-3">
              Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados contra:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Acesso não autorizado</li>
              <li>Perda, destruição ou alteração acidental</li>
              <li>Divulgação ou utilização ilícita</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg mt-3">
              <p className="text-sm text-blue-900">
                <strong>Medidas implementadas:</strong> Encriptação SSL/TLS, firewalls, controlo de acessos, backups regulares.
              </p>
            </div>
          </section>

          {/* 7. Retenção de Dados */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">7. Período de Retenção de Dados</h2>
            <p className="mb-3">Os seus dados pessoais são conservados durante:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Reservas confirmadas:</strong> 5 anos após a estadia (cumprimento de obrigações legais e fiscais).
              </li>
              <li>
                <strong>Reservas canceladas:</strong> 1 ano após o cancelamento.
              </li>
              <li>
                <strong>Marketing:</strong> Até retirar o consentimento ou solicitar eliminação.
              </li>
            </ul>
            <p className="mt-3 text-sm text-stone-600">
              Após estes períodos, os dados são eliminados ou anonimizados de forma segura.
            </p>
          </section>

          {/* 8. Direitos do Titular */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">8. Direitos do Titular dos Dados (RGPD)</h2>
            <p className="mb-3">De acordo com o RGPD, tem os seguintes direitos:</p>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-semibold text-green-800">✓ Direito de Acesso</p>
                <p className="text-sm text-green-900">Saber que dados temos sobre si.</p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-semibold text-green-800">✓ Direito de Retificação</p>
                <p className="text-sm text-green-900">Corrigir dados incorretos ou incompletos.</p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-semibold text-green-800">✓ Direito ao Apagamento</p>
                <p className="text-sm text-green-900">Eliminar os seus dados ("direito a ser esquecido").</p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-semibold text-green-800">✓ Direito à Portabilidade</p>
                <p className="text-sm text-green-900">Receber os seus dados em formato legível.</p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-semibold text-green-800">✓ Direito de Oposição</p>
                <p className="text-sm text-green-900">Opor-se ao tratamento de dados (ex: marketing).</p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="font-semibold text-green-800">✓ Direito de Limitação</p>
                <p className="text-sm text-green-900">Restringir o tratamento em certas situações.</p>
              </div>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg mt-4">
              <p className="font-semibold text-blue-800">Como Exercer os Seus Direitos</p>
              <p className="text-sm text-blue-900 mt-2">
                Para exercer qualquer destes direitos, envie um email para:
                <strong> info@recantodanatureza.pt</strong>
              </p>
              <p className="text-sm text-blue-900 mt-1">
                Responderemos ao seu pedido no prazo de <strong>1 mês</strong>.
              </p>
            </div>
          </section>

          {/* 9. Cookies */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">9. Cookies e Tecnologias Semelhantes</h2>
            <p>
              O nosso website utiliza cookies para melhorar a experiência do utilizador. Para mais informações,
              consulte a nossa <strong>Política de Cookies</strong>.
            </p>
          </section>

          {/* 10. Menores */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">10. Dados de Menores</h2>
            <p>
              O nosso website não é direcionado a menores de 18 anos. Não recolhemos intencionalmente dados de menores.
              Se for responsável por um menor que forneceu dados pessoais, contacte-nos para procedermos à sua eliminação.
            </p>
          </section>

          {/* 11. Transferências Internacionais */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">11. Transferências Internacionais de Dados</h2>
            <p>
              Alguns dos nossos prestadores de serviços (ex: Google) podem estar localizados fora da União Europeia.
              Garantimos que essas transferências cumprem os requisitos do RGPD, através de:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Cláusulas contratuais-tipo aprovadas pela Comissão Europeia</li>
              <li>Certificações de adequação (ex: Privacy Shield)</li>
            </ul>
          </section>

          {/* 12. Alterações */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">12. Alterações à Política de Privacidade</h2>
            <p>
              Reservamo-nos o direito de atualizar esta Política de Privacidade. Qualquer alteração será publicada
              nesta página com a data de atualização. Recomendamos que consulte periodicamente esta política.
            </p>
          </section>

          {/* 13. Reclamações */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">13. Apresentação de Reclamações</h2>
            <p className="mb-3">
              Se considerar que os seus direitos de proteção de dados foram violados, pode apresentar reclamação à
              autoridade de controlo competente:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-blue-800">CNPD - Comissão Nacional de Proteção de Dados</p>
              <p className="text-sm text-blue-900 mt-2">
                <strong>Website:</strong> <a href="https://www.cnpd.pt/" target="_blank" rel="noopener noreferrer" className="underline">www.cnpd.pt</a><br />
                <strong>Email:</strong> geral@cnpd.pt<br />
                <strong>Morada:</strong> Av. D. Carlos I, 134 - 1º, 1200-651 Lisboa
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">14. Contacto</h2>
            </div>
            <p className="mb-3">
              Para questões sobre esta Política de Privacidade ou para exercer os seus direitos:
            </p>
            <div className="bg-brand-50 p-4 rounded-lg space-y-1">
              <p><strong>Email:</strong> info@recantodanatureza.pt</p>
              <p><strong>Telefone:</strong> +351 XXX XXX XXX</p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-6 rounded-b-2xl text-center">
          <p className="text-stone-600 text-sm">
            Ao utilizar o nosso website, concorda com esta Política de Privacidade.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
