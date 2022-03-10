import { gql, ApolloServer } from 'apollo-server-micro'
import { prisma } from '../../../prisma/db'

const typeDefs = gql`
  scalar DateTime

  type User {
    id: String
    username: String
    createdAt: DateTime
    updatedAt: DateTime
    email: String
    Role: Role
    image: String
    Tasks: [Task]
    Projects: [Project]
  }

  enum Role {
    ADMIN
    USER
  }

  type Project {
    id: String
    ownerId: String
    User: User
    createdAt: DateTime
    updatedAt: DateTime
    title: String
    description: String
    Tasks: [Task]
    dueDate: String
    slug: String
    completed: Boolean
    completedAt: DateTime
  }

  type Task {
    id: String
    assignedToId: String
    User: User
    title: String
    description: String
    Project: [Project]
    createdAt: DateTime
    updatedAt: DateTime
    dueDate: String
    priority: Int
    slug: String
    completed: Boolean
    completedAt: DateTime
  }

  type Query {
    getAllUsers: [User]
  }
`

const resolvers = {
  Query: {
    getAllUsers: (_parent, _args, _context) => {
      return prisma.user.findMany()
    },
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const handler = apolloServer.createHandler({ path: '/api/graphql/graphql' })

export const config = { api: { bodyParser: false } }

export default handler
