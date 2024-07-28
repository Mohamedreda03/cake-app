import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItemType {
  special_id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
  total: number;
  note?: string;
}

interface CartStore {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  updateItemQuantity: (special_id: string, quantity: number) => void;
  removeItem: (special_id: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.special_id === item.special_id
          );

          if (existingItem) {
            if (existingItem.size !== item.size) {
              return {
                items: [
                  ...state.items,
                  {
                    ...item,
                    quantity: item.quantity,
                    total: item.total,
                    sizes: undefined,
                  },
                ],
              };
            }

            return {
              items: state.items.map((i) =>
                i.special_id === item.special_id
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
      updateItemQuantity: (special_id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.special_id === special_id
              ? {
                  ...item,
                  quantity,
                  total: item.price * quantity,
                }
              : item
          ),
        })),
      removeItem: (special_id) =>
        set((state) => ({
          items: state.items.filter((item) => item.special_id !== special_id),
        })),
      clearCart: () =>
        set(() => ({
          items: [],
        })),
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useCart;
