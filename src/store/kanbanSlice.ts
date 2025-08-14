import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Card = { id: string; title: string; meta?: string ; priority?: string; comments?:[];files?:[]};
export type Column = { id: string; title: string; cardIds: string[] };

export interface KanbanState {
  cards: Record<string, Card>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

const initialState: KanbanState = {
  cards: {
    "c-1": { id: "c-1", title: "Brainstorming", priority:"High", comments:[], meta:"Brainstorming brings team members' diverse experience into play." },
    "c-2": { id: "c-2", title: "Research", priority:"High", meta:"User research helps you to create an optimal product for users." },
    "c-3": { id: "c-3", title: "Wireframes" ,priority:"Medium", meta:"Low fidelity wireframes include the most basic content and visuals" },
    "c-4": { id: "c-4", title: "Design System", priority:"Low", meta:"It just needs to adapt the UI from what you did before " }
  },
  columns: {
    todo: { id: "todo", title: "To do", cardIds: ["c-1", "c-2"] },
    inprogress: { id: "inprogress", title: "In progress", cardIds: ["c-3"] },
    done: { id: "done", title: "Done", cardIds: ["c-4"] }
  },
  columnOrder: ["todo", "inprogress", "done"]
};

interface MoveCardPayload {
  cardId: string;
  fromColId: string;
  toColId: string;
  toIndex: number;
}

interface ReorderPayload {
  colId: string;
  fromIndex: number;
  toIndex: number;
}

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    moveCard: (state, { payload }: PayloadAction<MoveCardPayload>) => {
      const { cardId, fromColId, toColId, toIndex } = payload;
      state.columns[fromColId].cardIds = state.columns[fromColId].cardIds.filter(id => id !== cardId);
      state.columns[toColId].cardIds.splice(toIndex, 0, cardId);
    },
    reorderWithinColumn: (state, { payload }: PayloadAction<ReorderPayload>) => {
      const { colId, fromIndex, toIndex } = payload;
      const ids = state.columns[colId].cardIds;
      const [moved] = ids.splice(fromIndex, 1);
      ids.splice(toIndex, 0, moved);
    },
    reset: () => initialState
  }
});

export const { moveCard, reorderWithinColumn, reset } = kanbanSlice.actions;
export default kanbanSlice.reducer;
