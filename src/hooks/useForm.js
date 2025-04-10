import React, { useState, useEffect } from "react";

const useForm = (taskToEdit, onAddTask, onEditTask, setIsHiddenForms) => {
  const [task, setTask] = useState({
    titulo: "",
    descripcion: "",
    completada: false,
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  //USE EFFECT
  // Actualizar el estado cuando se recibe una tarea para editar
  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
      setIsEditing(true);
    }
  }, [taskToEdit]);

//VALIDATE FORM
  const validateForm = () => {
    const newErrors = {};
    if (!task.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio";
    }
    if (!task.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

//HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };


//SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditing) {
      onEditTask(task);
    } else {
      onAddTask(task);
    }

    resetForm();
  };

//RESET FORM
  const resetForm = () => {
    setTask({
      titulo: "",
      descripcion: "",
      completada: false,
    });
    setErrors({});
    setIsEditing(false);
  };

  //CLEAR FORM
  const handleClear = () => {
    resetForm();
  };

  //CANCEL FORM
  const handleCancel = () => {
    setIsHiddenForms((prevState) => !prevState);
    resetForm();
  };

  return {
    task,
    errors,
    isEditing,
    setIsHiddenForms,
    handleChange,
    handleSubmit,
    handleClear,
    handleCancel,
  };
};

export default useForm;
