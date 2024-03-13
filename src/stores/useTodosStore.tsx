import { create } from "zustand";
import { Todo } from "../types/index";

type State = {
  isAddFormOpen: boolean;
  isEditFormOpen: boolean;
  todos: Todo[];
  filtred: string;
};
type Actions = {
  setIsAddFormOpen: () => void;
  setIsEditFormOpen: () => void;
  setFiltred: (value: string) => void;
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (todoId: number) => void;
  editTodo: (todoId: number, updatedTodo: Todo) => void;
};

export const useTododsStore = create<State & Actions>()((set) => ({
  isAddFormOpen: false,
  isEditFormOpen: false,
  setIsAddFormOpen: () =>
    set((state) => ({ isAddFormOpen: !state.isAddFormOpen })),
  setIsEditFormOpen: () =>
    set((state) => ({ isEditFormOpen: !state.isEditFormOpen })),
  todos: localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos") as string)
    : [],
  filtred: "all",
  setFiltred: (value) => set(() => ({ filtred: value })),
  addTodo: (newTodo) => set((state) => ({ todos: [...state.todos, newTodo] })),
  deleteTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    })),
  editTodo: (todoId, updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, ...updatedTodo } : todo
      ),
    })),
}));
