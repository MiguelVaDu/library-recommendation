// Dataset curado basado en los ejemplos proporcionados por el usuario
// Cada entrada se normaliza a las estructuras internas (arrays) para facilitar matching.
import type { BookRaw } from "@/types";

export interface CuratedSample {
  locations: string[];
  genres: string[];
  moods: string[];
  years: number[]; // usamos array para ser consistente con Props
  popularity: number; // valor de referencia (podemos usarlo como peso opcional)
  response: BookRaw; // title, author, img
}

export const CURATED_SAMPLES: CuratedSample[] = [
  {
    locations: ["Pueblo", "Caribe"],
    genres: ["Realismo mágico", "Clásico"],
    moods: ["Nostálgica", "Familiar"],
    years: [1967],
    popularity: 9.6,
    response: {
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      img: "https://covers.openlibrary.org/b/isbn/9788420471839-L.jpg?default=false"
    }
  },
  {
    locations: ["Abadía", "Montaña"],
    genres: ["Misterio", "Histórica"],
    moods: ["Intrigante", "Oscura"],
    years: [1980],
    popularity: 9.1,
    response: {
      title: "El nombre de la rosa",
      author: "Umberto Eco",
      img: "https://covers.openlibrary.org/b/isbn/9788426403568-L.jpg?default=false"
    }
  },
  {
    locations: ["Desierto", "Caravana"],
    genres: ["Fábula", "Aventura"],
    moods: ["Esperanzadora", "Reflexiva"],
    years: [1988],
    popularity: 9.0,
    response: {
      title: "El alquimista",
      author: "Paulo Coelho",
      img: "https://covers.openlibrary.org/b/isbn/9789708103053-L.jpg?default=false"
    }
  },
  {
    locations: ["Barcelona", "Librería"],
    genres: ["Misterio", "Histórica"],
    moods: ["Melancólica", "Emotiva"],
    years: [2001],
    popularity: 9.4,
    response: {
      title: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      img: "https://covers.openlibrary.org/b/isbn/9788408176459-L.jpg?default=false"
    }
  },
  {
    locations: ["París", "Museo"],
    genres: ["Thriller", "Misterio"],
    moods: ["Trepidante", "Conspirativa"],
    years: [2003],
    popularity: 8.8,
    response: {
      title: "El código Da Vinci",
      author: "Dan Brown",
      img: "https://covers.openlibrary.org/b/isbn/9788495618603-L.jpg?default=false"
    }
  },
  {
    locations: ["Río Magdalena", "Ciudad portuaria"],
    genres: ["Romance", "Clásico"],
    moods: ["Melancólica", "Poética"],
    years: [1985],
    popularity: 9.2,
    response: {
      title: "El amor en los tiempos del cólera",
      author: "Gabriel García Márquez",
      img: "https://covers.openlibrary.org/b/isbn/9780307387264-L.jpg?default=false"
    }
  },
  {
    locations: ["Atlántico", "Barca"],
    genres: ["Clásico", "Aventura"],
    moods: ["Estoica", "Inspiradora"],
    years: [1952],
    popularity: 8.9,
    response: {
      title: "El viejo y el mar",
      author: "Ernest Hemingway",
      img: "https://covers.openlibrary.org/b/isbn/9781644730546-L.jpg?default=false"
    }
  },
  {
    locations: ["Distrito 12", "Capitolio"],
    genres: ["Distopía", "Aventura"],
    moods: ["Tensa", "Valiente"],
    years: [2008],
    popularity: 9.0,
    response: {
      title: "Los juegos del hambre",
      author: "Suzanne Collins",
      img: "https://covers.openlibrary.org/b/isbn/9786073807845-L.jpg?default=false"
    }
  },
  {
    locations: ["Tren", "Suburbios"],
    genres: ["Thriller", "Misterio"],
    moods: ["Inquietante", "Psicológica"],
    years: [2015],
    popularity: 8.4,
    response: {
      title: "La chica del tren",
      author: "Paula Hawkins",
      img: "https://covers.openlibrary.org/b/isbn/9786070728389-L.jpg?default=false"
    }
  },
  {
    locations: ["Desierto", "Asteroide B-612"],
    genres: ["Fábula", "Clásico"],
    moods: ["Tierna", "Filosófica"],
    years: [1943],
    popularity: 9.7,
    response: {
      title: "El principito",
      author: "Antoine de Saint-Exupéry",
      img: "https://covers.openlibrary.org/b/isbn/9780156013925-L.jpg?default=false"
    }
  }
];

// Función utilitaria para calcular un score de matching
export function scoreSample(user: {
  locations: string[];
  genres: string[];
  moods: string[];
  years: number[];
  popularity: number;
}, sample: CuratedSample): number {
  let score = 0;
  const intersectCount = (a: string[], b: string[]) => a.filter(x => b.includes(x)).length;

  score += intersectCount(user.locations, sample.locations) * 3; // peso mayor para localización
  score += intersectCount(user.genres, sample.genres) * 4; // géneros más determinantes
  score += intersectCount(user.moods, sample.moods) * 2;
  if (user.years.some(y => sample.years.includes(y))) score += 5; // año exacto fuerte

  // Ajuste por cercanía de popularidad (más cerca => +2 máximo)
  const popDiff = Math.abs(user.popularity - sample.popularity);
  const popBonus = Math.max(0, 2 - popDiff / 2); // diff 0 => +2, diff 4 => 0
  score += popBonus;

  return score;
}
