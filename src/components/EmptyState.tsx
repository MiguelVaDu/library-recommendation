import React from "react";

export default function EmptyState() {
  return (
    <div role="status" aria-live="polite" className="text-center text-gray-500 dark:text-gray-400 py-6">
      No se encontraron resultados
    </div>
  );
}
