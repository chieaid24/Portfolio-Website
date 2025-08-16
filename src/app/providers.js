'use client';
import { MoneyProvider } from '@/lib/money-context';
export default function Providers({ children }) {
  return <MoneyProvider>{children}</MoneyProvider>;
}