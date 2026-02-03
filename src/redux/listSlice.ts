/**
 * listSlice — Redux slice for shopping lists and list items. Synced with JSON Server.
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ListItem {
  id: number;
  itemName: string;
  quantity: string;
  category: string;
  notes?: string;
  image?: string;
}

export interface ShoppingList {
  id: number;
  userId: number;
  name: string;
  dateAdded: string;
  category: string;
  items: ListItem[];
}

interface ListState {
  lists: ShoppingList[];
}

const initialState: ListState = { lists: [] };

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setLists: (state, action: PayloadAction<ShoppingList[]>) => {
      state.lists = action.payload;
    },
    addList: (state, action: PayloadAction<ShoppingList>) => {
      state.lists.push(action.payload);
    },
    deleteList: (state, action: PayloadAction<number>) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
    updateList: (state, action: PayloadAction<ShoppingList>) => {
      const index = state.lists.findIndex((list) => list.id === action.payload.id);
      if (index >= 0) state.lists[index] = action.payload;
    },
    addItem: (state, action: PayloadAction<{ listId: number; item: ListItem }>) => {
      const list = state.lists.find((l) => l.id === action.payload.listId);
      if (list) list.items.push(action.payload.item);
    },
    deleteItem: (state, action: PayloadAction<{ listId: number; itemId: number }>) => {
      const list = state.lists.find((l) => l.id === action.payload.listId);
      if (list) list.items = list.items.filter((i) => i.id !== action.payload.itemId);
    },
    updateItem: (state, action: PayloadAction<{ listId: number; item: ListItem }>) => {
      const list = state.lists.find((l) => l.id === action.payload.listId);
      if (list) {
        const idx = list.items.findIndex((i) => i.id === action.payload.item.id);
        if (idx >= 0) list.items[idx] = action.payload.item;
      }
    },
  },
});

export const { setLists, addList, deleteList, updateList, addItem, deleteItem, updateItem } =
  listSlice.actions;
export default listSlice.reducer;
