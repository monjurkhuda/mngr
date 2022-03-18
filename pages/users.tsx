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

import { request, GraphQLClient } from 'graphql-request'
import { GET_ALL_USERS } from './api/graphql/queries'
import NavigationColumnLogo from '../components/navigation_column/NavigationColumnLogo'
import Navigation from '../components/navigation_column/Navigation'
import { FiUser } from 'react-icons/fi'

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
          flexDir="column"
          w={['100%', '100%', '10%', '10%', '10%']}
          h={['100%', '100%', '30%', '30%', '30%']}
          borderRight="2px"
          borderColor="#eeeeee"
          alignItems="center"
          justifyContent="space-between"
          justifyItems="space-between"
          alignContent="space-between"
        >
          <NavigationColumnLogo />
          <Navigation />
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
          <Flex
            direction="column"
            display={['flex', 'flex', 'none', 'none', 'none']}
            mb={4}
          >
            <Flex
              backgroundColor="white"
              w="100%"
              h="fit-content"
              p={4}
              borderRadius={10}
              boxShadow="base"
              direction="column"
            >
              <Flex>
                <Heading size="md">My Profile:</Heading>
              </Flex>
              <Flex mt={4}>
                <Avatar src={currentUser.image} size="lg"></Avatar>
                <Flex direction="column" ml={4}>
                  <Text fontSize="lg" fontWeight="700" color="blackAlpha.700">
                    {currentUser.username}
                  </Text>
                  <Text fontSize="md" color="blackAlpha.800" mt={1}>
                    {currentUser.email}
                  </Text>
                </Flex>
              </Flex>
              <Flex mt={2} justifyContent="flex-end">
                <Link href="/editprofile">
                  <Button colorScheme="yellow">Edit Profile</Button>
                </Link>
              </Flex>
            </Flex>
          </Flex>

          <Flex mt={2}>
            <Flex align="flex-end">
              <Heading as="h2" size="lg" letterSpacing="tight" ml={1}>
                All Users
              </Heading>
            </Flex>
          </Flex>

          <Table mt={2} borderBottom="4px" borderColor="#e3e3e3">
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
