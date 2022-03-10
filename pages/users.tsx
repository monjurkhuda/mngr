import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Table,
  Tbody,
  Td,
  Tr,
  Text,
} from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import NextLink from 'next/link'
import { CgArrowTopRightR } from 'react-icons/cg'
import { GiEgyptianProfile } from 'react-icons/gi'
import { HiOutlineClipboardList } from 'react-icons/hi'
import NavigationColumn from '../components/navigation_column/NavigationColumn'
import ProjectTableRow from '../components/ProjectTableRow'
import ProjectSearchResult from '../components/search_result/ProjectSearchResult'
import TaskSearchResult from '../components/search_result/TaskSearchResult'
import TaskTableRow from '../components/TaskTableRow'
import UserProfile from '../components/UserProfile'

import { request, GraphQLClient } from 'graphql-request'
import { GET_ALL_USERS } from './api/graphql/queries'

function Users({ currentUser, allUsers }) {
  console.log(allUsers)

  return (
    <>
      <Head>
        <title>Overview. M: Project Management Simplified</title>
      </Head>
      <Flex
        height={[null, null, '100vh']}
        flexDir={['column', 'column', 'row']}
        overflow="hidden"
      >
        {/* Column 1 */}
        <Flex
          w={['100%', '100%', '10%', '10%', '10%']}
          flexDir="column"
          alignItems="center"
          borderRight="2px"
          borderColor="#eeeeee"
        >
          <NavigationColumn />
          <UserProfile profilePic={currentUser.image} />
        </Flex>

        {/* Column 2 */}
        <Flex
          className="column_two"
          w={['100%', '100%', '90%', '90%', '55%']}
          p="3%"
          flexDir="column"
          overflow="auto"
          minH="100vh"
          backgroundColor="#f6f6f6"
        >
          {/*Tasks table */}
          <Flex justifyContent="space-between" mt={8}>
            <Flex align="flex-end">
              <GiEgyptianProfile size={32} />
              <Heading as="h2" size="lg" letterSpacing="tight" ml={1}>
                Mngr Users
              </Heading>
            </Flex>
          </Flex>

          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            {allUsers.map((user) => (
              <Tbody>
                <Tr
                  backgroundColor="white"
                  borderTop="2px"
                  borderColor="#f6f6f6"
                >
                  <Td>
                    <Flex>
                      <Avatar src={user.image} />
                      <Flex direction="column" ml={4}>
                        <Heading size="md">{user.username}</Heading>
                        <Text fontSize={16}>{user.email}</Text>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </Flex>
        {/* Column 3 */}
        <Flex
          display={['none', 'none', 'none', 'none', 'inline']}
          w={['100%', '100%', null, null, '35%']}
          p="3%"
          flexDir="column"
          overflow="auto"
          backgroundColor="purple.400"
        ></Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, query }) {
    const {
      user: { email },
    } = await getSession(req)

    const prisma = new PrismaClient()
    const endpoint = 'http://localhost:3000/api/graphql/graphql'
    const graphQLClient = new GraphQLClient(endpoint, {})

    const currentUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        Tasks: {
          orderBy: { dueDate: 'asc' },
          where: { completed: false },
          include: { Project: true },
        },
        Projects: {
          include: {
            Tasks: true,
          },
        },
      },
    })

    const allUsers = await graphQLClient.request(GET_ALL_USERS)

    await prisma.$disconnect()

    return {
      props: {
        currentUser: JSON.parse(JSON.stringify(currentUser)),
        allUsers: JSON.parse(JSON.stringify(allUsers.getAllUsers)),
      },
    }
  },
})

export default Users
