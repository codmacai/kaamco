import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import "./register/register.css";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { "en-IN": "/", "hi-IN": "/hi" } },
};

export default function Home() {
  return <HomePage lang="en" />;
}
