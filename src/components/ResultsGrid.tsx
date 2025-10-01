import React from "react";
import BookCard from "./BookCard";
import EmptyState from "./EmptyState";
import type { Book } from "@/types";

type Props = {
  loading: boolean;
  error?: string | null;
  results: Book[];
};

export default function ResultsGrid({ loading, error, results }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-2xl border border-gray-200 dark:border-gray-800 animate-pulse bg-gray-100/60 dark:bg-gray-800/60"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 dark:text-red-400">{error}</div>;
  }

  if (!results || results.length === 0) {
    return <EmptyState />;
  }

  return (
    <div aria-live="polite" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((b, idx) => (
        <BookCard key={`${b.title}-${idx}`} {...b} />
      ))}
    </div>
  );
}
