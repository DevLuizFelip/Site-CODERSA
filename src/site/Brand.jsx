export function BrandMark({ className = '' }) {
  return <svg className={`brand-mark ${className}`} viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M44 8H20L8 20v24l12 12h24V44H26l-6-6V26l6-6h18Z"/><path fill="currentColor" d="M48 26h8v12h-8z"/></svg>;
}
export default function Brand() { return <span className="brand-lockup"><BrandMark/><span>codersa<span className="brand-dot">.</span></span></span>; }
