"use client";

import React from "react";
import { CafeCartProvider } from "@/context/CafeCartContext";

export default function CafeLayout({ children }: { children: React.ReactNode }) {
    return <CafeCartProvider>{children}</CafeCartProvider>;
}
