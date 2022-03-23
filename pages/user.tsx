import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  Avatar,
  Flex,
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import { GrFormEdit } from 'react-icons/gr'
import Navigation from '../components/navigation_column/Navigation'
import NavigationColumnLogo from '../components/navigation_column/NavigationColumnLogo'
import OverviewRightColumn from '../components/overview_right_column/OverviewRightColumn'

function Users({ currentUser }) {
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
            alignItems="center"
            w="100%"
            p={2}
            backgroundColor="white"
            borderRadius={10}
            boxShadow="base"
            mt={4}
          >
            <Text size="sm" fontWeight="600" color="gray.500">
              My Profile:
            </Text>
            <Flex mt={2}>
              <Flex>
                <Avatar src={currentUser.image} size="lg" mt={2}></Avatar>
              </Flex>
              <Link href="/editprofile">
                <Flex
                  backgroundColor="white"
                  p={1}
                  borderRadius={20}
                  boxShadow="base"
                  ml={-3}
                >
                  <GrFormEdit size={30} color="white" />
                </Flex>
              </Link>
            </Flex>
            <Text fontSize="md" fontWeight="700" color="gray.700" mt={1}>
              {currentUser.username}
            </Text>
            <Text fontSize="sm" color="blackAlpha.800">
              {currentUser.email}
            </Text>
          </Flex>
        </Flex>
        {/* Column 3 */}
        <Flex
          display={['none', 'none', 'none', 'none', 'inline']}
          w={['100%', '100%', null, null, '35%']}
          p="3%"
          flexDir="column"
          overflow="auto"
          backgroundColor="gray.600"
        >
          <OverviewRightColumn />
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const {
      user: { email },
    } = await getSession(req, res)

    const prisma = new PrismaClient()

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

    await prisma.$disconnect()

    return {
      props: {
        currentUser: JSON.parse(JSON.stringify(currentUser)),
      },
    }
  },
})

export default Users
