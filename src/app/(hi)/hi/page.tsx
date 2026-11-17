import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import "@/styles/register.css";

export const metadata: Metadata = {
  title: { absolute: "KAAM-CO | बेंगलुरु में हाउसकीपिंग, ऑफ़िस शिफ्टिंग और वेयरहाउस के लिए कामगार" },
  description:
    "आपकी ज़रूरत, हमारा तालमेल। बेंगलुरु में हाउसकीपिंग, ऑफ़िस शिफ्टिंग, वेयरहाउस और फैसिलिटी सपोर्ट के लिए कामगार माँगें। कामगार और ठेकेदार मुफ़्त रजिस्टर करें।",
  alternates: { canonical: "/hi", languages: { "en-IN": "/", "hi-IN": "/hi", "x-default": "/" } },
  openGraph: { url: "/hi", locale: "hi_IN" },
};

export default function HindiHome() {
  return <HomePage lang="hi" />;
}
