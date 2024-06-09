import { Product } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem extends Product {
  quantity: number;
  total: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,
                      total: i.total + item.total,
                    }
                  : i
              ),
            };
          } else {
            return {
              items: [
                ...state.items,
                { ...item, quantity: item.quantity, total: item.total },
              ],
            };
          }
        });
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () =>
        set(() => ({
          items: [],
        })),
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);

// const useCart = create(
//   devtools(
//     persist(cartStore, {
//       name: "cart",
//     })
//   )
// );

export default useCart;
