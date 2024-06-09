import supabase from "@/lib/supabase";

export default async function uploadImage(image: any) {
  const imageName = `product-${Date.now()}-${image.name}`.replaceAll("/", "");
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products_images/${imageName}`;

  const { error } = await supabase.storage
    .from("products_images")
    .upload(imageName, image);

  if (error) {
    return new Error(error.message);
  }

  return imageUrl;
}
