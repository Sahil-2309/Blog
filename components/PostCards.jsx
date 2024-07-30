'use client'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import logo from '../public/bg.jpg'
import { animate } from 'framer-motion'
const Postcards = ({ post }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  // console.log(post.featuredImage.url)
  return (
    <div
      className='Card transition duration-700 shadow-lg bg-opacity-95
    bg-gradient-to-45
     rounded-lg p-0 lg:p-8 pb-8 mb-4 rounded-md backdrop-filter backdrop-blur-md border border-gray-500 select-none '
    >
      <div className='relative overflow-hidden shadow-md mb-6'>
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className='object-center w-full h-80 object-cover shadow-lg rounded-t-lg lg:rounded-lg overflow-hidden'
        />
      </div>
      <h1 className='transition duration-700 text-center mb-4 cursor-pointer hover:text-pink-600 text-3xl font-semibold text-white'>
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className='block lg:flex text-center items-center justify-center mb-2 w-full '>
        <div className='flex items-center justify-center mb-2 lg:mb-0 w-full lg:w-auto mr-4 text-gray-200'>
          <img
            alt={post.author.name}
            height='20px'
            width='30px'
            className='align-middle rounded-full object-cover'
            src={post.author.photo.url}
          />
          <span className='inline align-middle ml-1 text-lg text-gray'>
            {post.author.name}
          </span>
        </div>
        <div className='font-medium text-gray-200 '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 inline mr-2 text-pink-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
          <span>{moment(post.createdAt).format('MMM DD,YYYY')}</span>
        </div>
      </div>
      <p className='text-center text-lg text-white font-normal px-2 lg:px-10 mb-4'>
        {post.excerpt}
      </p>
      <div className='text-center'>
        <Link href={`/post/${post.slug}`}>
          <span className='transition duration-800 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-lg text-white px-4 py-1 cursor-pointer '>
            Continue reading
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Postcards
