import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const METADATA: Metadata = {
  title: "Bilim Bulak",
  description:
    "«Билим Булак» — педагогдорду психологиялык колдоо долбоору. Мектеп жана бала бакча педагогдору үчүн психология жана логопедия багытында тестирлөө жана колдоо.",
  icons: {
    icon: "/icons/logo.svg",
  },
  keywords: [
    "Билим Булак",
    "BILIM BULAK",
    "педагогдор",
    "педагог",
    "психология",
    "логопедия",
    "тестирлөө",
    "тестирование педагогов",
    "мектеп",
    "бала бакча",
    "Билим берүү министрлиги",
    "билим берүү",
  ],
  authors: [
    {
      name: "Alisher Jumanov",
      url: "https://www.linkedin.com/in/alisher-jumanov/",
    },
  ],
  creator: "Alisher Jumanov",
  publisher: "Bilim Bulak",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "BILIM BULAK — педагогдорду психологиялык колдоо",
    description:
      "Мектеп жана бала бакча педагогдору үчүн психология-логопедия багытында тестирлөө жана колдоо.",
    url: siteUrl,
    siteName: "Bilim Bulak",
    images: [
      {
        url: "/icons/logo.svg",
        width: 1200,
        height: 630,
        alt: "BILIM BULAK — педагогдорду психологиялык колдоо",
      },
    ],
    locale: "ky_KG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BILIM BULAK",
    description:
      "Педагогдорду психологиялык колдоо долбоору — тестирлөө жана колдоо.",
    images: ["/icons/logo.svg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const LANGUAGES = [
  { code: "ru", label: "РУС", icon: "/icons/ru.svg" },
  { code: "kg", label: "КЫР", icon: "/icons/kg.svg" },
];

export const STEPS = [
  {
    title: "Катталуу",
    description:
      "Телефон номериңиз аркылуу катталып, иштеген мекемеңизди (мектеп же бала бакча) тандайсыз.",
    icon: "/icons/first-step.svg",
  },
  {
    title: "Тест тапшыруу",
    description:
      "Өзүңүздүн эмоционалдык абалыңызды аныктоо үчүн атайын даярдалган суроолорго жооп бересиз.",
    icon: "/icons/second-step.svg",
  },
  {
    title: "Жыйынтык алуу",
    description:
      "Система жоопторуңузду автоматтык түрдө эсептеп, жыйынтыгын көрсөтөт.",
    icon: "/icons/third-step.svg",
  },
  {
    title: "Жеке сунуштама",
    description:
      "Сиздин жыйынтыгыңызга жараша пайдалуу видео курстар жана сунуштар ачылат.",
    icon: "/icons/fourth-step.svg",
  },
];
