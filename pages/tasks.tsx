import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Button, Flex, Heading, Icon, Table, Tbody } from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import NextLink from 'next/link'
import { CgArrowTopRightR } from 'react-icons/cg'
import { RiTaskLine } from 'react-icons/ri'
import CompletedTaskTableRow from '../components/CompletedTaskTableRow'
import NavigationColumn from '../components/navigation_column/NavigationColumn'
import OverviewRightColumn from '../components/overview_right_column/OverviewRightColumn'
import TaskTableRow from '../components/TaskTableRow'

function Overview({
  currentUser,
  completedTaskTotalPriorityArray,
  uncompletedTaskTotalPriorityArray,
}) {
  var incompleteTasks = currentUser.Tasks.filter(function (task) {
    return task.completed === false
  })
  var completeTasks = currentUser.Tasks.filter(function (task) {
    return task.completed === true
  })

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
              <RiTaskLine size={32} />
              <Heading as="h2" size="lg" letterSpacing="tight" ml={1}>
                Tasks
              </Heading>
            </Flex>
            <NextLink href="/tasks/createtask">
              <Button
                width="fit-content"
                height="100%"
                colorScheme="purple"
                mt={2}
              >
                + Create Task
              </Button>
            </NextLink>
          </Flex>

          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              {incompleteTasks.map(
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

          <Flex justifyContent="space-between" mt={8}>
            <Flex align="flex-end">
              <RiTaskLine size={40} color="white" />
              <Heading as="h2" size="xl" color="white">
                Completed Tasks
              </Heading>
            </Flex>
          </Flex>

          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              {completeTasks
                .slice(0, 5)
                .map(
                  ({
                    id,
                    title,
                    description,
                    priority,
                    dueDate,
                    Project,
                    slug,
                    completedAt,
                  }) => (
                    <CompletedTaskTableRow
                      id={id}
                      key={id}
                      title={title}
                      description={description}
                      priority={priority}
                      dueDate={dueDate}
                      slug={slug}
                      completedAt={completedAt}
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
            {completeTasks.length > 0 ? (
              <Button mt={2} colorScheme="yellow">
                History
                <Icon as={CgArrowTopRightR} ml={2} />
              </Button>
            ) : (
              <Flex
                backgroundColor="purple.500"
                w="100%"
                color="white"
                borderRadius={10}
                padding={2}
                mt={4}
              >
                0 Completed Tasks Found . . . .
              </Flex>
            )}
          </Flex>
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

    const currentUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        Tasks: {
          orderBy: { dueDate: 'asc' },
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
      where: { ownerId: currentUser?.id },
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
      where: { ownerId: currentUser?.id },
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

    await prisma.$disconnect()

    return {
      props: {
        currentUser: JSON.parse(JSON.stringify(currentUser)),
        completedTaskTotalPriorityArray: completedTaskTotalPriorityArray,
        uncompletedTaskTotalPriorityArray: uncompletedTaskTotalPriorityArray,
      },
    }
  },
})

export default Overview
