"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card as CardType } from "@/store/kanbanSlice";
import Image from "next/image";

interface CardItemProps {
  id: string;
  card: CardType;
}

export default function CardItem({ id, card }: CardItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `card:${id}`,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  // Priority tag styles mapping
  const priorityColors: Record<string, { bg: string; text: string }> = {
    Low: { bg: "bg-orange-50", text: "text-orange-600" },
    High: { bg: "bg-red-50", text: "text-red-600" },
    Medium: { bg: "bg-yellow-50", text: "text-yellow-600" },
  };

  const priority = priorityColors[card.priority || "Low"];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl p-4 shadow-sm border border-transparent bg-white
        w-[19.625rem] h-[11.063rem] 
      ${isDragging ? "ring-2 ring-offset-2 ring-violet-200" : ""}
      cursor-grab active:cursor-grabbing`}
      {...attributes}
      {...listeners}
    >
      {/* Top row: priority pill + kebab */}
      <div className="flex items-start justify-between">
        <span
          className={`inline-block text-xs font-medium px-2 py-0.5 rounded-md ${priority.bg} ${priority.text}`}
        >
          {card.priority || "Low"}
        </span>

        <button className="p-1 rounded-md hover:bg-zinc-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="1.5" fill="#6B7280" />
            <circle cx="12" cy="12" r="1.5" fill="#6B7280" />
            <circle cx="19" cy="12" r="1.5" fill="#6B7280" />
          </svg>
        </button>
      </div>

      {/* Title */}
      <h4 className="mt-3 text-base font-semibold text-slate-900 leading-5">
        {card.title}
      </h4>

      {/* Description */}
      {card.meta && (
        <p className="mt-1 text-sm text-zinc-500 leading-snug">
          {card.meta}
        </p>
      )}

      {/* Avatars + meta row */}
      <div className="mt-3 flex items-center justify-between">
        {/* Avatars */}
        <div className="flex -space-x-3">
          {
             [
                "https://i.pravatar.cc/32?img=31",
                "https://i.pravatar.cc/32?img=42",
                "https://i.pravatar.cc/32?img=49",
              ].map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Avatar ${index + 1}`}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
              ))}
        </div>

        {/* Comments & Files */}
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="flex-shrink-0"
            >
              <path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{card.comments || 0} comments</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="flex-shrink-0"
            >
              <path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{card.files || 0} files</span>
          </div>
        </div>
      </div>
    </div>
  );
}
