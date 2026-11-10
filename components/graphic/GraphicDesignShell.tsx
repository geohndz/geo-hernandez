"use client";

import type { ReactNode } from "react";
import { GraphicLightboxProvider } from "@/components/graphic/GraphicLightboxContext";

export function GraphicDesignShell({ children }: { children: ReactNode }) {
  return <GraphicLightboxProvider>{children}</GraphicLightboxProvider>;
}
