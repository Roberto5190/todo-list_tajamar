import React, { useState } from 'react';

export const FormularioTarea = ({ onAddTask, onEditTask, onDeleteTask, taskToEdit = null }) => {
    const [task, setTask] = useState({
        titulo: '',
        descripcion: '',
        completada: false
    });
    
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    // Actualizar el estado cuando se recibe una tarea para editar
    React.useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
            setIsEditing(true);
        }
    }, [taskToEdit]);

    const validateForm = () => {
        const newErrors = {};
        if (!task.titulo.trim()) {
            newErrors.titulo = 'El título es obligatorio';
        }
        if (!task.descripcion.trim()) {
            newErrors.descripcion = 'La descripción es obligatoria';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask({
            ...task,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Limpiar error cuando el usuario comienza a escribir
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };
    
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

    const resetForm = () => {
        setTask({
            titulo: '',
            descripcion: '',
            completada: false
        });
        setErrors({});
        setIsEditing(false);
    };

    const handleClear = () => {
        resetForm();
    };   

    const handleCancel = () => {
        resetForm();
    };

    const handleEdit = () => {
        if (!task.titulo || !task.descripcion) {
            setErrors({
                titulo: !task.titulo ? 'El título es obligatorio' : '',
                descripcion: !task.descripcion ? 'La descripción es obligatoria' : ''
            });
            return;
        }
        
        onEditTask(task);
        resetForm();
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            onDeleteTask(task.id);
            resetForm();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="formulario-tarea">
            <div className="form-group">
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
            
            <div className="form-group">
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
            
            <div className="button-group">
                <button type='submit'>{isEditing ? 'Guardar' : 'Agregar'}</button>
                <button type='button' onClick={handleClear}>Limpiar</button>
                <button type='button' onClick={handleCancel}>Cancelar</button>
            </div>
        </form>
    );      
}
