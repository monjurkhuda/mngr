import NextLink from 'next/link'
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { PrismaClient } from '@prisma/client'
import {
  Flex,
  Heading,
  Avatar,
  Text,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Button,
  Icon,
} from '@chakra-ui/react'
import TaskTableRow from '../components/TaskTableRow'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'

const DashboardPage = ({ dbUser }) => {
  return (
    <>
      <Flex flexDir="column">
        <NextLink href="/tasks/createtask">
          <Button width="fit-content" colorScheme="purple" mt={2}>
            + Create Task
          </Button>
        </NextLink>
        <Flex overflow="auto">
          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              <TaskTableRow />
              <TaskTableRow />
              <TaskTableRow />
              <TaskTableRow />
            </Tbody>
          </Table>
        </Flex>
        <Flex
          flexDir="row"
          justifyContent="center"
          alignItems="center"
          color="gray.500"
        >
          <Button mt={2} backgroundColor="gray.200">
            All Tasks
            <Icon as={MdOutlineArrowDropDownCircle} ml={2} />
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req }) {
    const {
      user: { email },
    } = await getSession(req)

    const prisma = new PrismaClient()

    const dbUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        courses: true,
      },
    })

    await prisma.$disconnect()

    return {
      props: {
        dbUser: JSON.parse(JSON.stringify(dbUser)),
      },
    }
  },
})

export default DashboardPage
