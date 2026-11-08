import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import "../register/register.css";

export const metadata: Metadata = {
  title: { absolute: "KAAM-CO | कामगार चाहिए या काम चाहिए — मैनपावर प्लेटफ़ॉर्म" },
  description:
    "KAAM-CO — व्यवसायों के लिए भरोसेमंद कामगार, काम ढूंढने वालों के लिए काम और सप्लायर्स के लिए तरक्की। बेंगलुरु, हैदराबाद, चेन्नई और कोच्चि में।",
  alternates: { canonical: "/hi", languages: { "en-IN": "/", "hi-IN": "/hi" } },
  openGraph: { locale: "hi_IN", url: "/hi" },
};

export default function HindiHome() {
  return <HomePage lang="hi" />;
}
