import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useTododsStore } from "../stores/useTodosStore";
import { useForm } from "react-hook-form";
import { FormInputs } from "../types/index";

const AddForm = () => {
  const { setIsAddFormOpen, addTodo } = useTododsStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = (values: FormInputs) => {
    addTodo({
      id: Date.now(),
      title: values.title,
      status: values.status,
    });
  };
  return (
    <motion.div className="w-full flex justify-center items-center absolute inset-0 bg-black/25">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-[#ecedf6] p-6 rounded-md w-11/12 max-w-[370px]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-500 mb-6">Add TODO</h2>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-gray-500">
              Title
            </label>
            <input
              type="text"
              className="p-2 rounded-md"
              {...register("title", { required: "This is required." })}
            />
            <p className="text-xs text-red-500">{errors.title?.message} </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-gray-500">
              Status
            </label>
            <select
              className="p-2 bg-white rounded-lg"
              {...register("status", { required: true })}
            >
              <option value="incompleted">Incompleted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="mt-8 space-x-4">
          <button
            type="submit"
            className="py-2 px-5 bg-purple-500 text-white font-medium rounded-md"
          >
            Add Task
          </button>
          <button
            type="button"
            className="py-2 px-5 bg-gray-500 text-white font-medium rounded-md"
            onClick={setIsAddFormOpen}
          >
            Cancel
          </button>
        </div>
        <motion.button
          type="button"
          className="absolute p-1 -top-11 right-1 bg-gray-50 rounded-sm hover:bg-red-600"
          initial={{ opacity: 0, translateY: 50, rotate: 270 }}
          animate={{ opacity: 1, translateY: 0, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={setIsAddFormOpen}
        >
          <IoMdClose className="w-6 h-6  text-gray-400 hover:text-white" />
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddForm;
