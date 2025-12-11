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

// Import constants - Data migrated from constants.ts
const UNITS_DATA = [
  {
    id: 'unit-1',
    name: 'Casa da Serra',
    description: 'Uma casa rústica em pedra com um terraço deslumbrante sobre o vale. Perfeita para quem procura a serenidade das vinhas e do rio.',
    pricePerNight: 120,
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    size: 85, // m²
    amenities: ['Wi-Fi', 'Lareira', 'Cozinha Completa', 'Terraço Panorâmico', 'Vista Rio'],
    imageUrl: '/images/casa-da-serra/458670019.jpg',
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
    googleCalendarId: 'b7535e176efe76894b1ee91827e733cd1a8240910bae246ea03866ba154e33a5@group.calendar.google.com',
    isActive: true
  },
  {
    id: 'unit-2',
    name: 'Loft do Rio',
    description: 'Um espaço moderno de vidro e madeira situado nas margens do rio. Ideal para escapadinhas românticas.',
    pricePerNight: 95,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    size: 55, // m²
    amenities: ['Wi-Fi', 'Ar Condicionado', 'Varanda Rio', 'Jacuzzi Privado'],
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505693416388-b034631ac954?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-6e5c48dc52e3?w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'
    ],
    googleCalendarId: '72c687fee97f44b5cb98815c596a4a40a4f8013bb7af28d22f18dba7ca3201b9@group.calendar.google.com',
    isActive: true
  },
  {
    id: 'unit-3',
    name: 'Cabana da Floresta',
    description: 'Imersão total na natureza numa cabana de madeira ecológica. Acorde com o som dos pássaros.',
    pricePerNight: 80,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    size: 45, // m²
    amenities: ['Energia Solar', 'Rede de Descanso', 'Trilhos Privados', 'Fogão a Lenha'],
    imageUrl: 'https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80'
    ],
    googleCalendarId: 'b3bc51ca0eff9214930e45830fab07c51b41afc2fc695d930827d64a20273c11@group.calendar.google.com',
    isActive: true
  }
];

async function seedUnits() {
  console.log('🌱 Seeding units...');

  const batch = db.batch();

  for (const unit of UNITS_DATA) {
    // Use the predefined ID from constants.ts
    const unitRef = db.collection('units').doc(unit.id);
    batch.set(unitRef, {
      ...unit,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`  ✓ ${unit.name} (${unit.id})`);
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
