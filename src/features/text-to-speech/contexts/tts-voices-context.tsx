import { TTSVoicesContextValue } from "@/lib/types";
import { createContext, ReactNode, useContext } from "react";

type Props = {
  children: Readonly<ReactNode>;
  value: TTSVoicesContextValue;
};

const TTSVoicesContext = createContext<TTSVoicesContextValue | null>(null);

export default function TTSVoicesProvider({ children, value }: Props) {
  return (
    <TTSVoicesContext.Provider value={value}>
      {children}
    </TTSVoicesContext.Provider>
  );
}

export const useTTSVoices = () => {
  const context = useContext(TTSVoicesContext);

  if (!context)
    throw new Error("useTTSVoices must be used within TTSVoicesProvider...");

  return context;
};
