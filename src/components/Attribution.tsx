"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Records landing page, referrer and UTM values once per session (no personal data). */
export default function Attribution() {
  useEffect(() => captureAttribution(), []);
  return null;
}
