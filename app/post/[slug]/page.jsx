'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  PostDetail,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from '../../../components'
import { getPosts, getPostDetails } from '../../../services'

const PostDetails = ({ params }) => {
  const [categories, setCategories] = useState([])
  const [post, setPost] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostDetails(params.slug)
      setPost(data)
      console.log(data)
      setCategories(data.category.map((category) => category.slug))
    }
    void fetchData()
  }, [params])
  // console.log(post)
  console.log(post?.featuredImage?.url || '')
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8 text-white'>
          <PostDetail post={post} />

          <CommentsForm slug={post.slug} />
          {/* <Comments slug={post.slug} /> */}
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <Author author={post.author} />
            <PostWidget
              slug={post?.slug || 'netsuite'}
              categories={categories || []}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
