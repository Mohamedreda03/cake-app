import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters." }),
});

export type SignInFormTypes = z.infer<typeof SignInSchema>;

// sign-up

export const SignUpSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters." })
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, {
        message: "password not good.",
      }),
    confirmPassword: z.string(),
  })
  .refine((input) => input.password === input.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export type SignUpFormTypes = z.infer<typeof SignUpSchema>;

// profile

export const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string(),
});

export type UserForm = z.infer<typeof UserSchema>;

// profile

export const AddressSchema = z.object({
  tel: z.string().min(7),
  street_address: z.string().min(2),
  post_code: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
});

export type AddressFormTypes = z.infer<typeof AddressSchema>;

// Categories

export const CategorySchema = z.object({
  name_ar: z.string().min(2),
  name_en: z.string().min(2),
});

export type CategoryFormTypes = z.infer<typeof CategorySchema>;

// Products

export const ProductSchema = z.object({
  name_ar: z.string().min(2),
  name_en: z.string().min(2),
  description_ar: z.string().min(2).max(100),
  description_en: z.string().min(2).max(100),
  categoryId: z.string().min(2),
  image: z.string().min(2),
  best_seller: z.boolean(),
});

export type ProductFormTypes = z.infer<typeof ProductSchema>;
