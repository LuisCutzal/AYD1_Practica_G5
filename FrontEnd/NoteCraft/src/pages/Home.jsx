
function Home() {
  return (
    <div className="h-screen flex gap-1 bg-slate-50 ">
        <aside className="w-1/5 p-2 g-10 bg-slate-400 text-white">
            {/*Ejemplode que contenido puede llevar el dashboard se puede eliminar este contenido el dashboar se llama aqui*/}
            <div>
                <h1 className="text-3xl font-bold">Menu</h1>
            </div>
            <div className="gap-10 py-10">
                <ul>
                    <li className="py-5 px-2">Home</li>
                    <li className="py-5 px-2">Notes</li>
                    <li className="py-5 px-2">Add Note</li>
                    <li className="py-5 px-2">Archived</li>
                </ul>
            </div>           
            {/**/}
        </aside>
        <main className="w-full g-1 p-4 bg-white">
            {/*eleminar este contenido para sustituiolo por el verdadero*/}
            <h1 className="text-3xl font-bold p-4">Welcome to NoteCraft</h1>
            {/*Ejemplo de  notas dentro del main */}
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="bg-slate-300 p-4 text-white">Note 1</div>
                <div className="bg-slate-300 p-4 text-white">Note 2</div>
                <div className="bg-slate-300 p-4 text-white">Note 3</div>
                <div className="bg-slate-300 p-4 text-white">Note 4</div>
                <div className="bg-slate-300 p-4 text-white">Note 5</div>
                <div className="bg-slate-300 p-4 text-white">Note 6</div>
                <div className="bg-slate-300 p-4 text-white">Note 7</div>
                <div className="bg-slate-300 p-4 text-white">Note 8</div>
                <div className="bg-slate-300 p-4 text-white">Note 9</div>
                <div className="bg-slate-300 p-4 text-white">Note 10</div>
            </div>
            {/**/}
        </main>
    </div>
  );
}

export default Home;