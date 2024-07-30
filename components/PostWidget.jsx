'use client'
import React, { use } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getRecentPosts, getSimilarPosts } from '../services'
const PostWidget = ({ categories, slug }) => {
  const [posts, setPosts] = useState([])
  const [relatedPosts, setRelatedPosts] = useState([])
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((data) => setPosts(data))
    } else {
      getRecentPosts().then((data) => {
        setPosts(data)
      })
    }
  }, [slug])
  console.log(posts)
  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.85 }}
      className='bg-gradient-to-45 shadow-lg rounded-lg p-8 mb-8
      text-white border
  '
    >
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {posts.map((post) => (
        <div key={post.title} className='flex items-center w-full mb-4 '>
          <div className='w-16 flex-none'>
            <img
              src={post.featuredImage.url}
              alt={post.title}
              height='60px'
              width='60px'
              className='align-middle rounded-full'
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-200 font-xs'>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className='text-md transition duration-700
hover:text-pink-600'
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default PostWidget
