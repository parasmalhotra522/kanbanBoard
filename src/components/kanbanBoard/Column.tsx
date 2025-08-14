"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import CardItem from "./CardItem";
import { Card as CardType } from "@/store/kanbanSlice";
import { FaRegSquarePlus } from "react-icons/fa6";

type Props = {
  id: string;
  title: string;
  cardIds: string[];
  cards: Record<string, CardType>;
};

export default function Column({ id, title, cardIds, cards }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: `column:${id}`, // keeps droppable for empty space
  });

  // map column ids to colors
  const borderColors: Record<string, string> = {
    todo: "bg-violet-700",
    inprogress: "bg-amber-500",
    done: "bg-emerald-400",
  };
  const dotColors: Record<string, string> = {
    todo: "bg-violet-700",
    inprogress: "bg-amber-500",
    done: "bg-blue-400",
  };

  const topLine = borderColors[id] ?? "bg-gray-300";
  const dotColor = dotColors[id] ?? "bg-gray-400";


  return (
    <div
      ref={setNodeRef}
      className={`bg-neutral-100 rounded-2xl p-4 min-h-[200px] shadow-sm transition-colors 
        w-[22.125rem] max-h-[39.063rem] 
        ${
        isOver ? "bg-purple-50" : ""
      }`}
    >
      {/* top colored rule */}
      <div className={`h-1 rounded-full ${topLine} mb-4`}></div>

      {/* column header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full ${dotColor}`} /> {/* small dot */}
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <div className="text-xs text-gray-400 px-2">{cardIds.length}</div>
        </div>

      
        <button className="flex items-center gap-1 text-base font-medium"
            aria-label="Add card">
                    <FaRegSquarePlus
                      size="1.125rem"
                      className="text-violet-700 bg-violet-200 rounded-md"
                    />
                 
                  </button>
      </div>

      {/* cards */}
      <div className="space-y-4 min-h-[20px]">
        {cardIds.length === 0 && (
          <div className="p-4 rounded-lg border-2 border-dashed border-gray-200 text-sm text-gray-400">
            No items
          </div>
        )}
        {cardIds.map((cardId) => (
          <CardItem key={cardId} id={cardId} card={cards[cardId]} />
        ))}
      </div>
    </div>
  );
}
