import React, { useState, useMemo } from "react";

interface MultiToggleGroupProps<T extends string | number> {
  label: string;
  options: T[];
  values: T[];
  onChange: (vals: T[]) => void;
  toLabel?: (v: T) => string;
  maxSelect?: number; // opcional límite
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'chip-sm',
  md: 'chip-md',
  lg: 'chip-lg'
};

export default function MultiToggleGroup<T extends string | number>({
  label,
  options,
  values,
  onChange,
  toLabel = (v) => String(v),
  maxSelect,
  size = 'md',
  className
}: MultiToggleGroupProps<T>) {
  const [limitFlash, setLimitFlash] = useState(false);

  function toggle(value: T) {
    const exists = values.includes(value);
    let next: T[];
    if (exists) {
      next = values.filter(v => v !== value);
    } else {
      if (maxSelect && values.length >= maxSelect) {
        // feedback visual rápido
        setLimitFlash(true);
        setTimeout(() => setLimitFlash(false), 600);
        return; // no exceder
      }
      next = [...values, value];
    }
    onChange(next);
  }

  // elimina duplicados, trims y descarta vacíos.
  const cleanedOptions = useMemo(() => {
    const seen = new Set<string | number>();
    const result: T[] = [];
    for (const raw of options) {
      let val: any = raw;
      if (typeof val === 'string') val = val.trim();
      if ((typeof val === 'string' && val.length === 0)) continue;
      if (!seen.has(val)) {
        seen.add(val);
        result.push(val as T);
      }
    }
    return result;
  }, [options]);

  // compresión tipográfica de etiquetas largas
  function labelClass(opt: T) {
    if (typeof opt !== 'string') return '';
    if (opt.length > 18) return 'chip-label-long';
    if (opt.length > 12) return 'chip-label-mid';
    return '';
  }

  return (
    <div className={className}>
      <span className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</span>
      <div className={`chip-group ${limitFlash ? 'wiggle-active' : ''}`}>
        {cleanedOptions.map(opt => {
          const active = values.includes(opt);
          return (
            <button
              key={String(opt)}
              type="button"
              onClick={() => toggle(opt)}
              className={`chip-base ${sizeMap[size]} ${active ? 'chip-active' : 'chip-inactive'}`}
            >
              <span className={labelClass(opt)}>{toLabel(opt)}</span>
              {active && (
                <span aria-hidden className="text-xs opacity-80">×</span>
              )}
            </button>
          );
        })}
      </div>
      {maxSelect && values.length >= maxSelect && (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400" aria-live="polite">
          Máximo {maxSelect} alcanzado
        </p>
      )}
    </div>
  );
}

// Animación wiggle simple
// Nota: Se puede mover a CSS global si se reutiliza.
// @keyframes wiggle { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
