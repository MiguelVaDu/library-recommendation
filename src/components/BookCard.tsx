import React from "react";
import Card from "./ui/Card";
import type { Book } from "@/types";

export default function BookCard({ title, author, img }: Book) {
  return (
    <Card>
      <div className="flex gap-4">
        {img ? (
          <img
            src={img}
            alt={`Portada de ${title}`}
            className="w-20 h-28 object-cover rounded-lg border border-gray-200 dark:border-gray-800"
            loading="lazy"
          />
        ) : (
          <div className="w-20 h-28 rounded-lg bg-gray-100 dark:bg-gray-800" />
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">de {author}</p>
        </div>
      </div>
    </Card>
  );
}
