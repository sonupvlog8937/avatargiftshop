import { Minus, Plus } from 'lucide-react';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export default function QuantitySelector({ value, onChange, min = 1, max = 20, size = 'md' }: Props) {
  const btn = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  return (
    <div className="inline-flex items-center rounded-full border border-gold/60 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${btn} flex items-center justify-center rounded-full text-burgundy transition hover:bg-softpink disabled:opacity-40`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={`${size === 'sm' ? 'w-8 text-sm' : 'w-10'} text-center font-semibold`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`${btn} flex items-center justify-center rounded-full text-burgundy transition hover:bg-softpink disabled:opacity-40`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
