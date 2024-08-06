'use client'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'

import { getComments } from '../services'

const Comments = ({ comments }) => {
  // console.log(comments)
  return (
    <>
      {comments.length > 0 && (
        <div
          className='bg-gradient-to-45 shadow-lg rounded-lg p-8 pb-12 mb-8 text-white backdrop-filter backdrop-blur-sm'
          style={{
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {comments.length} Comments
          </h3>
          <div className='comments-container' style={{ flex: 1 }}>
            {comments.map((comment, index) => (
              <div
                key={index}
                className='border-b border-gray-100 mb-4 pb-4'
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  <p className='mb-4'>
                    <span className='font-semibold'>{comment.name}</span>
                  </p>
                  <p className='whitespace-pre-line text-white pr-3'>
                    {parse(comment.comment)}
                  </p>
                </div>
                <p className='mb-4 text-sm text-gray-400'>
                  {moment(comment.createdAt).format('MMM DD, YYYY')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
