import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import { useTododsStore } from "../stores/useTodosStore";
import EditForm from "./EditForm";
import { Todo, StatusEnum } from "../types/index";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} , ${currentDate.toLocaleDateString()}`;
  const { deleteTodo, editTodo, setIsEditFormOpen, isEditFormOpen } =
    useTododsStore();

  return (
    <motion.div
      className={`flex items-center bg-white p-4 rounded-lg `}
      initial={{ translateX: -570 }}
      animate={{ translateX: [0, 15, 0] }}
      transition={{ duration: 0.4 }}
    >
      <input
        type="checkbox"
        id="status"
        className="w-8 h-8 mr-4"
        checked={todo.status === "completed"}
        onChange={() => {
          editTodo(todo.id, {
            ...todo,
            status:
              todo.status === StatusEnum.completed
                ? StatusEnum.incompleted
                : StatusEnum.completed,
          });
        }}
      />
      <div className=" space-y-1">
        <h3
          className={`text-sm text-gray-700 font-medium ${
            todo.status === "completed" ? "line-through text-gray-300" : ""
          }`}
        >
          {todo.title}{" "}
        </h3>
        <p className="text-xs text-gray-500">{formattedDate} </p>
      </div>
      <div className="ms-auto space-x-2">
        <button
          type="button"
          className=" p-2 bg-gray-300 rounded-md duration-300 hover:bg-gray-200"
          onClick={() => deleteTodo(todo.id)}
        >
          <MdDelete className="text-xl text-gray-800" />
        </button>
        <button
          type="button"
          className=" p-2 bg-gray-300 rounded-md duration-300 hover:bg-gray-200"
          onClick={() => {
            setIsEditFormOpen();
          }}
        >
          <MdEdit className="text-xl text-gray-800" />
        </button>
      </div>
      {isEditFormOpen && <EditForm todo={todo} />}
    </motion.div>
  );
};

export default TodoItem;
