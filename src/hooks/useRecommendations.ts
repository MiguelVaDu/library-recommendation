import { useState } from "react";
import type { Props, Book, RecommendationResponse } from "@/types";
import { getRecommendations } from "@/services/api";

export default function useRecommendations() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function search(props: Props) {
    setLoading(true);
    setError(null);
    try {
      const data: RecommendationResponse = await getRecommendations(props);

      // Normaliza author/autor e img:
      const books: Book[] = (data?.results ?? [])
        .map((r) => ({
          title: r.title ?? "Título desconocido",
          author: (r.author ?? r.autor ?? "Autor desconocido").trim(),
          img: r.img
        }))
        .filter((b) => b.title && b.author);

      setResults(books);
    } catch (e: any) {
      setError(e?.message ?? "Error al obtener recomendaciones");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return { loading, results, error, search };
}
