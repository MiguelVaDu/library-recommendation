import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
      {children}
    </div>
  );
}
