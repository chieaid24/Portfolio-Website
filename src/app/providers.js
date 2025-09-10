'use client';
import { MoneyProvider } from '@/lib/money-context';
import { SlotJiggleProvider } from '@/lib/slot-jiggle-context';


export default function Providers({ children }) {
  return (
    <MoneyProvider>
      <SlotJiggleProvider>{children}</SlotJiggleProvider>
    </MoneyProvider>
    );
}