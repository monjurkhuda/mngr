import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
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
  Text,
} from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import NextLink from 'next/link'
import { useState } from 'react'
import { CgArrowTopRightR } from 'react-icons/cg'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { RiHistoryLine, RiTaskLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import Navigation from '../components/navigation_column/Navigation'
import NavigationColumn from '../components/navigation_column/NavigationColumn'
import NavigationColumnLogo from '../components/navigation_column/NavigationColumnLogo'
import OverviewRightColumn from '../components/overview_right_column/OverviewRightColumn'
import ProjectTableRow from '../components/ProjectTableRow'
import ProjectSearchResult from '../components/search_result/ProjectSearchResult'
import TaskSearchResult from '../components/search_result/TaskSearchResult'
import TaskTableRow from '../components/TaskTableRow'
import UserProfile from '../components/UserProfile'
import { addUserInfo } from '../redux/userSlice'

function Overview({
  currentUser,
  completedTaskTotalPriorityArray,
  uncompletedTaskTotalPriorityArray,
  taskSearchResult,
  projectSearchResult,
}) {
  const [searchTerm, setSearchTerm] = useState()
  const dispatch = useDispatch()

  var incompleteProjects = currentUser.Projects.filter(function (project) {
    return project.completed === false
  })

  dispatch(
    addUserInfo({
      username: currentUser.username,
      email: currentUser.email,
      image: currentUser.image,
    })
  )

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
          <Flex justifyContent="center">
            <Flex
              backgroundColor="gray.200"
              p={2}
              w="fit-content"
              borderRadius={20}
            >
              <Button colorScheme="purple" size="md" borderRadius={10}>
                <RiTaskLine size={20} />
                Tasks
              </Button>
              <Link href="/projects">
                <Button size="md" borderRadius={10} ml={4}>
                  <HiOutlineClipboardList size={22} />
                  Projects
                </Button>
              </Link>
            </Flex>
          </Flex>

          {/*Tasks table */}
          <Flex justifyContent="space-between" mt={2}>
            <Flex align="flex-end">
              <RiTaskLine size={30} />
              <Heading as="h2" size="lg" letterSpacing="tight" ml={1}>
                Tasks
              </Heading>
            </Flex>
            <NextLink href="/tasks/createtask">
              <Button width="fit-content" colorScheme="yellow">
                <Text fontSize={20}>+</Text>
              </Button>
            </NextLink>
          </Flex>

          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              {currentUser.Tasks.map(
                ({
                  id,
                  title,
                  description,
                  priority,
                  dueDate,
                  Project,
                  slug,
                }) => (
                  <TaskTableRow
                    id={id}
                    key={id}
                    title={title}
                    description={description}
                    priority={priority}
                    dueDate={dueDate}
                    slug={slug}
                    projectTitle={Project[0].title}
                  />
                )
              )}
            </Tbody>
          </Table>

          <Flex
            flexDir="row"
            justifyContent="center"
            alignItems="center"
            color="gray.500"
          >
            <Link href="/history">
              <Button mt={2} backgroundColor="gray.200">
                History
                <Icon as={RiHistoryLine} ml={2} />
              </Button>
            </Link>

            {currentUser.Tasks.length > 0 ? (
              <></>
            ) : (
              <Flex
                backgroundColor="gray.200"
                w="100%"
                borderRadius={10}
                padding={2}
                mt={4}
              >
                No Tasks Found . . . .
              </Flex>
            )}
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
  async getServerSideProps({ req, query }) {
    const {
      user: { email },
    } = await getSession(req)

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

    //Getting the sum of completed task fibonacci
    const completedTasksInProjects = await prisma.project.findMany({
      where: { ownerId: currentUser?.id, completed: false },
      include: {
        Tasks: {
          where: {
            completed: true,
          },
        },
      },
    })

    const completedTaskTotalPriorityArray = []

    for (let project of completedTasksInProjects) {
      let tasks_completed_sum = 0
      for (let task of project.Tasks) {
        tasks_completed_sum += task.priority
      }
      completedTaskTotalPriorityArray.push(tasks_completed_sum)
    }

    //Getting the sum of uncompleted task fibonacci
    const uncompletedTasksInProjects = await prisma.project.findMany({
      where: { ownerId: currentUser?.id, completed: false },
      include: {
        Tasks: {
          where: {
            completed: false,
          },
        },
      },
    })

    const uncompletedTaskTotalPriorityArray = []

    for (let project of uncompletedTasksInProjects) {
      let tasks_uncompleted_sum = 0
      for (let task of project.Tasks) {
        tasks_uncompleted_sum += task.priority
      }
      uncompletedTaskTotalPriorityArray.push(tasks_uncompleted_sum)
    }

    const searchTerm = query.searchterm
    var taskSearchResult = ''
    var projectSearchResult = ''

    if (searchTerm?.length > 0) {
      taskSearchResult = await prisma.task.findMany({
        where: {
          title: {
            search: searchTerm,
          },
        },
        include: {
          Project: true,
        },
      })

      projectSearchResult = await prisma.project.findMany({
        where: {
          title: {
            search: searchTerm,
          },
        },
      })
    }

    await prisma.$disconnect()

    return {
      props: {
        currentUser: JSON.parse(JSON.stringify(currentUser)),
        completedTaskTotalPriorityArray: completedTaskTotalPriorityArray,
        uncompletedTaskTotalPriorityArray: uncompletedTaskTotalPriorityArray,
        taskSearchResult: JSON.parse(JSON.stringify(taskSearchResult)),
        projectSearchResult: JSON.parse(JSON.stringify(projectSearchResult)),
      },
    }
  },
})

export default Overview
