import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PurchaseState {
  purchasedPrograms: string[];
  hasPurchased: (programId: string) => boolean;
  addPurchase: (programId: string) => void;
  removePurchase: (programId: string) => void;
}

export const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set, get) => ({
      purchasedPrograms: [],
      hasPurchased: (programId: string) => {
        return get().purchasedPrograms.includes(programId);
      },
      addPurchase: (programId: string) => {
        set((state) => ({
          purchasedPrograms: [...state.purchasedPrograms, programId]
        }));
      },
      removePurchase: (programId: string) => {
        set((state) => ({
          purchasedPrograms: state.purchasedPrograms.filter(id => id !== programId)
        }));
      }
    }),
    {
      name: 'purchase-storage'
    }
  )
);