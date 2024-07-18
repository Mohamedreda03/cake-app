import { Inter } from "next/font/google";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div
      className={`w-full h-screen flex items-center justify-center bg-color-3/20`}
    >
      {children}
    </div>
  );
}
