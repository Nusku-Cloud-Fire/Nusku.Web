import type { Metadata } from "next";
import { CalculadoraAhorro } from "@/components/pages/calculadora-ahorro";

export const metadata: Metadata = {
  title: "Calculadora de Ahorro RIPCI",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CalculadoraAhorro />;
}
