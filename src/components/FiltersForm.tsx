import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import MultiToggleGroup from "./ui/MultiToggleGroup";
import type { Props } from "@/types";
import { locationList, genreList, moodList, yearList } from "@/constants/Values";

type FormProps = {
  onSubmit: (p: Props) => void;
  loading?: boolean;
};

const defaultValues: Props = {
  locations: ["Casa"],
  genres: ["Ficción"],
  moods: ["Intrigante"],
  years: [2020],
  popularity: 8.1
};

export default function FiltersForm({ onSubmit, loading }: FormProps) {
  const [form, setForm] = useState<Props>(defaultValues);
  const [errors, setErrors] = useState<{[K in keyof Props]?: string}>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Asegura que los valores iniciales existan en las listas fuentes (en caso de cambios en constants)
  React.useEffect(() => {
    setForm(f => ({
      ...f,
      locations: f.locations.filter(l => locationList.includes(l)) || [locationList[0]],
      genres: f.genres.filter(g => genreList.includes(g)) || [genreList[0]],
      moods: f.moods.filter(m => moodList.includes(m)) || [moodList[0]],
      years: f.years.filter(y => yearList.includes(y)) || [yearList[0]]
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update<K extends keyof Props>(key: K, value: Props[K]) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validación: cada grupo debe tener al menos 1 selección
    const newErrors: {[k: string]: string} = {};
    if (!form.locations.length) newErrors.locations = "Selecciona al menos una ambientación";
    if (!form.genres.length) newErrors.genres = "Selecciona al menos un género";
    if (!form.moods.length) newErrors.moods = "Selecciona al menos un mood";
    if (!form.years.length) newErrors.years = "Selecciona al menos un año";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setGlobalError("Debes seleccionar al menos un valor en cada grupo antes de buscar.");
      return;
    }
    setGlobalError(null);
    onSubmit(form);
  }

  return (
  <form onSubmit={handleSubmit} className="space-y-8">
      {globalError && (
        <div className="form-global-error" role="alert">
          <span>⚠️</span>
          <span>{globalError}</span>
        </div>
      )}
      <div className="grid gap-6">
        <div className={errors.locations ? 'field-error-ring rounded-xl p-1 -m-1' : ''}>
          <MultiToggleGroup
            label="Ambientaciones"
            options={locationList}
            values={form.locations}
            onChange={(vals) => { update('locations', vals); if (vals.length) setErrors(e=>({...e,locations:undefined})); }}
            size="md"
          />
          {errors.locations && <p className="field-error-text">{errors.locations}</p>}
        </div>
        <div className={errors.genres ? 'field-error-ring rounded-xl p-1 -m-1' : ''}>
          <MultiToggleGroup
            label="Géneros"
            options={genreList}
            values={form.genres}
            onChange={(vals) => { update('genres', vals); if (vals.length) setErrors(e=>({...e,genres:undefined})); }}
            size="md"
            maxSelect={6}
          />
          {errors.genres && <p className="field-error-text">{errors.genres}</p>}
        </div>
        <div className={errors.moods ? 'field-error-ring rounded-xl p-1 -m-1' : ''}>
          <MultiToggleGroup
            label="Moods"
            options={moodList}
            values={form.moods}
            onChange={(vals) => { update('moods', vals); if (vals.length) setErrors(e=>({...e,moods:undefined})); }}
            size="md"
            maxSelect={6}
          />
          {errors.moods && <p className="field-error-text">{errors.moods}</p>}
        </div>
        <div className={errors.years ? 'field-error-ring rounded-xl p-1 -m-1' : ''}>
          <MultiToggleGroup
            label="Años"
            options={yearList}
            values={form.years}
            onChange={(vals) => { update('years', vals); if (vals.length) setErrors(e=>({...e,years:undefined})); }}
            size="md"
            maxSelect={3}
            toLabel={(y) => String(y)}
          />
          {errors.years && <p className="field-error-text">{errors.years}</p>}
        </div>
        <div>
          <Input
            label="Popularidad (0.0 a 10.0)"
            type="number"
            min={0}
            max={10}
            step="0.1"
            value={form.popularity}
            onChange={(e) => update("popularity", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <Button type="submit" size="lg" variant="white" loading={!!loading} className="btn-fluid">
          Buscar
        </Button>
      </div>
    </form>
  );
}
