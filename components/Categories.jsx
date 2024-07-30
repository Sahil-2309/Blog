'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { getCategories } from '../services'
import Link from 'next/link'
const Categories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data)
    })
  }, [])
  // console.log(categories)
  return (
    <div
      className='bg-gradient-to-45 shadow-lg rounded-lg p-8 mb-8
      text-white border pb-12
      text-center
  '
    >
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-white '>
        Categories
      </h3>
      {categories.map((category) => (
        <Link href={`/category/${category.slug}`} key={category.name}>
          <span className='cursor-pointer block pb-3 mb-2 font-bold text-xl hover:text-pink-600 transition duration-700 '>
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories
