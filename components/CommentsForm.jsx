'use client'
import React, { useRef, useState, useEffect } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    storeData: false,
  })

  useEffect(() => {
    const initialName = window.localStorage.getItem('name') || ''
    const initialEmail = window.localStorage.getItem('email') || ''
    const initialStoreData =
      !!window.localStorage.getItem('name') &&
      !!window.localStorage.getItem('email')

    setFormData({
      name: initialName,
      email: initialEmail,
      comment: '',
      storeData: initialStoreData,
    })

    nameEl.current.value = initialName
    emailEl.current.value = initialEmail
  }, [])

  const onInputChange = (e) => {
    const { target } = e
    const { name, value, type, checked } = target

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const postComment = () => {
    setError(false)
    if (
      !commentEl.current.value ||
      !nameEl.current.value ||
      !emailEl.current.value
    ) {
      setError(true)
      return
    }

    const commentData = {
      comment: commentEl.current.value,
      name: nameEl.current.value,
      email: emailEl.current.value,
      storeData: formData.storeData,
      slug,
    }
    // console.log(commentData.slug)
    if (commentData.storeData) {
      window.localStorage.setItem('name', commentData.name)
      window.localStorage.setItem('email', commentData.email)
    } else {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('email')
    }

    submitComment(
      commentData.name,
      commentData.comment,
      commentData.email,
      commentData.slug
    ).then((res) => {
      if (res) {
        setShowSuccessMessage(true)
      }
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }

  return (
    <div className='bg-zinc-900 shadow-lg rounded-lg p-8 pb-12 mb-8 mt-8 bg-opacity-90'>
      <h3 className=' text-xl mb-8 font-semibold border-b pb-4'>
        Leave a Reply
      </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          ref={commentEl}
          onChange={onInputChange}
          className='p-4 outline-none w-full rounded-lg h-20 focus:ring-2 focus:ring-gray-200 bg-zinc-600 custom-shadow text-zinc-200'
          name='comment'
          placeholder='Comment'
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
        <input
          ref={nameEl}
          type='text'
          onChange={onInputChange}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-zinc-600 text-zinc-200'
          placeholder='Name'
          name='name'
        />
        <input
          ref={emailEl}
          type='email'
          onChange={onInputChange}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-zinc-600 text-zinc-200'
          placeholder='Email'
          name='email'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            type='checkbox'
            id='storeData'
            name='storeData'
            checked={formData.storeData}
            onChange={onInputChange}
            className='mr-2'
          />
          <label className='text-zinc-200 cursor-pointer' htmlFor='storeData'>
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className='text-xs text-red-500'>All fields are mandatory</p>
      )}
      <div className='mt-8'>
        <button
          onClick={postComment}
          type='button'
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className='lg:ml-10 text-green-500'>
            Comment submitted for review 👍🏻
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
