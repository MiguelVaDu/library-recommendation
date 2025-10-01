import type { Props, RecommendationResponse } from "@/types";
import { fetchMockRecommendations } from "@/testbench/MockServer"; // fallback local

const BASE = import.meta.env.PUBLIC_API_BASE_URL?.replace(/\/$/, "");
const PATH = "/recommendations"; // tu backend debe exponer esta ruta

function withTimeout<T>(p: Promise<T>, ms = 15000): Promise<T> {
  let t: any;
  return Promise.race([
    p,
    new Promise<T>((_, reject) => (t = setTimeout(() => reject(new Error("Timeout de red")), ms)))
  ]).finally(() => clearTimeout(t));
}

export async function getRecommendations(props: Props): Promise<RecommendationResponse> {
  // Si no hay BASE definida, usamos directamente el mock para evitar 404 local
  if (!BASE) {
    return fetchMockRecommendations(props);
  }

  const url = `${BASE}${PATH}`;

  let res: Response;
  try {
    res = await withTimeout(
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          props: {
            ...props,
            location: props.locations?.[0],
            genre: props.genres?.[0],
            mood: props.moods?.[0],
            year: props.years?.[0]
          }
        })
      })
    );
  } catch (e) {
    // Si la red falla, último recurso: mock
    return fetchMockRecommendations(props);
  }

  if (!res.ok) {
    // Si el backend da 404 u otro error, fallback a mock
    if (res.status === 404 || res.status === 500) {
      return fetchMockRecommendations(props);
    }
    const text = await res.text().catch(() => "");
    throw new Error(`Backend respondió ${res.status}. ${text}`);
  }

  return res.json();
}
