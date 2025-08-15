'use client';

import Barcode from 'react-barcode';

export default function MyBarcode() {
  return <Barcode value="123456789012" format="CODE128" renderer="svg" displayValue="false"/>;
}