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
          console.log(data.data)
          setArchivedNotes(data.data);
          setShowArchivedNotes(true); 
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
  }

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false)
    window.location.href = '/login'
  }

  const handleDeleteNote = async (id) => {
    setPinnedNotes(pinnedNotes.filter(note => note.id !== id))
    setRecentNotes(recentNotes.filter(note => note.id !== id))
    setArchivedNotes(archivedNotes.filter(note => note.id !== id))
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/note/change_status/${user_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, status: 0 }),
      });
  
      if (response.ok) {
          const noteToPin = recentNotes.find(note => note.id === id);
          setPinnedNotes(prevPinnedNotes => [...prevPinnedNotes, noteToPin]);
          setRecentNotes(prevRecentNotes => prevRecentNotes.filter(note => note.id !== id));
      } else {
        console.error('Error al fijar la nota');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }

  }

  const handlePinNote = async (id) => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/note/change_status/${user_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, status: 2 }),
      });
  
      if (response.ok) {
          const noteToPin = recentNotes.find(note => note.id === id);
          setPinnedNotes(prevPinnedNotes => [...prevPinnedNotes, noteToPin]);
          setRecentNotes(prevRecentNotes => prevRecentNotes.filter(note => note.id !== id));
      } else {
        console.error('Error al fijar la nota');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  const handleEditNote = async (note) => {
    setNoteToEdit(note)
    setNoteFormOpen(true)
  }

  const handleArchiveNote = async (id, isArchived) => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const newStatus = isArchived ? 1 : 3; // 1 = Activa/Desarchivada, 3 = Archivada
    console.log(user_id)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/note/change_status/${user_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, status: newStatus }),
      });
  
      if (response.ok) {
        if (isArchived) {
          setRecentNotes(prevRecentNotes => [
            ...prevRecentNotes,
            ...archivedNotes.filter(note => note.id === id)
          ]);
          setArchivedNotes(prevArchivedNotes => 
            prevArchivedNotes.filter(note => note.id !== id)
          );
        } else {
          setArchivedNotes(prevArchivedNotes => [
            ...prevArchivedNotes,
            ...pinnedNotes.filter(note => note.id === id),
            ...recentNotes.filter(note => note.id === id)
          ]);
          setPinnedNotes(prevPinnedNotes => prevPinnedNotes.filter(note => note.id !== id));
          setRecentNotes(prevRecentNotes => prevRecentNotes.filter(note => note.id !== id));
        }
      } else {
        console.error('Error al cambiar el estado de la nota');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }
  
  const handleSaveNote = async (note) => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/note/update/${user_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: note.title, description: note.description, id: note.id }),
      });
    }catch (error) {
      console.error('Error en la solicitud:', error);
    }
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
                <NoteList notes={archivedNotes} onDelete={handleDeleteNote} onPin={handlePinNote} onShare={handleShareNote} onEdit={handleEditNote} onArchive={handleArchiveNote}/>
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
                <NoteList notes={pinnedNotes} onDelete={handleDeleteNote} onPin={handlePinNote} onShare={handleShareNote} onEdit={handleEditNote} onArchive={handleArchiveNote}/>
                <h2 className="text-2xl font-bold mb-4 mt-8">Notas Recientes</h2>
                <NoteList notes={recentNotes} onDelete={handleDeleteNote} onPin={handlePinNote} onShare={handleShareNote} onEdit={handleEditNote} onArchive={handleArchiveNote}/>
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