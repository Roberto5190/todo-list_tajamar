import React from 'react';
import useForm from '../../hooks/useForm'; 

export const FormularioTarea = ({ onAddTask, onEditTask, taskToEdit = null, isHiddenForms, setIsHiddenForms }) => {
    const { task, errors, isEditing, handleChange, handleSubmit, handleClear, handleCancel  } = useForm(taskToEdit, onAddTask, onEditTask, setIsHiddenForms);
   
    return (
        <form onSubmit={handleSubmit} className={`${isHiddenForms ? 'hidden' : ''} formulario-tarea mb-9 flex  flex-col gap-2 bg-gray-400 p-4 rounded-lg max-w-md`}>
            <h2 className='text-2xl font-bold text-left text-gray-900'>Agrega una tarea</h2>
            <div className="form-group bg-gray-300 self-start w-full text-left text-black border-1 border-gray-700 rounded-md p-2">
                <input 
                    type="text" 
                    name="titulo" 
                    value={task.titulo} 
                    onChange={handleChange} 
                    placeholder='Título' 
                    className={errors.titulo ? 'error' : ''}
                />
                {errors.titulo && <span className="error-message">{errors.titulo}</span>}
            </div>
            
            <div className="form-group bg-gray-300 self-start w-full text-left text-black border-1 border-gray-700 rounded-md p-2">
                <input 
                    type="text" 
                    name="descripcion" 
                    value={task.descripcion} 
                    onChange={handleChange} 
                    placeholder='Descripción' 
                    className={errors.descripcion ? 'error' : ''}
                />
                {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
            </div>
            
            <div className="button-group flex gap-2 self-end">
                <button type='button' onClick={handleClear} className="border-1 border-gray-700 text-black px-2 py-1 rounded-md">Limpiar</button>
                <button type='submit' className="bg-green-600 text-white px-2 py-1 rounded-md">{isEditing ? 'Guardar' : 'Agregar'}</button>
                <button type='button' onClick={handleCancel} className="bg-red-500 text-white px-2 py-1 rounded-md">Cancelar</button>
            </div>
        </form>
    );      
}
