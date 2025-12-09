// Script para popular Firebase Emulator com dados de teste
// Execute com: node scripts/seed-emulator.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, connectFirestoreEmulator, Timestamp } = require('firebase/firestore');

// Configuração demo para emulators
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Conectar ao Firestore Emulator
connectFirestoreEmulator(db, 'localhost', 8080);

console.log('🔧 Conectando ao Firestore Emulator...');

// Dados de teste - Reservas
const mockBookings = [
  {
    confirmationCode: 'RN2025ABC123',
    unitId: 'casa-da-serra',
    unitName: 'Casa da Serra',
    guestName: 'João Silva',
    guestEmail: 'joao.silva@example.com',
    guestPhone: '+351 912 345 678',
    checkIn: Timestamp.fromDate(new Date('2025-12-20')),
    checkOut: Timestamp.fromDate(new Date('2025-12-25')),
    nights: 5,
    totalPrice: 600,
    status: 'pending',
    notes: 'Chegada prevista às 16h. Gostaria de informações sobre trilhos na região.',
    createdAt: Timestamp.fromDate(new Date('2025-12-09T10:30:00')),
    googleCalendarEventId: 'mock-event-1'
  },
  {
    confirmationCode: 'RN2025DEF456',
    unitId: 'loft-do-rio',
    unitName: 'Loft do Rio',
    guestName: 'Maria Santos',
    guestEmail: 'maria.santos@example.com',
    guestPhone: '+351 923 456 789',
    checkIn: Timestamp.fromDate(new Date('2025-12-15')),
    checkOut: Timestamp.fromDate(new Date('2025-12-18')),
    nights: 3,
    totalPrice: 285,
    status: 'confirmed',
    notes: '',
    createdAt: Timestamp.fromDate(new Date('2025-12-08T14:20:00')),
    googleCalendarEventId: 'mock-event-2'
  },
  {
    confirmationCode: 'RN2025GHI789',
    unitId: 'cabana-da-floresta',
    unitName: 'Cabana da Floresta',
    guestName: 'Pedro Costa',
    guestEmail: 'pedro.costa@example.com',
    guestPhone: '+351 934 567 890',
    checkIn: Timestamp.fromDate(new Date('2025-12-30')),
    checkOut: Timestamp.fromDate(new Date('2026-01-02')),
    nights: 3,
    totalPrice: 240,
    status: 'pending',
    notes: 'Reserva para fim de ano. Interessado no serviço de pequeno-almoço.',
    createdAt: Timestamp.fromDate(new Date('2025-12-09T09:15:00')),
    googleCalendarEventId: 'mock-event-3'
  },
  {
    confirmationCode: 'RN2025JKL012',
    unitId: 'casa-da-serra',
    unitName: 'Casa da Serra',
    guestName: 'Ana Rodrigues',
    guestEmail: 'ana.rodrigues@example.com',
    guestPhone: '+351 915 678 901',
    checkIn: Timestamp.fromDate(new Date('2025-12-12')),
    checkOut: Timestamp.fromDate(new Date('2025-12-14')),
    nights: 2,
    totalPrice: 200,
    status: 'confirmed',
    notes: 'Fim de semana romântico. Interessada no serviço de massagens.',
    createdAt: Timestamp.fromDate(new Date('2025-12-07T16:45:00')),
    googleCalendarEventId: 'mock-event-4'
  },
  {
    confirmationCode: 'RN2025MNO345',
    unitId: 'loft-do-rio',
    unitName: 'Loft do Rio',
    guestName: 'Carlos Mendes',
    guestEmail: 'carlos.mendes@example.com',
    guestPhone: '+351 926 789 012',
    checkIn: Timestamp.fromDate(new Date('2026-01-05')),
    checkOut: Timestamp.fromDate(new Date('2026-01-08')),
    nights: 3,
    totalPrice: 285,
    status: 'pending',
    notes: '',
    createdAt: Timestamp.fromDate(new Date('2025-12-09T11:20:00')),
    googleCalendarEventId: 'mock-event-5'
  },
  {
    confirmationCode: 'RN2025PQR678',
    unitId: 'cabana-da-floresta',
    unitName: 'Cabana da Floresta',
    guestName: 'Sofia Almeida',
    guestEmail: 'sofia.almeida@example.com',
    guestPhone: '+351 937 890 123',
    checkIn: Timestamp.fromDate(new Date('2025-11-20')),
    checkOut: Timestamp.fromDate(new Date('2025-11-23')),
    nights: 3,
    totalPrice: 240,
    status: 'completed',
    notes: 'Estadia concluída. Excelente experiência!',
    createdAt: Timestamp.fromDate(new Date('2025-11-10T09:30:00')),
    googleCalendarEventId: 'mock-event-6'
  },
  {
    confirmationCode: 'RN2025STU901',
    unitId: 'casa-da-serra',
    unitName: 'Casa da Serra',
    guestName: 'Miguel Ferreira',
    guestEmail: 'miguel.ferreira@example.com',
    guestPhone: '+351 918 901 234',
    checkIn: Timestamp.fromDate(new Date('2025-12-05')),
    checkOut: Timestamp.fromDate(new Date('2025-12-07')),
    nights: 2,
    totalPrice: 200,
    status: 'cancelled',
    notes: 'Cancelado pelo hóspede - mudança de planos.',
    createdAt: Timestamp.fromDate(new Date('2025-12-01T14:15:00')),
    googleCalendarEventId: 'mock-event-7'
  }
];

async function seedFirestore() {
  try {
    console.log('📝 Populando Firestore com dados de teste...\n');

    // Adicionar reservas
    for (const booking of mockBookings) {
      const docRef = await addDoc(collection(db, 'bookings'), booking);
      console.log(`✅ Reserva adicionada: ${booking.confirmationCode} (ID: ${docRef.id})`);
    }

    console.log('\n🎉 Dados populados com sucesso!');
    console.log(`\n📊 Total de reservas criadas: ${mockBookings.length}`);
    console.log(`   - Pendentes: ${mockBookings.filter(b => b.status === 'pending').length}`);
    console.log(`   - Confirmadas: ${mockBookings.filter(b => b.status === 'confirmed').length}`);
    console.log(`   - Canceladas: ${mockBookings.filter(b => b.status === 'cancelled').length}`);
    console.log(`   - Concluídas: ${mockBookings.filter(b => b.status === 'completed').length}`);

    const totalRevenue = mockBookings
      .filter(b => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + b.totalPrice, 0);
    console.log(`   - Receita total: ${totalRevenue}€`);

    console.log('\n🌐 Acesse o Emulator UI em: http://localhost:4000');
    console.log('🚀 Abra o AdminDashboard em: http://localhost:3000');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular dados:', error);
    process.exit(1);
  }
}

// Executar seed
seedFirestore();
