import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const NoteForm = ({ isOpen, onClose, existingTags, addTag, saveNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [errors, setErrors] = useState({});

    if (!isOpen) return null

    //validate title is not empty
    const validateForm = () => {
        const newErros = {}
        if (!title.trim()) {
            newErros.title = 'El título no puede estar vacío';
        }
        if (!tag.trim()) {
            newErros.tag = 'La etiqueta no puede estar vacía';
        }
        setErrors(newErros);
        return Object.keys(newErros).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // eslint-disable-next-line react/prop-types
            if (!existingTags.includes(tag)) {
                addTag(tag)
            }
            saveNote({
                title,
                description,
                tag,
            })
            setTitle('')
            setDescription('')
            setTag('')
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Agregar Nota</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Título
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''
                                }`}
                            placeholder="Título de la nota"
                        />
                        {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Descripción (Opcional)
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Descripción de la nota"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag">
                            Etiqueta
                        </label>
                        <input
                            id="tag"
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.tag ? 'border-red-500' : ''
                                }`}
                            placeholder="Etiqueta de la nota"
                        />
                        {errors.tag && <p className="text-red-500 text-xs italic">{errors.tag}</p>}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NoteForm;