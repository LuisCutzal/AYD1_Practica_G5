import { useState } from "react"

//local imports
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import NoteList from "../components/NoteList"
import NoteForm from "../components/NoteForm"

function Home() {
  const [view, setView] = useState('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(null)

  //example of notes to be displayed
  const [notes, setNotes] = useState([
    { id: 1, title: 'Nota 1', description: 'Descripción de la nota 1', tag: 'Trabajo' },
    { id: 2, title: 'Nota 2', description: 'Descripción de la nota 2', tag: 'Personal' },
    { id: 3, title: 'Nota 3', description: 'Descripción de la nota 3', tag: 'Trabajo' },
    { id: 4, title: 'Nota 4', description: 'Descripción de la nota 4', tag: 'Personal' },
    { id: 5, title: 'Nota 5', description: 'Descripción de la nota 5', tag: 'Trabajo' },
    { id: 6, title: 'Nota 6', description: 'Descripción de la nota 6', tag: 'Personal' },
    { id: 7, title: 'Nota 7', description: 'Descripción de la nota 7', tag: 'Trabajo' },
    { id: 8, title: 'Nota 8', description: 'Descripción de la nota 8', tag: 'Personal' },
    { id: 9, title: 'Nota 9', description: 'Descripción de la nota 9', tag: 'Trabajo' },
    { id: 10, title: 'Nota 10', description: 'Descripción de la nota 10', tag: 'Personal' },
    { id: 11, title: 'Nota 11', description: 'Descripción de la nota 11', tag: 'Trabajo' },
    { id: 12, title: 'Nota 12', description: 'Descripción de la nota 12', tag: 'Personal' },
    { id: 13, title: 'Nota 13', description: 'Descripción de la nota 13', tag: 'Trabajo' },
  ])

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  }

  // const handleLogin = () => {
  //   setIsLoggedIn(true)
  //   setView('notes')
  // }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setView('login')
  }

  const handleEditNote = (id) => {
    const note = notes.find(note => note.id === id);
    setNoteToEdit(note)
    setView('edit')
  }

  const handleUpdateNote = (updatedNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    setView('notes')
  }

  const handlePinNote = (id) => {
    setNotes(notes.map(note => note.id === id ? { ...note, isPinned: !note.isPinned } : note).sort((a, b) => b.isPinned - a.isPinned));
  }

  return (
    <div className="h-screen flex bg-slate-50 ">
      <aside className="w-1/5 p-2 g-10 bg-slate-400 text-white">
        <Sidebar />
      </aside>
      <main className="w-full bg-slate-200 overflow-auto">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogin={() => setView('login')} onRegister={() => setView('register')} />
        {isLoggedIn && view === 'notes' && (
          <NoteList notes={notes} onDeleteNote={handleDeleteNote} onEditNote={handleEditNote} onPinNote={handlePinNote} />
        )}
        {isLoggedIn && view === 'edit' && <NoteForm note={noteToEdit} onSave={handleUpdateNote} />}
      </main>
    </div>
  );
}

export default Home;