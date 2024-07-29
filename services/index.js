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

  const result = await request(graphqlAPI, query)
  return result.posts
}
export { getPosts, getRecentPosts }
