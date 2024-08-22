import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa useNavigate y Link de React Router


const Register = () => {
  //---- VARIABLES ----
  //-- Ojito password --
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false); // Estado para mostrar u ocultar la contraseña
  //-- Mensajes --
  //-- Datos --
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  //---- FUNCIONES ----
  //-- Mostrar u ocultar contraseña --
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  // -- Manejar cambios --
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // -- Enviar datos --
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si la contraseña y la confirmación de contraseña son iguales
    if (formData.password !== confirmPassword) {
    } else {
      console.log('FORM DATA', formData);
      try {
        let config = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
        console.log(config);

        let response = await fetch('http://127.0.0.1:5000/register', config);
        console.log('RESPONSE', response);

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.status === 'ok') {
            // Usuario creado exitosamente
            console.log('response', responseData.msg);
          } else if (responseData.status === 'error') {
            console.error('Error', responseData.msg);
          }
        } else {
          console.log('RESPONSE', response);
          const errorResponse = await response.json(); // Recupera el cuerpo del mensaje  de error
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };



  return (
    <div>
      <div className='d-flex row h-100 '>

        <div className='col-sm-6   d-flex justify-content-center align-items-center flex-column bg-[url("./img/wall3.jpg")]'>
          <h1 className='font-Marker text-white text-2xl mb-5'>
            Note Craft
          </h1>
          <h3 className='font-Marker text-5xl text-yellow-500 mb-5'>Registrate</h3>
          <p className='text-center mb-1  text-white text-lg px-5 '>
            ¡Únete a nuestra comunidad hoy mismo! Completa el formulario y comienza a disfrutar de todos los beneficios de ser parte de nuestra familia virtual. ¡Es rápido, fácil y totalmente gratuito.
          </p>
        </div>
        <div className='col-sm-6 bg-[url("./img/register.jpg")] bg-contain bg-center min-h-screen d-flex justify-content-center align-items-center'
          style={{ backgroundSize: '100%' }}
        >
          {/* Register seis en numero decimal es {6} */}
          <div className='card card1 d-flex flex-column justify-content-center align-items-center bg-transparent border-0 transform -translate-x-10'>
            {/* <div className='card card1 d-flex flex-column justify-content-center align-items-center  transform -translate-x-12'> */}

            <div className='card-body d-flex flex-column justify-content-center align-items-center'>

              <form className='mx-1 w-100' onSubmit={handleSubmit}>
                {/* -- Username -- */}
                <div className='mb-4 input-group form-group w-100'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text iconos-form bg-yellow-500'>
                      <i className='bi bi-person-fill'></i>
                    </span>
                  </div>
                  <input
                    type='text'
                    id='name'
                    className='form-control'
                    placeholder='Nombre de usuario'
                    value={formData.name}
                    onChange={handleChange}
                    required />
                </div> {/* div-name */}

                {/* -- Correo electronico -- */}
                <div className='mb-4 input-group form-group w-100'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text iconos-form bg-yellow-500'>
                      <i className="bi bi-envelope-fill"></i>
                      {/* <i className='<i class="bi bi-envelope-fill"></i>'></i> */}
                    </span>
                  </div>
                  <input
                    type='email'
                    id='email'
                    className='form-control'
                    placeholder='Correo electrónico'
                    value={formData.email}
                    onChange={handleChange}
                    required />
                </div> {/* div-correo-electornico */}

                {/* -- Contraseña -- */}
                <div className='mb-4 input-group form-group w-100'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text iconos-form bg-yellow-500'>
                      <i className='bi bi-lock-fill px-1'></i>
                    </span>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    className='form-control'
                    placeholder='Contraseña'
                    value={formData.password}
                    onChange={handleChange}
                    required />
                  <span
                    toggle='#password'
                    className={`iconos-form d-flex justify-content-center align-items-center  iconos-ojos-password toggle-password ${showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}`}
                    onClick={togglePasswordVisibility} >                  </span>
                </div> {/* div-password */}

                {/* -- Confirmar contraseña -- */}
                <div className='mb-4 input-group form-group w-100'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text iconos-form bg-yellow-500'>
                      <i className='bi bi-key-fill px-1'></i>
                    </span>
                  </div>
                  <input
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    id='confirmPassword'
                    className='form-control'
                    placeholder='Confirmar contraseña'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required />
                  <span
                    toggle='#password'
                    className={`iconos-form d-flex justify-content-center align-items-center iconos-ojos-password toggle-password ${showPasswordConfirmation ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}`}
                    onClick={togglePasswordConfirmationVisibility} >
                  </span>
                </div> {/* div-confirm-password */}

                {/* -- Botón Registrar usuario -- */}
                <div className='d-flex justify-content-center mt-5 mb-1 mb-lg-2'>
                  <button
                    type='submit'
                    className='btn btn-registro shadow-1 btn-md w-100 bg-blue-500 text-white hover:text-white hover:bg-yellow-500'>
                    Registrar usuario
                  </button>
                </div> {/* div-button-register */}
              </form>
            </div>
            <div className='card-footer'>
              <div className='d-flex justify-content-center links'>
                <label className='mb-4'>
                  ¿Ya tienes una cuenta?
                  <Link to='/login' className='link-info'> LOGIN </Link>

                  {/* <Link to='/'   className='link-info'> LOGIN </Link> */}
                </label>
              </div>
              <div className='d-flex justify-content-center links'>
                <label className='mb-4'>
                  Regresa a la  pagina de 
                  <Link to='/' className='link-info'> HOME </Link>
                </label>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>

  )
}










export default Register