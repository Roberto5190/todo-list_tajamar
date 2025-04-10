import React from "react";


export const Tarea = ({task, handleDelete, handleEdit}) => {

  return (
    <div className="bg-gray-200 min-w-[200px] shadow-md rounded-lg p-4 text-left text-black">
      <h2 className="text-lg font-bold">{task.titulo}</h2>
      <p className="text-sm">{task.descripcion}</p>
      <div className="flex gap-4 justify-between">
        <label className="flex items-center gap-2">
            <input type="checkbox" name="completada" id="completada" value={task.completada} />
            <span className="text-sm">Terminado</span>
        </label>
        <div className="flex gap-4 text-sm">
            <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={ () => handleDelete(task.id)}>Eliminar</button>
            <button className="bg-purple-500 text-white px-2 py-1 rounded-md"  onClick={ () => handleEdit(task.id)}>Editar</button>
        </div>

      </div>
    </div>
  );
};
