import React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: string[];
};

export default function Select({ label, options, id, ...rest }: Props) {
  const selectId = id ?? `select-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <label htmlFor={selectId} className="block space-y-1">
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      <select
        {...rest}
        id={selectId}
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-black/20"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
