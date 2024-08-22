import React from 'react'

const Login = () => {
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

                <form className='formulario w-100 px-3 mb-2'>
                  <div className='mb-3 input-group form-group w-100'>
                    <div className='d-flex input-group-prepend'>
                      <span className='d-flex input-group-text iconos-form'>
                        <i className='d-flex bi bi-person-fill h4'></i>
                      </span>
                    </div>
                    <input
                      className='form-control form-control-lg'
                      id='username'
                      name='username'
                      type='text'
                      placeholder='Nombre de usuario'
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
                      type='password'
                      placeholder='Contraseña'
                      required
                    />
                    <span
                      toggle="#password"
                      className='iconos-form d-flex justify-content-center align-items-center toggle-password bi bi-eye-fill'
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
                  {/* <Link to='/singup' className='link-info'>Registrate aquí</Link> */}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login