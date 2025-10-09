import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";


interface Item {
  id: number;
  name: string;
  quantity: string;
  category: string;
}

interface ShoppingList {
  id: number;
  name: string;
  items: Item[];
}

interface ListState {
  lists: ShoppingList[];
}

const initialState: ListState = {
  lists: [],
};

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
    updateList: (state, action: PayloadAction<ShoppingList>) => {
      const index = state.lists.findIndex(l => l.id === action.payload.id);
      if (index !== -1) state.lists[index] = action.payload;
    },
    deleteList: (state, action: PayloadAction<number>) => {
      state.lists = state.lists.filter(l => l.id !== action.payload);
    },
  },
});

export const { setLists, addList, updateList, deleteList } = listSlice.actions;
export default listSlice.reducer;
