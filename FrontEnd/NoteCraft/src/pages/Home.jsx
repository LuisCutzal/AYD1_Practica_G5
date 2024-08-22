
//local imports
import Sidebar from "../components/Sidebar";
import NoteCard  from "../components/NoteCard";
function Home() {
  return (
    <div className="h-screen flex bg-slate-50 ">
        <aside className="w-1/5 p-2 g-10 bg-slate-400 text-white">
            <Sidebar />
        </aside>
        <main className="w-full g-2 p-4 bg-slate-200 overflow-auto">
            {/*eleminar este contenido para sustituiolo por el verdadero*/}
            <h1 className="text-3xl font-bold p-4">Welcome to NoteCraft</h1>
            {/*Ejemplo de  notas dentro del main */}
            <div className="grid grid-cols-2 gap-10 p-4">
                <NoteCard title="Title" description="Description note card" tag="Tag 1"  />
                <NoteCard title="Title 2" description="Description note card" tag="Tag 2"  />
                <NoteCard title="Title 3" description="Description note card" tag="Tag 3"  />
                <NoteCard title="Title 4" description="Description note card" tag="Tag 4"  />
                <NoteCard title="Title 5" description="Description note card" tag="Tag 5"  />
                <NoteCard title="Title 6" description="Description note card" tag="Tag 6"  />
                <NoteCard title="Title 7" description="Description note card" tag="Tag 7"  />
                <NoteCard title="Title 8" description="Description note card" tag="Tag 8"  />
                <NoteCard title="Title 9" description="Description note card" tag="Tag 9"  />
                <NoteCard title="Title 10" description="Description note card" tag="Tag 10"  />
                <NoteCard title="Title 11" description="Description note card" tag="Tag 11"  />
                <NoteCard title="Title 12" description="Description note card" tag="Tag 12"  />
                <NoteCard title="Title 13" description="Description note card" tag="Tag 13"  />               
            </div>
            {/**/}
        </main>
    </div>
  );
}

export default Home;