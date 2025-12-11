import React from 'react';
import { X, Cookie, Info, Settings, BarChart, Shield } from 'lucide-react';

interface CookiePolicyProps {
  onClose: () => void;
}

export const CookiePolicy: React.FC<CookiePolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Cookie size={28} />
              <h1 className="text-2xl font-bold">Política de Cookies</h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-amber-200 text-sm mt-2">Última atualização: 11 de dezembro de 2025</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 text-stone-700">

          {/* Introdução */}
          <section>
            <p className="text-lg leading-relaxed">
              Esta Política de Cookies explica o que são cookies, como os utilizamos no website do
              <strong> Douro Valley Apartments</strong>, e como pode gerir as suas preferências.
            </p>
          </section>

          {/* 1. O que são Cookies */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="text-amber-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">1. O Que São Cookies?</h2>
            </div>
            <p className="mb-3">
              Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo (computador, smartphone, tablet)
              quando visita um website. São amplamente utilizados para fazer os websites funcionarem de forma mais eficiente
              e fornecer informações aos proprietários do site.
            </p>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-900">
                <strong>Importante:</strong> Os cookies NÃO contêm vírus ou malware e NÃO podem aceder a informações do seu
                dispositivo além das que você voluntariamente fornece.
              </p>
            </div>
          </section>

          {/* 2. Tipos de Cookies */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">2. Tipos de Cookies Que Utilizamos</h2>

            <div className="space-y-4">
              {/* Essenciais */}
              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="text-green-700" size={20} />
                  <h3 className="font-semibold text-green-800">Cookies Estritamente Necessários</h3>
                </div>
                <p className="text-sm text-green-900 mb-2">
                  Estes cookies são essenciais para o funcionamento do website e não podem ser desativados.
                </p>
                <div className="bg-white p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-stone-800">Exemplos:</p>
                  <ul className="text-sm text-stone-600 list-disc list-inside mt-1">
                    <li>Cookies de sessão para manter o login do admin</li>
                    <li>Cookies de segurança para prevenir ataques</li>
                    <li>Cookies de preferências de idioma</li>
                  </ul>
                </div>
                <p className="text-xs text-green-800 mt-2">
                  <strong>Base Legal:</strong> Interesse legítimo (funcionamento do website)
                </p>
              </div>

              {/* Funcionais */}
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="text-blue-700" size={20} />
                  <h3 className="font-semibold text-blue-800">Cookies de Funcionalidade</h3>
                </div>
                <p className="text-sm text-blue-900 mb-2">
                  Permitem que o website se lembre das suas escolhas e forneça funcionalidades melhoradas.
                </p>
                <div className="bg-white p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-stone-800">Exemplos:</p>
                  <ul className="text-sm text-stone-600 list-disc list-inside mt-1">
                    <li>Lembrar preferências de calendário</li>
                    <li>Guardar unidades favoritas</li>
                    <li>Preferências de visualização</li>
                  </ul>
                </div>
                <p className="text-xs text-blue-800 mt-2">
                  <strong>Base Legal:</strong> Consentimento (pode desativar)
                </p>
              </div>

              {/* Analytics */}
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart className="text-purple-700" size={20} />
                  <h3 className="font-semibold text-purple-800">Cookies de Análise/Desempenho</h3>
                </div>
                <p className="text-sm text-purple-900 mb-2">
                  Ajudam-nos a entender como os visitantes interagem com o website, recolhendo informações de forma anónima.
                </p>
                <div className="bg-white p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-stone-800">Exemplos:</p>
                  <ul className="text-sm text-stone-600 list-disc list-inside mt-1">
                    <li>Google Analytics (se implementado)</li>
                    <li>Número de visitantes</li>
                    <li>Páginas mais visitadas</li>
                    <li>Tempo de permanência</li>
                  </ul>
                </div>
                <p className="text-xs text-purple-800 mt-2">
                  <strong>Base Legal:</strong> Consentimento (pode desativar)
                </p>
              </div>
            </div>
          </section>

          {/* 3. Cookies de Terceiros */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">3. Cookies de Terceiros</h2>
            <p className="mb-3">
              O nosso website pode utilizar serviços de terceiros que colocam os seus próprios cookies:
            </p>

            <div className="space-y-3">
              <div className="bg-stone-50 p-4 rounded-lg">
                <p className="font-semibold text-stone-800">Google Calendar</p>
                <p className="text-sm text-stone-600 mt-1">
                  Para processar reservas. Cookies geridos pela Google.
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline text-sm"
                >
                  Ver Política de Privacidade da Google →
                </a>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg">
                <p className="font-semibold text-stone-800">Google Maps</p>
                <p className="text-sm text-stone-600 mt-1">
                  Para mostrar a localização do alojamento. Cookies geridos pela Google.
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline text-sm"
                >
                  Ver Política de Privacidade da Google →
                </a>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg">
                <p className="font-semibold text-stone-800">Firebase/Firestore</p>
                <p className="text-sm text-stone-600 mt-1">
                  Para armazenar dados de unidades e reservas. Cookies geridos pela Google.
                </p>
                <a
                  href="https://firebase.google.com/support/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline text-sm"
                >
                  Ver Política de Privacidade do Firebase →
                </a>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
              <p className="text-sm text-yellow-900">
                <strong>Nota:</strong> Não temos controlo sobre cookies colocados por terceiros. Recomendamos que consulte
                as políticas de privacidade dessas entidades.
              </p>
            </div>
          </section>

          {/* 4. Duração dos Cookies */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">4. Duração dos Cookies</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold text-blue-800">Cookies de Sessão</p>
                <p className="text-sm text-blue-900 mt-2">
                  Temporários, eliminados quando fecha o navegador.
                </p>
                <p className="text-xs text-blue-700 mt-2">Exemplo: Manter login do admin durante a sessão</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="font-semibold text-green-800">Cookies Persistentes</p>
                <p className="text-sm text-green-900 mt-2">
                  Permanecem no dispositivo por um período definido.
                </p>
                <p className="text-xs text-green-700 mt-2">Exemplo: Lembrar preferências por 30 dias</p>
              </div>
            </div>
          </section>

          {/* 5. Gerir Cookies */}
          <section className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="text-amber-600" size={24} />
              <h2 className="text-xl font-bold text-stone-800">5. Como Gerir e Desativar Cookies</h2>
            </div>

            <p className="mb-3">
              Pode controlar e/ou eliminar cookies conforme desejar. Tem as seguintes opções:
            </p>

            <div className="space-y-3">
              <div className="bg-stone-50 p-4 rounded-lg">
                <p className="font-semibold text-stone-800">1. Configurações do Navegador</p>
                <p className="text-sm text-stone-600 mt-2 mb-2">
                  A maioria dos navegadores permite gerir cookies através das configurações:
                </p>
                <ul className="text-sm text-stone-600 space-y-1 ml-4">
                  <li>
                    <strong>Google Chrome:</strong>{' '}
                    <span className="text-xs">Definições → Privacidade e segurança → Cookies</span>
                  </li>
                  <li>
                    <strong>Firefox:</strong>{' '}
                    <span className="text-xs">Opções → Privacidade e Segurança → Cookies</span>
                  </li>
                  <li>
                    <strong>Safari:</strong>{' '}
                    <span className="text-xs">Preferências → Privacidade → Cookies</span>
                  </li>
                  <li>
                    <strong>Edge:</strong>{' '}
                    <span className="text-xs">Definições → Cookies e permissões</span>
                  </li>
                </ul>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg">
                <p className="font-semibold text-stone-800">2. Ferramentas de Opt-Out</p>
                <p className="text-sm text-stone-600 mt-2">
                  Pode desativar cookies de análise específicos:
                </p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:underline"
                    >
                      Google Analytics Opt-out →
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg">
                <p className="font-semibold text-stone-800">3. Modo de Navegação Privada</p>
                <p className="text-sm text-stone-600 mt-2">
                  Use o modo de navegação privada/incógnito para evitar que cookies sejam armazenados.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
              <p className="font-semibold text-red-800">⚠️ Atenção</p>
              <p className="text-sm text-red-900 mt-1">
                Desativar cookies pode afetar a funcionalidade do website. Algumas funcionalidades podem não funcionar
                corretamente sem cookies essenciais.
              </p>
            </div>
          </section>

          {/* 6. Cookies Atuais */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">6. Lista de Cookies Utilizados</h2>
            <p className="text-sm text-stone-600 mb-3">
              Atualmente, o website do Douro Valley Apartments utiliza os seguintes cookies:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-stone-200">
                <thead className="bg-stone-100">
                  <tr>
                    <th className="border border-stone-200 p-2 text-left">Nome</th>
                    <th className="border border-stone-200 p-2 text-left">Tipo</th>
                    <th className="border border-stone-200 p-2 text-left">Finalidade</th>
                    <th className="border border-stone-200 p-2 text-left">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-stone-200 p-2 font-mono text-xs">session_id</td>
                    <td className="border border-stone-200 p-2">Essencial</td>
                    <td className="border border-stone-200 p-2">Manter sessão de login</td>
                    <td className="border border-stone-200 p-2">Sessão</td>
                  </tr>
                  <tr className="bg-stone-50">
                    <td className="border border-stone-200 p-2 font-mono text-xs">firebase_*</td>
                    <td className="border border-stone-200 p-2">Essencial</td>
                    <td className="border border-stone-200 p-2">Autenticação Firebase</td>
                    <td className="border border-stone-200 p-2">1 ano</td>
                  </tr>
                  <tr>
                    <td className="border border-stone-200 p-2 font-mono text-xs">_ga</td>
                    <td className="border border-stone-200 p-2">Análise</td>
                    <td className="border border-stone-200 p-2">Google Analytics</td>
                    <td className="border border-stone-200 p-2">2 anos</td>
                  </tr>
                  <tr className="bg-stone-50">
                    <td className="border border-stone-200 p-2 font-mono text-xs">_gid</td>
                    <td className="border border-stone-200 p-2">Análise</td>
                    <td className="border border-stone-200 p-2">Google Analytics</td>
                    <td className="border border-stone-200 p-2">24 horas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-stone-500 mt-2">
              * Esta lista pode ser atualizada. Consulte periodicamente esta política.
            </p>
          </section>

          {/* 7. Atualizações */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">7. Atualizações desta Política</h2>
            <p>
              Podemos atualizar esta Política de Cookies periodicamente para refletir alterações nas nossas práticas
              ou por outros motivos operacionais, legais ou regulamentares. Recomendamos que consulte esta página regularmente.
            </p>
          </section>

          {/* Contacto */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-bold text-stone-800 mb-3">8. Contacto</h2>
            <p className="mb-3">
              Se tiver questões sobre esta Política de Cookies, contacte-nos:
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
            Ao continuar a navegar no nosso website, consente a utilização de cookies.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
