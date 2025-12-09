/**
 * Seed script to populate Firestore with initial data from constants.ts
 *
 * Usage:
 * 1. Make sure Firebase is initialized: firebase use --add
 * 2. Run with emulator: npm run seed:local
 * 3. Run in production: npm run seed:prod
 */

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (serviceAccount && fs.existsSync(serviceAccount)) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  // Use emulator or default credentials
  admin.initializeApp();
}

const db = admin.firestore();

// Import constants (you'll need to convert constants.ts data here)
const UNITS_DATA = [
  {
    name: 'Casa da Serra',
    slug: 'casa-da-serra',
    description: 'Espaço amplo com vista deslumbrante para a serra. Ideal para famílias, com dois quartos aconchegantes e uma sala de estar com lareira. Desfrute de manhãs tranquilas no terraço privado.',
    price: 120,
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: [
      'Wi-Fi',
      'Cozinha Equipada',
      'Lareira',
      'Terraço Privado',
      'Vista Serra',
      'Estacionamento',
      'Aquecimento',
      'Roupa de Cama'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800',
        alt: 'Casa da Serra - Vista Exterior',
        isCover: true,
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800',
        alt: 'Casa da Serra - Sala de Estar',
        isCover: false,
        order: 2
      },
      {
        url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800',
        alt: 'Casa da Serra - Quarto Principal',
        isCover: false,
        order: 3
      }
    ],
    googleCalendarId: 'YOUR_CALENDAR_ID_1@group.calendar.google.com',
    isActive: true
  },
  {
    name: 'Loft do Rio',
    slug: 'loft-do-rio',
    description: 'Loft moderno junto ao rio, perfeito para casais. Design contemporâneo com janelas amplas que trazem a natureza para dentro. Pequeno jardim privado com acesso direto ao rio.',
    price: 95,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [
      'Wi-Fi',
      'Cozinha Equipada',
      'Vista Rio',
      'Jardim Privado',
      'Design Moderno',
      'Estacionamento',
      'Aquecimento',
      'Máquina de Café'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800',
        alt: 'Loft do Rio - Vista Exterior',
        isCover: true,
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800',
        alt: 'Loft do Rio - Interior',
        isCover: false,
        order: 2
      }
    ],
    googleCalendarId: 'YOUR_CALENDAR_ID_2@group.calendar.google.com',
    isActive: true
  },
  {
    name: 'Cabana da Floresta',
    slug: 'cabana-da-floresta',
    description: 'Aconchegante cabana de madeira no coração da floresta. Experiência única de contacto com a natureza, com sons da floresta como banda sonora. Perfeita para quem procura sossego e desconexão.',
    price: 80,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [
      'Wi-Fi',
      'Kitchenette',
      'Lareira a Lenha',
      'Varanda na Floresta',
      'Observação de Aves',
      'Trilhos Privados',
      'Aquecimento',
      'Isolamento Acústico'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800',
        alt: 'Cabana da Floresta - Vista Exterior',
        isCover: true,
        order: 1
      },
      {
        url: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800',
        alt: 'Cabana da Floresta - Interior',
        isCover: false,
        order: 2
      }
    ],
    googleCalendarId: 'YOUR_CALENDAR_ID_3@group.calendar.google.com',
    isActive: true
  }
];

async function seedUnits() {
  console.log('🌱 Seeding units...');

  const batch = db.batch();

  for (const unit of UNITS_DATA) {
    const unitRef = db.collection('units').doc();
    batch.set(unitRef, {
      ...unit,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`  ✓ ${unit.name}`);
  }

  await batch.commit();
  console.log('✅ Units seeded successfully!\n');
}

async function seedBlockedDates() {
  console.log('🌱 Seeding sample blocked dates...');

  // Get first unit for demo
  const unitsSnapshot = await db.collection('units').limit(1).get();

  if (unitsSnapshot.empty) {
    console.log('  ⚠️  No units found, skipping blocked dates');
    return;
  }

  const firstUnitId = unitsSnapshot.docs[0].id;

  // Add a blocked date for maintenance (example)
  await db.collection('blockedDates').add({
    unitId: firstUnitId,
    startDate: new Date('2025-12-20'),
    endDate: new Date('2025-12-22'),
    reason: 'Manutenção preventiva',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  console.log('  ✓ Sample blocked date added');
  console.log('✅ Blocked dates seeded successfully!\n');
}

async function main() {
  try {
    console.log('🔥 Starting Firestore seeding...\n');

    // Check if units already exist
    const existingUnits = await db.collection('units').limit(1).get();

    if (!existingUnits.empty) {
      console.log('⚠️  Units already exist in Firestore!');
      console.log('   To re-seed, delete existing units first or use --force flag\n');

      const forceFlag = process.argv.includes('--force');
      if (!forceFlag) {
        process.exit(0);
      }

      console.log('🗑️  Deleting existing data...\n');

      // Delete existing units
      const unitsSnapshot = await db.collection('units').get();
      const deleteBatch = db.batch();

      unitsSnapshot.docs.forEach(doc => {
        deleteBatch.delete(doc.ref);
      });

      await deleteBatch.commit();
      console.log('  ✓ Existing units deleted\n');
    }

    // Seed data
    await seedUnits();
    await seedBlockedDates();

    console.log('🎉 Seeding completed successfully!');
    console.log('\n📊 Summary:');
    const unitsCount = await db.collection('units').count().get();
    const blockedCount = await db.collection('blockedDates').count().get();

    console.log(`   Units: ${unitsCount.data().count}`);
    console.log(`   Blocked dates: ${blockedCount.data().count}`);
    console.log('\n✨ Firestore is ready to use!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error);
    process.exit(1);
  }
}

main();
