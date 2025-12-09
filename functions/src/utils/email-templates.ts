import * as fs from 'fs';
import * as path from 'path';

export interface BookingEmailData {
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  unitName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalPrice: number;
  confirmationCode: string;
  status: 'pending' | 'confirmed';
  notes?: string;
  websiteUrl?: string;
}

/**
 * Simple template engine - replaces {{variable}} with actual values
 */
function renderTemplate(template: string, data: Record<string, any>): string {
  let result = template;

  // Replace simple variables
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (value !== undefined && value !== null) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, String(value));
    }
  });

  // Handle conditional blocks {{#if variable}}...{{/if}}
  result = result.replace(/{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g, (match, variable, content) => {
    return data[variable] ? content : '';
  });

  // Clean up any remaining unprocessed variables
  result = result.replace(/{{[^}]+}}/g, '');

  return result;
}

/**
 * Load HTML template from file
 */
function loadTemplate(templateName: string): string {
  const templatePath = path.join(__dirname, '../templates', templateName);
  try {
    return fs.readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error(`Failed to load template: ${templateName}`, error);
    throw new Error(`Email template not found: ${templateName}`);
  }
}

/**
 * Generate guest confirmation email HTML
 */
export function generateGuestConfirmationEmail(data: BookingEmailData): string {
  const template = loadTemplate('email-confirmation.html');

  const statusClass = data.status === 'confirmed' ? 'status-confirmed' : 'status-pending';
  const statusText = data.status === 'confirmed' ? 'Confirmada' : 'Pendente';

  const templateData = {
    ...data,
    statusClass,
    status: statusText,
    websiteUrl: data.websiteUrl || 'http://localhost:3000',
  };

  return renderTemplate(template, templateData);
}

/**
 * Generate owner notification email HTML
 */
export function generateOwnerNotificationEmail(data: BookingEmailData): string {
  const template = loadTemplate('email-owner-notification.html');

  const now = new Date();
  const sentDate = now.toLocaleString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const templateData = {
    ...data,
    sentDate,
  };

  return renderTemplate(template, templateData);
}

/**
 * Generate plain text version of confirmation email (fallback)
 */
export function generateGuestConfirmationText(data: BookingEmailData): string {
  return `
Olá ${data.guestName},

Obrigado por escolher o Recanto da Natureza!

DETALHES DA RESERVA
-------------------
Código: ${data.confirmationCode}
Unidade: ${data.unitName}
Check-in: ${data.checkIn} às 15:00
Check-out: ${data.checkOut} até às 11:00
Noites: ${data.nights}
Hóspedes: ${data.guests}
Total: ${data.totalPrice}€

STATUS: ${data.status === 'confirmed' ? 'CONFIRMADA' : 'AGUARDANDO CONFIRMAÇÃO'}

${data.status === 'pending' ? `
O seu pedido foi submetido com sucesso. O proprietário irá rever e confirmar em breve (normalmente em 24 horas).
` : ''}

POLÍTICA DE CANCELAMENTO
-------------------------
- Até 30 dias antes: Reembolso total
- 15-29 dias antes: Reembolso de 50%
- Menos de 15 dias: Sem reembolso

Para qualquer questão, contacte-nos:
Email: ola@recantodanatureza.pt
Telefone: +351 912 345 678

Atenciosamente,
Equipa Recanto da Natureza
  `.trim();
}

/**
 * Generate plain text version of owner notification (fallback)
 */
export function generateOwnerNotificationText(data: BookingEmailData): string {
  return `
NOVA RESERVA RECEBIDA
====================

Código: ${data.confirmationCode}
Unidade: ${data.unitName}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}
Noites: ${data.nights}
Hóspedes: ${data.guests}
Total: ${data.totalPrice}€

HÓSPEDE
-------
Nome: ${data.guestName}
Email: ${data.guestEmail}
Telefone: ${data.guestPhone || 'Não fornecido'}

${data.notes ? `NOTAS: ${data.notes}` : ''}

PRÓXIMAS AÇÕES
--------------
1. Abrir Google Calendar
2. Encontrar o evento para ${data.unitName}
3. Aceitar o convite para confirmar
4. Contactar o hóspede para combinar pagamento

Email: ${data.guestEmail}
Telefone: ${data.guestPhone || 'N/A'}

---
Enviado automaticamente pelo sistema de reservas
  `.trim();
}
