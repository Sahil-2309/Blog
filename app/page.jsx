'use client'
import Head from 'next/head'
import { PostCards, PostWidget, Categories } from '../components'
import { motion } from 'framer-motion'
import { getPosts } from '../services'
import { useEffect, useState } from 'react'
// import Template from './template'
export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data)
    })
  }, [])

  return (
    <div className='container mx-auto px-10 mb-8 bg-grey'>
      <Head>
        <title>Blogging Website</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        <motion.div
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.65 }}
          className='lg:col-span-9 col-span-1 grid grid-cols-1 md:grid-cols-2 gap-8'
        >
          {posts.map((post, index) => (
            <PostCards key={index} post={post.node} />
          ))}
        </motion.div>

        <div className='lg:col-span-3 col-span-1'>
          <div className='lg:sticky top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
