import { Product } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SpecialProductType {
  id?: number;
  quantity: number;
  description: string;
}

interface SpecialProduct {
  items: SpecialProductType[];
  addItem: (item: SpecialProductType) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const useSpecialProduct = create(
  persist<SpecialProduct>(
    (set) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          return {
            items: [
              ...state.items,
              { ...item, quantity: item.quantity, id: state.items.length + 1 },
            ],
          };
        });
      },
      updateItemQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                }
              : item
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () =>
        set(() => ({
          items: [],
        })),
    }),
    {
      name: "special-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSpecialProduct;
