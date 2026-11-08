import type { Metadata } from "next";
import RegisterExperience from "@/components/register/RegisterExperience";
import "../../register/register.css";

export const metadata: Metadata = {
  title: "रजिस्टर करें — आप क्या ढूंढ रहे हैं?",
  description: "कामगार चाहिए, काम चाहिए या कामगार सप्लाई करते हैं? अपना रास्ता चुनें और दो मिनट में KAAM-CO के साथ रजिस्टर करें।",
  alternates: { canonical: "/hi/register", languages: { "en-IN": "/register", "hi-IN": "/hi/register" } },
};

export default function HindiRegisterPage() {
  return (
    <div lang="hi">
      <RegisterExperience lang="hi" />
    </div>
  );
}
