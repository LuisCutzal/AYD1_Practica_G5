
function Sidebar() {
    return (
        <>
            <div className="w-64 p-6">
                <h2 className="text-3xl font-bold mb-4 py-10 text-red-500/90">Menu</h2>
                <ul>
                    <li className="mb-10 flex flex-1 gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                            <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <a href="#" className="text-gray-700 hover:text-blue-500">Notes</a>
                    </li>
                    <li className="mb-10 flex flex-1 gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                            <path d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <a href="#" className="text-gray-700 hover:text-blue-500">Add Note</a>
                    </li>
                    <li className="mb-10 flex flex-1 gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                            <path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                        <a href="#" className="text-gray-700 hover:text-blue-500">Archivados</a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;