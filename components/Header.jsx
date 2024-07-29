'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
const categories = [
  { name: 'React', slug: 'react' },
  { name: 'Vue', slug: 'vue' },
  { name: 'Angular', slug: 'angular' },
  { name: 'Svelte', slug: 'svelte' },
]

const Header = () => {
  return (
    <motion.div
      initial={{ y: -200 }} // Set the initial position
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }} // Optional: Add transition duration
      className='container mx-auto px-10 mb-8 sticky'
    >
      <div className='border-b w-full inline-block border-black-300 py-8'>
        <div className='md:float-left block'>
          <Link href='/'>
            <span className='cursor-pointer font-bold text-4xl text-white'>
              GraphCMS
            </span>
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
