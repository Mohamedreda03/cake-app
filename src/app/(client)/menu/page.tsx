import Products from "@/components/Products";

export const metadata = {
  title: "Menu",
  description:
    "بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية.",
};

export const dynamic = "force-dynamic";

export default async function Menu() {
  return (
    <div className="max-w-screen-xl mx-auto p-7">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl border-b-2 border-color-1">الفئات</h1>
      </div>

      <Products />
    </div>
  );
}
