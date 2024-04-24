"use client";

import { AppContext } from "@/context/LoginContext";

function ContextWrapper({ children }: { children: React.ReactNode }) {
  return <AppContext>{children}</AppContext>;
}

export default ContextWrapper;
