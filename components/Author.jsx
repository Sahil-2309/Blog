import React from 'react'
// import Image from 'next/image'

const Author = ({ author }) => (
  <div className='text-center mt-10 mb-8 p-12 relative rounded-lg bg-gray-700 bg-opacity-40'>
    <div className='absolute -top-10 '>
      <img
        alt={author?.name || 'Devansh Tyagi'}
        height='100px'
        width='100px'
        className='align-middle rounded-full'
        src={author?.photo?.url || 'https://via.placeholder.com/150'}
      />
    </div>
    <h3 className='text-white mt-4 mb-4 text-xl font-bold'>
      {author?.name || 'Devansh Tyagi'}
    </h3>
    <p className='text-white text-ls'>{author?.bio || 'Writer'}</p>
  </div>
)

export default Author
