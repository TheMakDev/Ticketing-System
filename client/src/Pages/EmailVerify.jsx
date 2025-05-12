import React, { useContext, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../Context/AppContext'
import { toast } from 'react-toastify'

const EmailVerify = () => {
  axios.defaults.withCredentials = true

  const { backendurl, getUserData, isLoggedIn, userData } = useContext(AppContext)
  const inputRefs = useRef([])
  const navigate = useNavigate()

  const handleInput = (e, index) => {
    const { value } = e.target
    if (!/^\d$/.test(value) && value !== '') {
      e.target.value = ''
      return
    }

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const pasteArray = paste.split('')

    pasteArray.forEach((char, index) => {
      const input = inputRefs.current[index]
      if (input) input.value = char
    })

    const nextInput = inputRefs.current[pasteArray.length]
    if (nextInput) nextInput.focus()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const otp = inputRefs.current.map(ref => ref?.value).join('')

    if (otp.length < 6) {
      toast.error('Please enter the full 6-digit OTP')
      return
    }

    try {
      const { data } = await axios.post(`${backendurl}/api/auth/verify-account`, { otp })

      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) {
      navigate('/')
    }
  }, [isLoggedIn, userData, navigate])

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      />

      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Verify Your Email</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code we sent to your email</p>

        <div className='flex justify-between gap-2 mb-8'>
          {Array(6).fill(0).map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              autoComplete="off"
              aria-label={`OTP digit ${index + 1}`}
              className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              ref={el => inputRefs.current[index] = el}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
            />
          ))}
        </div>

        <button
          type="submit"
          className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-semibold rounded-full hover:opacity-90 transition'
        >
          Verify Email
        </button>
      </form>
    </div>
  )
}

export default EmailVerify
