
// eslint-disable-next-line react/prop-types
function NoteCard({id, title, description, tag, onDelete, onEdit, onPin, isPinned, onShare}) {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de eliminar esta nota?')) {
      onDelete(id);
    }
  }
  
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white relative">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
        #{tag}
      </span>
    </div>
    <div className="absolute top-2 right-2 flex space-x-2">
      <button onClick={onEdit} className="text-yellow-500 hover:text-yellow-600">✏️</button>
      <button onClick={handleDelete} className="text-red-500 hover:text-red-600">🗑️</button>
      <button onClick={onPin} className="text-blue-500 hover:text-blue-600">
      {isPinned ? '📍': '📌'}
      </button>
      <button onClick={() => onShare(id)} className="text-green-500 hover:text-green-600">🔗</button>
    </div>
  </div>
  )
}

export default NoteCard;