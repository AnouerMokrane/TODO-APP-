import React, { useEffect } from "react";
import AddForm from "./components/AddForm";
import TodoItem from "./components/TodoItem";
import { useTododsStore } from "./stores/useTodosStore";

const App = () => {
  const { setIsAddFormOpen, isAddFormOpen, todos, filtred, setFiltred } =
    useTododsStore();
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = React.useMemo(() => {
    switch (filtred) {
      case "all":
        return todos;
      case "incompleted":
        return todos.filter((todo) => todo.status === "incompleted");
      case "completed":
        return todos.filter((todo) => todo.status === "completed");
      default:
        return todos;
    }
  }, [todos, filtred]);
  return (
    <div className="flex justify-center items-center flex-col w-11/12 max-w-xl mx-auto">
      <h1 className="text-[40px] font-bold text-gray-500 m-8">TODO LIST</h1>
      <div className="w-full flex justify-between">
        <button
          className="p-3 bg-purple-500 text-white font-medium rounded-xl"
          onClick={setIsAddFormOpen}
        >
          Add Task
        </button>
        <select
          className="p-3 bg-gray-300 text-gray-600 rounded-lg font-medium"
          onChange={(e) => setFiltred(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incompleted">Incompleted</option>
        </select>
      </div>

      <div className="w-full flex flex-col gap-2 bg-gray-100 mt-6 p-6 rounded-lg overflow-hidden">
        {filteredTodos.length === 0 && (
          <span className="mx-auto p-2  bg-gray-200 text-gray-600 font-medium rounded-lg">
            No items
          </span>
        )}
        {todos.length > 0
          ? filteredTodos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo.status === filtred ? todo : todo}
                />
              );
            })
          : null}
      </div>
      {isAddFormOpen && <AddForm />}
    </div>
  );
};

export default App;
