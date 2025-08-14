"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  TouchSensor,
  KeyboardSensor,
  DragOverlay
} from "@dnd-kit/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { moveCard, reorderWithinColumn } from "@/store/kanbanSlice";
import Column from "./Column";
import CardItem from "./CardItem";

// Icons
import { LuLink2 } from "react-icons/lu";
import Image from "next/image";
import { BsCalendar3 } from "react-icons/bs";
import { HiOutlineViewBoards } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoFunnelOutline } from "react-icons/io5";
import { FiChevronDown, FiUsers } from "react-icons/fi";
import { PiCirclesFour } from "react-icons/pi";

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const { cards, columns, columnOrder } = useSelector(
    (state: RootState) => state.kanban
  );

  

const sensors = useSensors(
  useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  useSensor(KeyboardSensor)
);

  const [activeId, setActiveId] = React.useState<string | null>(null);

  /**
   * Finds the column that contains a given card or column ID.
   */
  function findContainer(id: string) {
    const [prefix, itemId] = id.split(":");
    if (prefix === "card") {
      return (
        Object.keys(columns).find((colId) =>
          columns[colId].cardIds.includes(itemId)
        ) ?? null
      );
    }
    if (prefix === "column") return itemId;
    return null;
  }

  /** Handles drag start event */
  function handleDragStart(event: DragStartEvent) {
    if (event.active?.id) {
      setActiveId(String(event.active.id));
    }
  }

  /** Cancels drag action */
  function handleDragCancel() {
    setActiveId(null);
  }

  /** Handles drag end logic (reorder within column or move across columns) */
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeIdStr = String(active.id);
    let overIdStr = String(over.id);

    const activeCol = findContainer(activeIdStr);
    let overCol = findContainer(overIdStr);

    // If dropped into empty column space
    if (!overCol && overIdStr.startsWith("column:")) {
      overCol = overIdStr.split(":")[1];
    }

    if (!activeCol || !overCol) return;

    const activeCardId = activeIdStr.split(":")[1];

    // Case 1: Reorder within same column
    if (activeCol === overCol) {
      const col = columns[activeCol];
      const fromIndex = col.cardIds.indexOf(activeCardId);
      let toIndex = col.cardIds.indexOf(
        overIdStr.includes("card:") ? overIdStr.split(":")[1] : activeCardId
      );
      if (toIndex === -1) toIndex = col.cardIds.length - 1;
      dispatch(
        reorderWithinColumn({ colId: activeCol, fromIndex, toIndex })
      );
      return;
    }

    // Case 2: Move card between columns
    const destCol = columns[overCol];
    let toIndex = destCol.cardIds.length;
    if (overIdStr.startsWith("card:")) {
      const targetCardId = overIdStr.split(":")[1];
      toIndex = destCol.cardIds.indexOf(targetCardId);
      if (toIndex === -1) toIndex = destCol.cardIds.length;
    }

    dispatch(
      moveCard({
        cardId: activeCardId,
        fromColId: activeCol,
        toColId: overCol,
        toIndex
      })
    );
  }

  return (
    <div
      className="flex flex-col h-screen w-full px-4 sm:px-6 pt-4 sm:pt-6 bg-white"
      role="main"
    >
      {/* ------------------ HEADING ROW ------------------ */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
        aria-label="Project Header"
      >
        {/* Left: Title + icons */}
        <div className="flex items-center gap-3">
          <h1
            className="text-2xl sm:text-4xl font-semibold text-indigo-950"
            aria-label="Project Title"
          >
            Mobile App
          </h1>
          <GoPencil
            size="1.875rem"
            className="text-violet-700 bg-violet-200 p-1 rounded-md cursor-pointer"
            aria-label="Edit project title"
          />
          <LuLink2
            size="1.875rem"
            className="text-violet-700 bg-violet-200 p-1 rounded-md cursor-pointer"
            aria-label="Copy project link"
          />
        </div>

        {/* Right: Invite button + avatars */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            className="flex items-center gap-1 text-base font-medium text-violet-700"
            aria-label="Invite team members"
          >
            <FaRegSquarePlus
              size="1.125rem"
              className="text-violet-700 bg-violet-200 rounded-md"
            />
            Invite
          </button>
          <div className="flex -space-x-2">
            {[
              "https://i.pravatar.cc/150?img=31",
              "https://i.pravatar.cc/150?img=32",
              "https://i.pravatar.cc/150?img=33",
              "https://i.pravatar.cc/150?img=34"
            ].map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Team member ${idx + 1}`}
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
            ))}
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-500 text-sm font-medium border-2 border-white"
              aria-label="Additional team members"
            >
              +2
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ FILTER / VIEW ROW ------------------ */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6"
        aria-label="Toolbar"
      >
        {/* Filter + Date */}
        <div className="flex gap-2">
          <button
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm sm:text-base font-medium text-zinc-500 border rounded-md"
            aria-label="Filter tasks"
          >
            <IoFunnelOutline size="1rem" />
            Filter
            <FiChevronDown size="1rem" />
          </button>
          <button
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm sm:text-base font-medium text-zinc-500 border rounded-md"
            aria-label="Select date"
          >
            <BsCalendar3 size="1rem" />
            Today
            <FiChevronDown size="1rem" />
          </button>
        </div>

        {/* Share + View Toggles */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm sm:text-base font-medium text-zinc-500 border rounded-md"
            aria-label="Share project"
          >
            <FiUsers size="1rem" />
            Share
          </button>
          <span
            className="hidden sm:block h-[1.75rem] w-px bg-zinc-300"
            aria-hidden="true"
          />
          <button
            className="p-2 bg-violet-700 rounded-md text-white w-[2.5rem] h-[2.5rem]"
            aria-label="Board view"
          >
            <HiOutlineViewBoards size="1.2rem" />
          </button>
          <button
            className="p-2 text-zinc-500 rounded-md w-[2.5rem] h-[2.5rem]"
            aria-label="Grid view"
          >
            <PiCirclesFour size="1.3rem" />
          </button>
        </div>
      </div>

      {/* ------------------ KANBAN BOARD ------------------ */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div
          className="
           flex flex-col gap-4 pb-4 flex-wrap touch-pan-y
    sm:flex-row sm:gap-6 sm:overflow-x-auto
        "
          role="list"
          aria-label="Kanban Columns"
        >
          {columnOrder.map((colId) => {
            const col = columns[colId];
            return (
              <div key={colId} role="listitem"
              
              className="w-full sm:w-auto sm:min-w-[300px] flex-shrink">
                <Column
                  id={col.id}
                  title={col.title}
                  cardIds={col.cardIds}
                  cards={cards}
                />
              </div>
            );
          })}
        </div>

        {/* Drag Preview */}
        <DragOverlay>
          {activeId && activeId.startsWith("card:") && (
            <div style={{ width: 320 }}>
              <CardItem
                id={activeId.split(":")[1]}
                card={cards[activeId.split(":")[1]]}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

