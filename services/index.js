import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
// console.log(graphqlAPI)
const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)
  // console.log(result)
  return result.postsConnection.edges
}
const getRecentPosts = async () => {
  const query = gql`
    query MyQuery {
      posts(last: 6, orderBy: createdAt_ASC) {
        featuredImage {
          url
        }
        title
        createdAt
        slug
      }
    }
  `

  const result2 = await request(graphqlAPI, query)
  return result2.posts
}

const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { category_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug, categories })

  return result.posts
}
const getCategories = async () => {
  const query = gql`
    query MyQuery {
      categories {
        name
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)
  return result.categories
}
const getPostDetails = async (slug) => {
  // console.log(slug)
  const query = gql`
    query MyQuery($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        category {
          name
          slug
        }

        content {
          json
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })
  return result.post
}
export const submitComment = async (comment) => {
  const result = await fetch('../app/api/comments.js', {
    method: 'POST',
    body: JSON.stringify(comment),
  })
}
export {
  getPosts,
  getRecentPosts,
  getSimilarPosts,
  getCategories,
  getPostDetails,
}
