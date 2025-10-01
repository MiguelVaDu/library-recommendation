import React, { useState } from "react";
import FiltersForm from "@/components/FiltersForm";
import ResultsGrid from "@/components/ResultsGrid";
import type { Props, Book } from "@/types";
import { fetchMockRecommendations } from "./MockServer";

export default function TestRecommendation() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastPayload, setLastPayload] = useState<any>(null);

  async function handleSearch(props: Props) {
    setLoading(true);
    setError(null);
    setLastPayload(props);
    try {
      const data = await fetchMockRecommendations(props);
      setResults(
        (data.results || []).map(r => ({
          title: r.title || "Sin título",
            author: r.author || "Desconocido",
            img: r.img
        }))
      );
    } catch (e: any) {
      setError(e.message || "Error desconocido");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Test Bench de Recomendaciones (Mock)</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Prueba local del flujo sin llamar al backend real.</p>
      </header>

      <FiltersForm onSubmit={handleSearch} loading={loading} />

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Resultados</h2>
        <ResultsGrid loading={loading} error={error} results={results} />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Último payload enviado</h2>
        {lastPayload ? (
          <pre className="text-xs p-4 rounded-xl bg-gray-100 dark:bg-gray-900 overflow-auto max-h-64">{JSON.stringify(lastPayload, null, 2)}</pre>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">Aún no se ha enviado nada.</p>
        )}
      </div>
    </section>
  );
}
