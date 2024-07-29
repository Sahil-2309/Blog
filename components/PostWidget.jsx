'use client'
import React, { use } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getRecentPosts } from '../services'
const PostWidget = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getRecentPosts().then((data) => {
      setPosts(data)
    })
  }, [])
  console.log(posts)
  return (
    <div
      className='text-white
  '
    >
      PostWidget
    </div>
  )
}

export default PostWidget
