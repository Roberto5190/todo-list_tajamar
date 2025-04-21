import React from "react";
import useForm from "../../hooks/useForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'


export const FormularioTarea = ({
  onAddTask,
  onEditTask,
  taskToEdit = null,
  isHiddenForms,
  setIsHiddenForms,
}) => {

  const {
    task,
    errors,
    isEditing,
    handleChange,
    handleSubmit,
    handleClear,
    handleCancel,
  } = useForm(taskToEdit, onAddTask, onEditTask, setIsHiddenForms);

  useGSAP(() => {
    gsap.from('.task-form', 
        {
            scale: 0,
            opacity: 0,
            duration: 2
        }
    )
  })


  return (
    <>
      <div
        className={`${
          isHiddenForms ? "hidden" : ""
        } fixed inset-0 bg-black/40 z-20 backdrop-blur-xs`}
      />
      <form
        onSubmit={handleSubmit}
        className={`${isHiddenForms ? "hidden" : ""} task-form max-w-[450px] w-full
                formulario-tarea mb-9 flex  flex-col gap-4 p-4 rounded-lg  bg-purple-300/25 shadow-2xl backdrop-blur-sm border-2 border-purple-200`}
      >
        <div className="form_top flex justify-between items-center">
          <h2 className="text-2xl font-bold text-left text-purple-200">
            {isEditing ? "Editar tarea" : "Agregar tarea"}
          </h2>

          <button type="button" onClick={handleCancel} className=" text-purple-200 rounded-md cursor-pointer">
            <Icon icon="proicons:cancel-square" width="24" height="24"/>
          </button>
        </div>

        <div className="form-group bg-gray-300 self-start w-full text-left text-black border-1 border-gray-700 rounded-md p-2">
          <input
            type="text"
            name="titulo"
            value={task.titulo}
            onChange={handleChange}
            placeholder="Título"
            className={errors.titulo ? "error" : ""}
          />
          {errors.titulo && (
            <span className="error-message">{errors.titulo}</span>
          )}
        </div>

        <div className="form-group bg-gray-300 self-start w-full text-left text-black border-1 border-gray-700 rounded-md p-2">
          <input
            type="text"
            name="descripcion"
            value={task.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className={errors.descripcion ? "error" : ""}
          />
          {errors.descripcion && (
            <span className="error-message">{errors.descripcion}</span>
          )}
        </div>

        <div className="button-group flex gap-2 self-end">
          <button
            type="button"
            onClick={handleClear}
            className="border-1 border-gray-700 text-white px-4 py-1 rounded-md cursor-pointer"
          >
            Limpiar
          </button>
          <button
            type="submit"
            className="bg-purple-700 border-2 border-purple-300 text-white px-4 py-1 rounded-md cursor-pointer"
          >
            {isEditing ? "Guardar" : "Agregar"}
          </button>
        </div>
      </form>
    </>
  );
};
