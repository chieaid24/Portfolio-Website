'use client';

import Barcode from 'react-barcode';

export default function MyBarcode() {
  return <Barcode value="pleasehireme" format="CODE128" renderer="svg" displayValue="false"/>;
}