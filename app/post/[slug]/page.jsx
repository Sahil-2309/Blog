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
import { getPosts, getPostDetails, getFeaturedPosts } from '../../../services'
import { getComments } from '../../../services'
const PostDetails = ({ params }) => {
  const [categories, setCategories] = useState([])
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [featuredPosts, setFeaturedPosts] = useState([])
  useEffect(() => {
    getPostDetails(params.slug)
      .then((data) => {
        setPost(data)
      })
      .catch((error) => {
        console.error('Error fetching post details:', error)
      })
    getComments(params.slug).then((result) => {
      setComments(result)
    })
    getFeaturedPosts().then((data) => {
      setFeaturedPosts(data.posts)
    })
  }, [params])
  console.log('posts', post)
  return (
    // console.log('fpost', featuredPosts),
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div key='post-details' className='col-span-1 lg:col-span-8 text-white'>
          <PostDetail post={post} />

          <CommentsForm key='comments-form' slug={post.slug} />
        </div>
        <div key='sidebar' className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <Author key='author' author={post.author} />
            {/* <PostWidget
              key='post-widget'
              categories={post.category.map((cat) => cat.slug)}
              slug={post.slug}
            /> */}
            <Comments key='comments' comments={comments} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
