import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Unit } from '../types';

interface UseUnitsReturn {
  units: Unit[];
  loading: boolean;
  error: Error | null;
}

/**
 * Hook para buscar unidades ativas do Firestore
 * @returns {UseUnitsReturn} Estado com units, loading e error
 */
export function useUnits(): UseUnitsReturn {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, 'units'),
          where('isActive', '==', true)
        );

        const snapshot = await getDocs(q);
        const unitsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Unit[];

        setUnits(unitsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching units:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  return { units, loading, error };
}
