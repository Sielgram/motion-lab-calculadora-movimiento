import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Motion Lab — Calculadora de Movimiento", description: "Explora el movimiento rectilíneo con una calculadora interactiva, gráficas y conceptos de cinemática." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
