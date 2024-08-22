import React from 'react'

const Register = () => {
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
              <form className='mx-1 w-100'>   
                {/* -- Username -- */}
                <div className='mb-4 input-group form-group w-100'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text iconos-form bg-yellow-500'>
                      <i className='bi bi-person-fill'></i>
                    </span>
                  </div>
                  <input
                    type='text'
                    id='username'
                    className='form-control'
                    placeholder='Nombre de usuario'
                    required />
                </div> {/* div-username */}

                {/* -- Correo electronico -- */}
                <div className='mb-4 input-group form-group w-100'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text iconos-form bg-yellow-500'>
                    <i className  ="bi bi-envelope-fill"></i>
                      {/* <i className='<i class="bi bi-envelope-fill"></i>'></i> */}
                    </span>
                  </div>
                  <input
                    type='mail'
                    id='correo'
                    className='form-control'
                    placeholder='Correo electrónico'    
                    required />
                </div> {/* div-full-name */}

                {/* -- Contraseña -- */}
                <div className='mb-4 input-group form-group w-100'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text iconos-form bg-yellow-500'>
                      <i className='bi bi-lock-fill px-1'></i>
                    </span>
                  </div>
                  <input
                    type='password'
                    id='password'
                    className='form-control'
                    placeholder='Contraseña'
                    required />
                  <span
                    toggle='#password'
                    className='iconos-form d-flex justify-content-center align-items-center iconos-ojos-password toggle-password bi bi-eye-fill'>
                  </span>
                </div> {/* div-password */}

                {/* -- Confirmar contraseña -- */}
                <div className='mb-4 input-group form-group w-100'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text iconos-form bg-yellow-500'>
                      <i className='bi bi-key-fill px-1'></i>
                    </span>
                  </div>
                  <input
                    type='password'
                    id='confirmPassword'
                    className='form-control'
                    placeholder='Confirmar contraseña'
                    required />
                  <span
                    toggle='#password'
                    className='iconos-form d-flex justify-content-center align-items-center iconos-ojos-password toggle-password bi bi-eye-fill'></span>
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
                  {/* <Link to='/'   className='link-info'> LOGIN </Link> */}
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