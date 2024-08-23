/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"

// Local imports
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import NoteList from "../components/NoteList"
import ShareModal from "../components/ShaderModal"
import NoteEdit from "../components/NoteEdit"

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isShareModalOpen, setShareModalOpen] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [isNoteFormOpen, setNoteFormOpen] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(null)
  const [pinnedNotes, setPinnedNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])
  const [recentNotes, setRecentNotes] = useState([])
  const [showArchivedNotes, setShowArchivedNotes] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotes(1); // Cargar notas fijadas y recientes
    }
  }, [isLoggedIn]);

  const fetchNotes = async (action) => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/note/${action}/${user_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (action === 1) {
          setPinnedNotes(data.data.pinned);
          setRecentNotes(data.data.recent);
        } else if (action === 2) {
          setArchivedNotes(data.data);
          setShowArchivedNotes(true); // Mostrar notas archivadas
        }
      } else if(response.status === 202){
        console.log("No tiene notas")
      }else {
        console.error('Error al cargar las notas');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  const handleShowArchivedNotes = () => {
    fetchNotes(2)
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false)
    window.location.href = '/login'
  }

  const handleDeleteNote = (id) => {
    setPinnedNotes(pinnedNotes.filter(note => note.id !== id))
    setRecentNotes(recentNotes.filter(note => note.id !== id))
    setArchivedNotes(archivedNotes.filter(note => note.id !== id))
  }

  const handlePinNote = (id) => {
    // Implementar la lógica para fijar y des-fijar notas
  }

  const handleEditNote = (note) => {
    setNoteToEdit(note)
    setNoteFormOpen(true)
  }

  
  const handleSaveNote = (updatedNote) => {
    // Implementar la lógica para guardar la nota editada
    setNoteFormOpen(false)
    setNoteToEdit(null)
  }

  const handleShareNote = (id) => {
    setSelectedNoteId(id)
    setShareModalOpen(true)
  }

  const handleShareWithUser = (user) => {
    alert(`Compartiste la nota con el ID: ${selectedNoteId} con ${user}`)
    setShareModalOpen(false)
  }

  const handleShowPinnedAndRecentNotes = () => {
    setShowArchivedNotes(false);
    fetchNotes(1); 
  };

  return (
    <div className="h-screen flex bg-slate-50">
      <aside className="w-1/5 p-2 g-10 bg-slate-400 text-white">
        <Sidebar isLoggedIn={isLoggedIn} onShowArchivedNotes={handleShowArchivedNotes} />
      </aside>
      <main className="w-full bg-slate-200 overflow-auto">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} userName={localStorage.getItem("user")} />
        {isLoggedIn ? (
          <div className="p-4">
             {showArchivedNotes ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Notas Archivadas</h2>
                <NoteList notes={archivedNotes} onDelete={handleDeleteNote} onPin={handlePinNote} onShare={handleShareNote} onEdit={handleEditNote}/>
                <button
                  onClick={handleShowPinnedAndRecentNotes}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  Volver a Notas Fijadas y Recientes
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Notas Fijadas</h2>
                <NoteList notes={pinnedNotes} onDelete={handleDeleteNote} onPin={handlePinNote} onShare={handleShareNote} onEdit={handleEditNote}/>
                <h2 className="text-2xl font-bold mb-4 mt-8">Notas Recientes</h2>
                <NoteList notes={recentNotes} onDelete={handleDeleteNote} onPin={handlePinNote} onShare={handleShareNote} onEdit={handleEditNote}/>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-4xl font-bold text-gray-700">NoteCraft</h1>
          </div>
        )}
        {isShareModalOpen && (
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setShareModalOpen(false)}
            onShare={handleShareWithUser}
          />
        )}
        {isNoteFormOpen && (
          <NoteEdit
            isOpen={isNoteFormOpen}
            onClose={() => setNoteFormOpen(false)}
            saveNote={handleSaveNote}
            noteToEdit={noteToEdit}
          />
        )}
      </main>
    </div>
  )
}

export default Home