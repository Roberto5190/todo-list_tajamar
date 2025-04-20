import { Tarea } from "../Tarea/Tarea";


export const ListaTareas = ({tasks, handleDelete, handleEdit}) => {




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task, index) => (
        <Tarea key={index} task={task} handleDelete={handleDelete} handleEdit={handleEdit} />
      ))}
    </div>
  );
};
