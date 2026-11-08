import type { Metadata } from "next";
import RegisterExperience from "@/components/register/RegisterExperience";
import "./register.css";

export const metadata: Metadata = {
  title: "Register — What are you looking for?",
  description:
    "Need manpower, looking for work, or want to supply manpower? Choose your path and register with KAAM-CO in under two minutes.",
  alternates: { canonical: "/register", languages: { "en-IN": "/register", "hi-IN": "/hi/register" } },
};

export default function RegisterPage() {
  return <RegisterExperience lang="en" />;
}
