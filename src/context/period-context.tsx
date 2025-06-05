import React, { createContext, useContext, useState } from "react";

import { Period } from "@/period";

const PeriodContext = createContext<{
  period: Period,
  setPeriod: (p: Period) => void
}>({ period: "7d", setPeriod: () => {} });

export function PeriodProvider({ children }: { children: React.ReactNode }) {
  const [period, setPeriod] = useState<Period>("7d");
  return (
    <PeriodContext.Provider value={{ period, setPeriod }}>
      {children}
    </PeriodContext.Provider>
  );
}

export function usePeriod() {
  return useContext(PeriodContext);
}
