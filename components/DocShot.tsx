import Image from "next/image";

/** A real screenshot on the docs page: light frame, optional caption, optional numbered markers. */
export default function DocShot({
  src, width, height, alt, caption, maxWidth, markers,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** CSS max width of the frame; defaults to the full column */
  maxWidth?: number;
  /** Numbered markers, x and y in percent of the image */
  markers?: { n: number; x: number; y: number }[];
}) {
  return (
    <figure style={{ margin: '8px 0 20px', maxWidth: maxWidth ?? '100%', width: '100%' }}>
      <div style={{
        position: 'relative', borderRadius: 12, overflow: 'hidden', lineHeight: 0,
        border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(17,24,39,0.08), 0 1px 3px rgba(17,24,39,0.06)',
      }}>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes={maxWidth ? `(max-width: 1023px) 100vw, ${maxWidth}px` : '(max-width: 1023px) 100vw, 820px'}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        {markers?.map(m => (
          <span key={m.n} aria-hidden="true" style={{
            position: 'absolute', left: `${m.x}%`, top: `${m.y}%`, transform: 'translate(-50%, -50%)',
            width: 'clamp(16px, 2.6vw, 24px)', height: 'clamp(16px, 2.6vw, 24px)', borderRadius: '50%',
            background: '#3b82f6', color: '#fff', border: '2px solid #fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 'clamp(9px, 1.4vw, 12px)', fontWeight: 700, lineHeight: 1,
          }}>{m.n}</span>
        ))}
      </div>
      {caption && (
        <figcaption style={{ marginTop: 8, fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{caption}</figcaption>
      )}
    </figure>
  );
}
