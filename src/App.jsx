import { useState } from "react";
import "./App.css";
import { ListaTareas } from "./components/ListaTareas/ListaTareas";
import { FormularioTarea } from "./components/FormularioTarea/FormularioTarea";
import db from "./db/db.json";

export default function App() {
  const [tasks, setTasks] = useState(db);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isHiddenForms, setIsHiddenForms] = useState(true);

  const handleDelete = (id) => {
    const nuevasTareas = tasks.filter(task => task.id !== id) // Filtramos la tarea por ID
    setTasks(nuevasTareas) // Actualizamos el estado con las nuevas tareas
  }

  const handleEdit = (id) => {
    const tareaEditada = tasks.find(task => task.id === id);
    setTaskToEdit(tareaEditada);
  }

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  }

  const handleEditTask = (updatedTask) => { 
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  }

  const handleDeleteTask = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  }

  const handleHiddenForm = () => {
    setIsHiddenForms(!isHiddenForms);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="mb-10 text-4xl font-bold text-purple-500">To Do List</h1>
      <button onClick={() => handleHiddenForm()} className="bg-purple-500 text-white px-4 py-2 rounded-md">+</button>
      <FormularioTarea
        isHiddenForms={isHiddenForms}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        taskToEdit={taskToEdit}
      />
      <ListaTareas tasks={tasks} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}


