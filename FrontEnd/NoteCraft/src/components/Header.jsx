import propTypes from 'prop-types';

const Header = ({isLoggedIn, onLogout, onLogin, onRegister}) => {

    return (
        <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">NoteCraft</div>
        <nav>
          {isLoggedIn ? (
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={onLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={onLogin}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                  Iniciar Sesión
                </button>
              </li>
              <li>
                <button
                  onClick={onRegister}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
                >
                  Registrarse
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
    onLogin: propTypes.func.isRequired,
    onRegister: propTypes.func.isRequired
}

export default Header