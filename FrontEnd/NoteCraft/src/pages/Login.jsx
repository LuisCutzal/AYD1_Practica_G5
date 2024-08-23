
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  //----- CONSTANTES -----
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar puntos o texto en el campo de contraseña
  // ---- CONSTANTES USUARIO ----
  const [isLogged, setIsLogged] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [userData, setUserData] = useState({
    user: '',
    token: '',
    user_id: ''
  });
  //---- CONSTANTES PARA MANEJAR USUARIOS ----
  const navigate = useNavigate(); // Obtener la función de navegación de React Router
  // const auth = useAuth();


  //----- FUNCIONES INTERFAZ -----
  //-- Cambio de tipo del input de contraseña de texto a puntos y viceversa
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  //----- FUNCIONES PARA MANEJAR LOS DATOS-----
  //-- función para manejar los cambios en los campos del formulario
  const handleChangeLogin = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  //-- funcion para manejar el envio del formulario
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log('---- Datos que envia login al server ----');
    console.log('-- Valor de formData de login:', formData);

    try {
      //-- Variable de configuracion para el fetchsingup
      const configLogin = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      };

      //-- Enviar datos al servidor
      const response = await fetch('http://127.0.0.1:5000/login', configLogin);
      console.log('---- Respuesta del servidor ----', response);
      console.log('-- Response:', response);
      console.log('-- Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('---- Data del servidor ----');
        console.log('-- Data:', data);

        //-- Guardar datos del usuario que me devuelve el servidor
        // setUserData({
        //   user: data.user,
        //   token: data.token,
        //   user_id: data.user_id
        // });

        // console.log('---- Datos del usuario1 ----');
        // console.log('-- userData:', userData);
        //-- Guardar datos del usuario que me devuelve el servidor
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('user', data.user);

        //-- Redirigir al usuario a la página de inicio
        navigate('/');

        // auth.saveUser();


      } else {
        const errorData = await response.json();
        console.log('---- Error del servidor ----');
        console.log('-- Error:', errorData);

      }


    } catch (error) {
      console.log('Error de red', error);
    }

  };

  return (
    <div className='vh-100 bg-[url("./img/login.jpg")] bg-cover bg-center'>
      <div className='d-flex row h-100 '>
        <div className='col-sm-6 d-flex justify-content-center align-items-center'>
          <h1 className='font-Marker text-center text-6xl transform translate-x-28'>
            <span>Note</span> <br></br>
            <span>Craft</span>
          </h1>
        </div>
        {/* <div className='col-sm-6 offset-sm-6 p-5 justify-content-center align-items-center '> */}
        <div className='col-sm-6 d-flex justify-content-center align-items-center'>

          <div className='d-flex justify-content-center '>
            <div className='card card2 d-flex justify-content-center align-items-center bg-gray-950 bg-transparent/65'>
              <div className='card-header text-center text-white'>
                <div className='d-flex social_icon justify-content-center align-items-center'>
                  <h1 className='font-Marker text-center text-3xl '>LOGIN</h1>
                </div>
                <p className='mb-3 mt-5 px-5 '>
                  Introduce tu nombre de usuario y contraseña para acceder a tu cuenta.
                </p>
              </div>

              <div className='card-body d-flex justify-content-center flex-column'>
                {/* Mensajes de éxito y error */}

                <form className='formulario w-100 px-3 mb-2' onSubmit={handleSubmitLogin}>
                  <div className='mb-3 input-group form-group w-100'>
                    <div className='d-flex input-group-prepend'>
                      <span className='d-flex input-group-text iconos-form'>
                        <i className='d-flex bi bi-person-fill h4'></i>
                      </span>
                    </div>
                    <input
                      className='form-control form-control-lg'
                      id='email'
                      name='email'
                      type='text'
                      placeholder='Correo electrónico'
                      value={formData.email}
                      onChange={handleChangeLogin}
                      required
                    />
                  </div>

                  <div className='mb-3 input-group form-group w-100'>
                    <div className='d-flex justify-content-center align-items-center input-group-prepend'>
                      <span className='input-group-text iconos-form'>
                        <i className='bi bi-key-fill h4'></i>
                      </span>
                    </div>
                    <input
                      className='form-control form-control-lg'
                      id='password'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Contraseña'
                      value={formData.password}
                      onChange={handleChangeLogin}
                      required
                    />
                    <span
                      toggle="#password"
                      className={`  iconos-form d-flex justify-content-center align-items-center toggle-password ${showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}`}
                      onClick={togglePasswordVisibility}
                    ></span>

                  </div>

                  <div className='w-100'>
                    <button
                      className='btn btn-lg btn-registro w-100 mb-2 bg-blue-500 text-white hover:text-white hover:bg-yellow-500'
                      type='submit'
                    >
                      Ingresar
                    </button>
                  </div>
                </form>
              </div>

              <div className='card-footer'>
                <label className='mb-2 text-white'>
                  ¿Aún no tienes una cuenta?
                  <Link to='/register' className='link-info'>Registrate aquí</Link>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
export default Login


