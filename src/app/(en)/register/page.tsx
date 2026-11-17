import type { Metadata } from "next";
import DeepLink from "@/components/register/DeepLink";
import RegisterExperience from "@/components/register/RegisterExperience";
import "@/styles/register.css";

export const metadata: Metadata = {
  title: "Request Manpower, Register for Work or Become a Partner",
  description:
    "Businesses: send your workforce requirement. Workers: register without a resume. Contractors: share your capacity. KAAM-CO, Bengaluru.",
  alternates: { canonical: "/register", languages: { "en-IN": "/register", "hi-IN": "/hi/register", "x-default": "/register" } },
  openGraph: { url: "/register" },
};

export default function RegisterPage() {
  return (
    <>
      <DeepLink />
      <RegisterExperience lang="en" />
    </>
  );
}
