import type { Props, RecommendationResponse } from "@/types";

const BASE = import.meta.env.PUBLIC_API_BASE_URL?.replace(/\/$/, "");
const CONFIG_PATH = (import.meta as any).env?.PUBLIC_API_RECOMMEND_PATH as string | undefined;
const PATH = CONFIG_PATH || "/recommendations"; // default legacy

function withTimeout<T>(p: Promise<T>, ms = 15000): Promise<T> {
  let t: any;
  return Promise.race([
    p,
    new Promise<T>((_, reject) => (t = setTimeout(() => reject(new Error("Timeout de red")), ms)))
  ]).finally(() => clearTimeout(t));
}

export async function getRecommendations(props: Props): Promise<RecommendationResponse> {
  // Sin backend configurado, error explícito (ya no hay mock)
  if (!BASE) {
    throw new Error("PUBLIC_API_BASE_URL no configurada. Define el backend en .env");
  }

  const url = `${BASE}${PATH}`;
  const isNewApi = PATH === "/recommend" || /\/recommend$/.test(PATH);

  // Formato nuevo esperado por tu backend desplegado (arrays directos sin wrapper 'props')
  const payload = isNewApi
    ? {
        location: props.locations,
        genre: props.genres,
        mood: props.moods,
        year: props.years,
        popularity: props.popularity
      }
    : {
        props: {
          ...props,
          location: props.locations?.[0],
          genre: props.genres?.[0],
          mood: props.moods?.[0],
          year: props.years?.[0]
        }
      };

  let res: Response;
  try {
    res = await withTimeout(
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    );
  } catch (e) {
    throw new Error("Error de red al contactar el backend: " + (e as any)?.message);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Backend respondió ${res.status}. ${text}`);
  }

  const data = await res.json();
  // Normalización defensiva si la API usa otra clave
  if (data && !data.results) {
    if (Array.isArray(data.recommendations)) return { results: data.recommendations };
    if (Array.isArray(data.data)) return { results: data.data };
    if (Array.isArray(data.books)) return { results: data.books };
  }
  return data;
}
