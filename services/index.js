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
      posts(last: 3, orderBy: createdAt_ASC) {
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

const getSimilarPosts = async () => {
  const query = gql`
    query MyQuery($slug: String!, $categories: [String!]) {
      posts(
        last: 3
        where: {
          slug_not: $slug
          AND: { category_some: { slug_in: $categories } }
        }
      ) {
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `

  const result = await request(graphqlAPI, query)
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
          raw
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })
  // console.log(result)
  return result.post
}
export { getPosts, getRecentPosts, getSimilarPosts, getCategories }
