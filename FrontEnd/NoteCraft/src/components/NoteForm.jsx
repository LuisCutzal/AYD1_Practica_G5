import { useState } from 'react'
import propTypes from 'prop-types'

const NoteForm = ({ isOpen, onClose, existingTags, saveNote }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tag, setTag] = useState('')
    const [newTag, setNewTag] = useState('')
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}
        if (!title.trim()) {
            newErrors.title = 'El título no puede estar vacío'
        }
        if (!tag.trim() && !newTag.trim()) {
            newErrors.tag = 'Debes seleccionar o crear una etiqueta'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {
            const finalTag = newTag.trim() ? newTag : tag
            const payload = {
                title,
                description,
                id_user: localStorage.getItem('user_id'),
                id_label: existingTags.includes(finalTag) ? existingTags.indexOf(finalTag) + 1 : null,
                label: newTag.trim() ? newTag : null,
            }

            // get token from local storage
            const token = localStorage.getItem('token')

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/note`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                })

                if (response.ok) {
                    const data = await response.json()
                    alert('Nota registrada correctamente')
                    saveNote({
                        id: data.data[0].id,
                        title: data.data[0].title,
                        description: data.data[0].description,
                        tag: finalTag
                    })
                } else {
                    alert('Error al registrar la nota')
                }
            } catch (error) {
                console.error('Error:', error)
                alert('Error en la solicitud')
            }

            setTitle('')
            setDescription('')
            setTag('')
            setNewTag('')
            onClose()
        }
    }

    if (!isOpen) return null

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
                        <select
                            id="tag"
                            value={tag}
                            onChange={(e) => {
                                setTag(e.target.value)
                                if (e.target.value) {
                                    setNewTag('')
                                }
                            }}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.tag ? 'border-red-500' : ''}`}
                        >
                            <option value="">Seleccionar etiqueta...</option>
                            {existingTags.map((tagOption) => (
                                <option key={tagOption} value={tagOption}>
                                    {tagOption}
                                </option>
                            ))}
                        </select>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newTag">
                                O crear nueva etiqueta
                            </label>
                            <input
                                id="newTag"
                                type="text"
                                value={newTag}
                                onChange={(e) => {
                                    setNewTag(e.target.value)
                                    if (e.target.value.trim()) {
                                        setTag('')
                                    }
                                }}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.tag ? 'border-red-500' : ''}`}
                                placeholder="Nueva etiqueta"
                                disabled={!!tag}
                            />
                        </div>
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
    )
}

NoteForm.propTypes = {
    isOpen: propTypes.bool.isRequired,
    onClose: propTypes.func.isRequired,
    existingTags: propTypes.arrayOf(propTypes.string).isRequired,
    addTag: propTypes.func.isRequired,
    saveNote: propTypes.func.isRequired
}

export default NoteForm