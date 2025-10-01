import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({ label, id, ...rest }: Props) {
  const inputId = id ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <label htmlFor={inputId} className="block space-y-1">
      <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
      <input
        {...rest}
        id={inputId}
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-black/20"
      />
    </label>
  );
}
