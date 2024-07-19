import Hero from "@/components/Hero";
import Products from "@/components/Products";

export const dynamic = "force-dynamic";
export default function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <div className="max-w-screen-xl mx-auto p-5 md:p-7">
      <Hero />
      <Products />
    </div>
  );
}
