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
import { RiTaskLine } from 'react-icons/ri'
import { BsClockFill } from 'react-icons/bs'
import { HiOutlineClipboardList } from 'react-icons/hi'

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
          <Flex mb={4}>
            <RiTaskLine size={32} />
            <Heading as="h2" size="lg" letterSpacing="tight" ml={1}>
              Task
            </Heading>
          </Flex>

          <Flex
            direction="column"
            backgroundColor="white"
            boxShadow="base"
            borderRadius={20}
            p={4}
          >
            <Flex>
              <Heading size="md">{task.title}</Heading>
              <Box
                boxSize={5}
                backgroundColor="purple.500"
                ml={2}
                borderRadius={4}
              >
                <Flex
                  flexDir="column"
                  textColor="white"
                  fontWeight="600"
                  fontSize="sm"
                  alignItems="center"
                >
                  {task.priority}
                </Flex>
              </Box>
              {task.completed === true ? <Tag ml={2}>✔️ Completed</Tag> : <></>}
            </Flex>

            <Text mt={4}>{task.description}</Text>

            <Link href={`/tasks/edittask/${task.id}`}>
              <Button w="fit-content" mt={4} colorScheme="yellow">
                Edit Task
              </Button>
            </Link>

            <Flex alignItems="center" justifyContent="space-between" mt={4}>
              <Flex>
                <HiOutlineClipboardList size={20} />
                <Text fontSize="sm" ml={1}>
                  {task.Project[0].title}
                </Text>
              </Flex>
              <Flex>
                <Icon as={BsClockFill}></Icon>
                <Text fontSize="sm" ml={2}>
                  {`Due: ${task.dueDate}`}
                </Text>
              </Flex>
            </Flex>
          </Flex>
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
      include: {
        Project: true,
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
