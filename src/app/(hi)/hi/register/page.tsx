import type { Metadata } from "next";
import DeepLink from "@/components/register/DeepLink";
import RegisterExperience from "@/components/register/RegisterExperience";
import "@/styles/register.css";

export const metadata: Metadata = {
  title: "कामगार माँगें, काम के लिए रजिस्टर करें या पार्टनर बनें",
  description:
    "व्यवसाय: अपनी वर्कफ़ोर्स की ज़रूरत भेजें। कामगार: बिना रिज़्यूमे रजिस्टर करें। ठेकेदार: अपनी क्षमता बताइए। KAAM-CO, बेंगलुरु।",
  alternates: { canonical: "/hi/register", languages: { "en-IN": "/register", "hi-IN": "/hi/register", "x-default": "/register" } },
  openGraph: { url: "/hi/register", locale: "hi_IN" },
};

export default function HindiRegisterPage() {
  return (
    <>
      <DeepLink />
      <RegisterExperience lang="hi" />
    </>
  );
}
