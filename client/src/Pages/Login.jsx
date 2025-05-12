import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const { backendurl, isLoggedIn, setIsLoggedIn, getUserData } = useContext(AppContext)

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,20}$/

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      if (!passwordValidation.test(password)) {
        setPasswordError('Password must contain at least one number and one special character')
        return
      }
      setPasswordError('')

      axios.defaults.withCredentials = true

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendurl + '/api/auth/register', { name, email, password })

        if (data.success) {
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendurl + '/api/auth/login', { email, password })

        if (data.success) {
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      />

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Create account' : 'Login'}</h2>

        <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account'}</p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.person_icon} alt="" />
              <input
                onChange={e => setName(e.target.value)} value={name}
                className='bg-transparent outline-none' type="text" placeholder='Full Name' required />
            </div>
          )}

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={e => setEmail(e.target.value)} value={email}
              className='bg-transparent outline-none' type="email" placeholder='Email Address' required />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={e => setPassword(e.target.value)} value={password}
              className='bg-transparent outline-none' type="password" placeholder='Password' required />
          </div>

          {passwordError && (
            <p className="text-red-500 text-xs mt-2">{passwordError}</p>
          )}

          <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot password</p>

          <button className='w-full py-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900 font-medium text-white'>{state}</button>
        </form>

        {state === 'Sign Up' ? (
          <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign Up</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default Login
