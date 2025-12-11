import { useState } from 'react';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Unit } from '../types';

interface UseUnitsAdminReturn {
  createUnit: (unitData: Partial<Unit>) => Promise<string>;
  updateUnit: (unitId: string, unitData: Partial<Unit>) => Promise<void>;
  deleteUnit: (unitId: string) => Promise<void>;
  toggleUnitActive: (unitId: string, isActive: boolean) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook para operações CRUD de units (apenas admin)
 * @returns {UseUnitsAdminReturn} Funções para gerenciar units
 */
export function useUnitsAdmin(): UseUnitsAdminReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createUnit = async (unitData: Partial<Unit>): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      // Validação básica
      if (!unitData.name || !unitData.pricePerNight || !unitData.capacity) {
        throw new Error('Campos obrigatórios: name, pricePerNight, capacity');
      }

      const newUnit = {
        ...unitData,
        isActive: unitData.isActive ?? true,
        images: unitData.images ?? [],
        amenities: unitData.amenities ?? [],
        size: unitData.size ?? 0,
        bedrooms: unitData.bedrooms ?? 1,
        bathrooms: unitData.bathrooms ?? 1,
        googleCalendarId: unitData.googleCalendarId ?? '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'units'), newUnit);

      console.log('✅ Unit created successfully:', docRef.id);
      return docRef.id;
    } catch (err) {
      const error = err as Error;
      console.error('❌ Error creating unit:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUnit = async (unitId: string, unitData: Partial<Unit>): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const unitRef = doc(db, 'units', unitId);

      const updateData = {
        ...unitData,
        updatedAt: serverTimestamp()
      };

      // Remove undefined fields
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof typeof updateData] === undefined) {
          delete updateData[key as keyof typeof updateData];
        }
      });

      await updateDoc(unitRef, updateData);

      console.log('✅ Unit updated successfully:', unitId);
    } catch (err) {
      const error = err as Error;
      console.error('❌ Error updating unit:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUnit = async (unitId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const unitRef = doc(db, 'units', unitId);
      await deleteDoc(unitRef);

      console.log('✅ Unit deleted successfully:', unitId);
    } catch (err) {
      const error = err as Error;
      console.error('❌ Error deleting unit:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const toggleUnitActive = async (unitId: string, isActive: boolean): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const unitRef = doc(db, 'units', unitId);
      await updateDoc(unitRef, {
        isActive,
        updatedAt: serverTimestamp()
      });

      console.log(`✅ Unit ${isActive ? 'activated' : 'deactivated'} successfully:`, unitId);
    } catch (err) {
      const error = err as Error;
      console.error('❌ Error toggling unit active status:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createUnit,
    updateUnit,
    deleteUnit,
    toggleUnitActive,
    loading,
    error
  };
}
