import { Product } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItemType extends Product {
  quantity: number;
  total: number;
}

interface CartStore {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
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
      updateItemQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                  total: item.price * quantity,
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
