import types from 'prop-types';

//local imports 
import NoteCard from "./NoteCard";

const NoteList = ({notes}) => {
    if (notes.length === 0) {
        return <p className="text-center text-gray-500 mt-10">No hay notas disponibles.</p>;
      }
    
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-8">
          {notes.map((note) => (
            <NoteCard key={note.id} title={note.title} description={note.description} tag={note.tag} />
          ))}
        </div>
      )
}

NoteList.propTypes = {
    notes: types.array.isRequired
}
export default NoteList;
