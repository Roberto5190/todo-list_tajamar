import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Tarea } from "../Tarea/Tarea";

export const ListaTareas = ({ tasks, handleDelete, handleEdit }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Dentro de este callback sólo va la lógica de animación
      const taskItems = gsap.utils.toArray(".task-item")
      console.log(taskItems);
      
      taskItems.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 1,
          delay: i * 0.3
        });
      });
    },
    {
      scope: containerRef,       // <— ámbito para los selectores     // <— vuelve a ejecutarse al cambiar `tasks`
      revertOnUpdate: true,      // <— limpia animaciones previas antes de reenlazar
    }
  );

  ;
  

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:p-16 md:p-8 p-4  lg:rounded-4xl md:rounded-3xl rounded-2xl bg-[#fde4b7] w-full  min-h-[500px]"
    >
      {tasks.map((task) => (
        <Tarea
          key={task.id}
          task={task}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          className="task-item task_hover"    // <— coincide con tu selector
        />
      ))}
    </div>
  );
};
