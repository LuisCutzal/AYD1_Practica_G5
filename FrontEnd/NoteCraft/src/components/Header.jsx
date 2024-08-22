import propTypes from 'prop-types';

const Header = ({isLoggedIn, onLogout, userName}) => {

    const handleLogout = () => {
        onLogout()
    }
    
    return (
        <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">NoteCraft</div>
        <nav>
          {isLoggedIn ? (
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                >
                  Cerrar Sesión
                </button>
              </li>
              <li>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                  {userName}
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-4">
              <li>
                <button
                  // onClick={() => navigate('/login')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                  Iniciar Sesión
                </button>
              </li>
            </ul>
          )}
        </nav>
      </div>
        </header>
    )
}

Header.propTypes = {
    isLoggedIn: propTypes.bool.isRequired,
    onLogout: propTypes.func.isRequired,
    userName: propTypes.string  
}

export default Header