import React from "react";
import FiltersForm from "./FiltersForm";
import ResultsGrid from "./ResultsGrid";
import useRecommendations from "@/hooks/useRecommendations";

export default function RecommendApp() {
  const { loading, results, error, search } = useRecommendations();

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-5xl font-semibold">Sistema de Recomendacion de libros</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Selecciona tus gustos y presiona <strong>Buscar</strong>.
        </p>
      </div>

      <FiltersForm onSubmit={search} loading={loading} />

      <ResultsGrid loading={loading} error={error} results={results} />
    </section>
  );
}
