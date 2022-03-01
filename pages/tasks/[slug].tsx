import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { PrismaClient } from '@prisma/client'
import NavigationColumn from '../../components/navigation_column/NavigationColumn'
import Link from 'next/link'
import {
  CircularProgress,
  CircularProgressLabel,
  Progress,
  Flex,
  Button,
  Heading,
  Avatar,
  Text,
  IconButton,
  Tag,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Box,
  Icon,
} from '@chakra-ui/react'
import OverviewRightColumn from '../../components/overview_right_column/OverviewRightColumn'

const TaskPage = ({ task }) => {
  return (
    <>
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
        </Flex>
        {/*Column2*/}
        <Flex
          className="column_two"
          w={['100%', '100%', '90%', '90%', '55%']}
          p="3%"
          flexDir="column"
          overflow="auto"
          minH="100vh"
          backgroundColor="#f6f6f6"
        >
          <Link href={`/projects/edittask/${task.id}`}>
            <Button>Edit Task</Button>
          </Link>
          <Flex>{task.title}</Flex>
          <Flex>{task.description}</Flex>
          <Flex>Assigned To: {task.assignedToId}</Flex>
          <Flex>Priority: {task.priority}</Flex>
          <Flex>Due: {task.dueDate}</Flex>
          <Flex>Completed?: {task.completed.toString()}</Flex>
        </Flex>
        {/* Column 3 */}
        <Flex
          display={['none', 'none', 'none', 'none', 'inline']}
          w={['100%', '100%', null, null, '35%']}
          p="3%"
          flexDir="column"
          overflow="auto"
          backgroundColor="purple.400"
        >
          <OverviewRightColumn />
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ params }) {
    const prisma = new PrismaClient()

    const task = await prisma.task.findUnique({
      where: {
        id: params.slug,
      },
    })

    await prisma.$disconnect()

    return {
      props: {
        task: JSON.parse(JSON.stringify(task)),
      },
    }
  },
})

export default TaskPage
