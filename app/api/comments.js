import { GraphQLClient, gql } from 'graphql-request' // Corrected import statements

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const token = process.env.GRAPHCMS_TOKEN

export default async function POST(req, res) {
  const graphqlClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${token}`, // Use the correct environment variable
    },
  })

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `

  try {
    const result = await graphqlClient.request(query, req.body)
    return res.status(200).send(result)
  } catch (error) {
    console.error('Error executing GraphQL mutation:', error)
    return res.status(500).send('Internal server error')
  }
}
