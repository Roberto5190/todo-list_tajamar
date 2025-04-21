import { ListaTareas } from "./components/ListaTareas/ListaTareas";
import { FormularioTarea } from "./components/FormularioTarea/FormularioTarea";
import useTask from "./hooks/useTask";
import { Icon } from "@iconify/react/dist/iconify.js";


export default function App() {
  const { 
    isEditing,
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
  } = useTask()
  
  const taskLength = tasks.length
  console.log(taskLength);
  
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="md:mb-[-32px] mb-4 mb:text-8xl text-6xl font-bold text-[#191919] font_bitter ">To Do List</h1>

      {/* TASKS TITLE */}
      <div className="flex justify-between items-start max-w-[1024px] w-full mb-[-14px] px-8">
        <h3 className="font_bitter text-2xl font-bold text-[#2F1D7B] bg-[#fde4b7] px-6 py-4 rounded-2xl ">{'Tareas: ' + taskLength}</h3>
        <button
        onClick={() => handleHiddenForm()}
        className={`bg-[#FAA60F] text-[#2F1D7B] p-0.5 border-2 drop-shadow-xl border-amber-300 rounded-lg ${ !isHiddenForms ? 'hidden' : ''} cursor-pointer`}
      >
        <Icon icon="proicons:add" width={32} height={32} />
      </button>
      </div>
      


      <FormularioTarea
        isHiddenForms={isHiddenForms}
        setIsHiddenForms={setIsHiddenForms}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        taskToEdit={taskToEdit}
        isEditing={isEditing}
      />
      <ListaTareas
        tasks={tasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
