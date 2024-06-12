import { Metadata } from "next";


export const metadata: Metadata = {
  title: "قصتنا المبهره",
  description:
    "بيلا سويت هو محل تجاري أنيق يقدم أجمل وألذ الأصناف المميزة والمبتكرة من الحلويات والموالح تمتلكه وتديره مؤسسة الحلويات الجميلة التجارية.",
}

export default function page() {
  return (
    <div className="max-w-screen-xl mx-auto p-5 md:p-7">
      <div className="flex items-center justify-center mt-5 mb-10">
        <h2 className="text-5xl border-b-2 border-color-1 w-fit">
          قصتنا المبهره
        </h2>
      </div>
      <div
        className="text-xl min-h-[calc(60vh+8px)]"
        style={{
          wordSpacing: "3px",
        }}
      >
        <p>
          <span className="relative before:block before:absolute before:bg-color-2 before:h-[2px] before:w-[130%] before:-left-0.5 before:bottom-0">
            بيلا
          </span>{" "}
          هي قصة شغف الأختين نورا ورنا ووالدتهما .. فبشكلها الانيق والمميز
          وطعمها الساحر وادراكهم بأن الحلويات اللذيذة هي سرّ السعادة في الحفلات
          والمناسبات والاجتماعات العائلية ابتسامه وتصنع السعادة للناس .. فقررو
          انشاء مشروعهم المنزلي الصغير.
        </p>
        <p className="mt-4">
          وتبدأ القصة في عام 2010 م لشغفهم الشديد بالحلويات والذي قد بدأ منذ
          نعومة أظافرهم.. حيث بدأو العمل من المنزل ..
        </p>
        <p className="mt-4">
          وتميزو بألذ وأجمل الاصناف .. فأبدعوا واشتهرو بحمد الله
        </p>
        <p className="mt-4">
          وبعد 6 سنوات من العمل الدؤوب .. وبتوفيق من الله سبحانه وتعالى
        </p>
        <p className="mt-4">
          قررو فتح متجرهم الجميل .. ووضعو فيه كل احلامهم وآمالهم بعد الله ..
        </p>
        <p className="mt-4">
          وبسبب إيمانهم وإدراكهم بأن تميز قطعة الحلوى وتفردها وجمالها وطعمها
          الغنيّ واللذيذ ينعكس على الحضور او اصحاب المنزل ومزاجهم العام أولاً ..
          قررو سوياً صنع أجمل وألذ الحلويات والموالح .. كي يصنعو الجمال والسعادة
          في جميع البيوت .. وجعلها متاحة للجميع لتزيدهم سعادة وجمال .. ومن هنا
          كانت ولادة{" "}
          <span className="relative before:block before:absolute before:bg-color-2 before:h-[2px] before:w-[130%] before:-left-0.5 before:bottom-0.5">
            بيلا
          </span>{" "}
          ؛ لتكون الوسيلة الأقرب والأسهل لإقتناء ألذ وأجمل الحلويات والموالح ،
          وتصل لكل منزل بشكل أنيق دون مواجهة أي مشاكل.
        </p>
        <p className="mt-4">
          والان نحن في فريق{" "}
          <span className="relative before:block before:absolute before:bg-color-2 before:h-[2px] before:w-[130%] before:-left-0.5 before:bottom-0.5">
            بيلا
          </span>{" "}
          ، حيث وجدنا الإلهام في المنتجات المشوقة ذات الاشكال الابداعية والملفتة
          ومنتجات مميزة، نطرحها لكم في موقعنا ومحلنا ونعمل جاهدين لأن يتم تطويره
          بصفة دائمة ومستمرة.. مهمتنا الأولى هي تزويد المحل بكل ما هو جديد في
          عالم الضيافه اللذيذة ذات الافكار الجذابة والمميزة لتناسب ذوقكم .
        </p>
      </div>
    </div>
  );
}
