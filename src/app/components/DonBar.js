'use client';
import { useRef } from 'react';
import Barcode from 'react-barcode';

export default function DownloadableBarcode() {
  const svgRef = useRef(null);

  const handleDownload = () => {
    const svg = svgRef.current?.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'barcode.svg';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div ref={svgRef}>
        <Barcode value="PLEASEHIREME" format="code128" renderer="svg" background="transparent" displayValue="false"/>
      </div>
      <button onClick={handleDownload}>Download SVG</button>
    </div>
  );
}