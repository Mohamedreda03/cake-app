import Hero from "@/components/Hero";
import Products from "@/components/Products";
import robots from "../robots";

// pages/index.js أو app/page.js

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto p-5 md:p-7">
      <Hero />
      <Products />
    </div>
  );
}
