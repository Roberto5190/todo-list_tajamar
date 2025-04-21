import { useState, useEffect } from "react";
import useForm from "./useForm";


const useTask = () => {
  const { isEditing, setIsEditing } = useForm();

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
    setIsHiddenForms(!isHiddenForms);
    setIsEditing(true);
  };

  const handleAddTask = (newTask) => {
    const createTaskId = {
      ...newTask,
      id: Date.now(),
    };
    setTasks([...tasks, createTaskId]);
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      const restoTareas = tasks.filter((task) => task.id !== id);
      setTasks(restoTareas);
    }
  };

  const handleHiddenForm = () => {
    setIsHiddenForms(!isHiddenForms);
    useGSAP(() => {
        gsap.from('.task-form', 
            {
                scale: 0,
                opacity: 0,
                duration: 2
            }
        )
      })
  };





  return {
    isEditing,
    setIsEditing,
    tasks,
    taskToEdit,
    isHiddenForms,
    setIsHiddenForms,
    handleDelete,
    handleEdit,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleHiddenForm
  }
};

 export default useTask;