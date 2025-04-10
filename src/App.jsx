import { useState } from "react";
import "./App.css";
import { ListaTareas } from "./components/ListaTareas/ListaTareas";
import { FormularioTarea } from "./components/FormularioTarea/FormularioTarea";
import db from "./db/db.json";

function App() {
  const [tasks, setTasks] = useState(db);
  const [taskToEdit, setTaskToEdit] = useState(null);

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

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  }



  return (
    <>
      <h1 className="mb-10 text-4xl font-bold text-purple-500">To Do List</h1>
      <ListaTareas tasks={tasks} handleDelete={handleDelete} handleEdit={handleEdit} />
      <FormularioTarea
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        taskToEdit={taskToEdit}
      />
    </>
  );
}

export default App;
