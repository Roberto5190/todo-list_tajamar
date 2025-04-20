import { useEffect, useState } from "react";
import "./App.css";
import { ListaTareas } from "./components/ListaTareas/ListaTareas";
import { FormularioTarea } from "./components/FormularioTarea/FormularioTarea";
// import db from "./db/db.json";

export default function App() {
  const initialTasks = () => {
    const localStorageTasks = localStorage.getItem("tasks");
    return localStorageTasks ? JSON.parse(localStorageTasks) : []; //si hay elementos en el carrito loss converitmos a string si no lo dejamos vacio
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isHiddenForms, setIsHiddenForms] = useState(true);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id) => {
    const nuevasTareas = tasks.filter((task) => task.id !== id); // Filtramos la tarea por ID
    setTasks(nuevasTareas); // Actualizamos el estado con las nuevas tareas
  };

  const handleEdit = (id) => {
    const tareaEditada = tasks.find((task) => task.id === id);
    setTaskToEdit(tareaEditada);
  };

  const handleAddTask = (newTask) => {
    const createTaskId = {
      ...newTask,
      id: Date.now()
    }
    setTasks([...tasks, createTaskId]);
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      const restoTareas = tasks.filter((task) => task.id !== id)
      setTasks(restoTareas);
    }
  };

  const handleHiddenForm = () => {
    setIsHiddenForms(!isHiddenForms);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="mb-10 text-4xl font-bold text-purple-500 ">To Do List</h1>
      <button
        onClick={() => handleHiddenForm()}
        className={`bg-purple-500 text-white rounded-lg ${ !isHiddenForms ? 'hidden' : ''}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={36}
          height={36}
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          >
            <path d="M12 8.5v7M8.5 12h7"></path>
            <rect width={16.5} height={16.5} x={3.75} y={3.75} rx={4}></rect>
          </g>
        </svg>
      </button>


      <FormularioTarea
        isHiddenForms={isHiddenForms}
        setIsHiddenForms={setIsHiddenForms}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        taskToEdit={taskToEdit}
      />
      <ListaTareas
        tasks={tasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
