import type { Props, RecommendationResponse } from "@/types";
import { CURATED_SAMPLES, scoreSample } from "./curatedData";

const SAMPLE_COVERS = [
  "https://picsum.photos/seed/libro1/200/300",
  "https://picsum.photos/seed/libro2/200/300",
  "https://picsum.photos/seed/libro3/200/300",
  "https://picsum.photos/seed/libro4/200/300",
  "https://picsum.photos/seed/libro5/200/300"
];

function pseudoRandomPick<T>(arr: T[], n: number): T[] {
  const out: T[] = [];
  const used = new Set<number>();
  while (out.length < n && used.size < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used.has(idx)) { used.add(idx); out.push(arr[idx]); }
  }
  return out;
}

export async function fetchMockRecommendations(props: Props): Promise<RecommendationResponse> {
  // Simula latencia ligera
  await new Promise(r => setTimeout(r, 400));

  // 1. Intentar hacer matching con dataset curado
  const scored = CURATED_SAMPLES
    .map(sample => ({ sample, score: scoreSample({
      locations: props.locations || [],
      genres: props.genres || [],
      moods: props.moods || [],
      years: props.years || [],
      popularity: props.popularity ?? 0
    }, sample) }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const curatedPicks = scored.slice(0, 5).map(s => ({
    title: s.sample.response.title,
    author: s.sample.response.author,
    img: s.sample.response.img
  }));

  // Si hay suficientes matches (>=3) devolvemos solo esos
  if (curatedPicks.length >= 3) {
    return { results: curatedPicks };
  }

  // 2. Fallback: completar con resultados sintéticos para llegar a un mínimo
  const needed = Math.max(3, 6) - curatedPicks.length; // queremos hasta 6

  const baseTitles = [
    "Crónicas", "Historias", "Relatos", "Viajes", "Memorias", "Leyendas", "Sombras", "Universos"
  ];
  const seeds = [
    ...(props.genres || []),
    ...(props.moods || []),
    ...(props.locations || []),
    ...(props.years || []).map(String)
  ].filter(Boolean);
  const core = seeds.slice(0, 3).join(" • ") || "Selección";
  const syntheticTitles = pseudoRandomPick(baseTitles, needed).map((t, i) => `${t} ${core} #${i + 1}`);
  const synthetic = syntheticTitles.map((title, i) => ({
    title,
    author: (props.genres[0] || "Autor") + " & " + (props.moods[0] || "Mood"),
    img: SAMPLE_COVERS[i % SAMPLE_COVERS.length]
  }));

  return { results: [...curatedPicks, ...synthetic] };
}
