import { Tarea } from "../Tarea/Tarea";
import { useState } from "react";


export const ListaTareas = ({tasks, handleDelete, handleEdit}) => {




  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <Tarea key={task.id} task={task} handleDelete={handleDelete} handleEdit={handleEdit} />
      ))}
    </div>
  );
};
