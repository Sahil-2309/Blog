'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getCategories } from '../services'
const Header = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data)
    })
  }, [])
  return (
    <motion.div
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.85, ease: 'easeInOut' }}
      className='container mx-auto px-10 mb-8 sticky'
    >
      <div className='border-b w-full inline-block border-black-300 py-8'>
        <div className='md:float-left block'>
          <Link href='/' className='text-center '>
            <h1 className='text-4xl font-bold text-white sm:text-3xl md:text-4xl'>
              <span
                style={{ textShadow: '3px 2px 40px white' }}
                className='p-1 pr-0'
              >
                Cloudlearn
              </span>
              <span className='text-red-600 ml-0'>N</span>
            </h1>
          </Link>
        </div>

        <div className='hidden md:float-left md:contents'>
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Header
