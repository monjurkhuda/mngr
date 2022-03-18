import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Table,
  Tbody,
  Text,
} from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import NextLink from 'next/link'
import { CgArrowTopRightR } from 'react-icons/cg'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { RiHistoryLine, RiTaskLine } from 'react-icons/ri'
import CompletedProjectTableRow from '../components/CompletedProjectTableRow'
import Navigation from '../components/navigation_column/Navigation'
import NavigationColumn from '../components/navigation_column/NavigationColumn'
import NavigationColumnLogo from '../components/navigation_column/NavigationColumnLogo'
import OverviewRightColumn from '../components/overview_right_column/OverviewRightColumn'
import ProjectTableRow from '../components/ProjectTableRow'

function Overview({
  currentUser,
  completedTaskTotalPriorityArray,
  uncompletedTaskTotalPriorityArray,
  completeProjects,
}) {
  var incompleteProjects = currentUser.Projects.filter(function (project) {
    return project.completed === false
  })
  var completeProjects = currentUser.Projects.filter(function (project) {
    return project.completed === true
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
              <Link href="/overview">
                <Button size="md" borderRadius={10}>
                  <RiTaskLine size={20} />
                  Tasks
                </Button>
              </Link>
              <Button colorScheme="purple" size="md" borderRadius={10} ml={4}>
                <HiOutlineClipboardList size={22} />
                Projects
              </Button>
            </Flex>
          </Flex>
          {/*Tasks table */}
          <Flex justifyContent="space-between" mt={2}>
            <Flex align="flex-end">
              <HiOutlineClipboardList size={32} />
              <Heading as="h2" size="lg" letterSpacing="tight" ml={1}>
                Projects
              </Heading>
            </Flex>
            <NextLink href="/projects/createproject">
              <Button width="fit-content" colorScheme="yellow">
                <Text fontSize={20}>+</Text>
              </Button>
            </NextLink>
          </Flex>

          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              {incompleteProjects.map(
                ({ id, image, title, description, dueDate, slug }, index) => (
                  <ProjectTableRow
                    key={id}
                    id={id}
                    title={title}
                    image={image}
                    description={description}
                    dueDate={dueDate}
                    tasks_uncompleted_sum={
                      uncompletedTaskTotalPriorityArray[index]
                    }
                    tasks_completed_sum={completedTaskTotalPriorityArray[index]}
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
                No Projects Found . . . .
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
              <HiOutlineClipboardList size={40} color="white" />
              <Heading as="h2" size="xl" color="white">
                Completed Projects
              </Heading>
            </Flex>
          </Flex>

          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              {completeProjects
                .slice(0, 4)
                .map(
                  (
                    {
                      id,
                      image,
                      title,
                      description,
                      slug,
                      completedAt,
                      createdAt,
                    },
                    index
                  ) => (
                    <CompletedProjectTableRow
                      key={id}
                      id={id}
                      title={title}
                      image={image}
                      description={description}
                      completedAt={completedAt}
                      createdAt={createdAt}
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
            {completeProjects.length > 0 ? (
              <Button mt={2} colorScheme="yellow" boxShadow="base">
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
                0 Completed Projects Found . . . .
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

    //Getting completed Projects
    const completeProjects = await prisma.project.findMany({
      where: { ownerId: currentUser?.id, completed: true },
    })

    await prisma.$disconnect()

    return {
      props: {
        currentUser: JSON.parse(JSON.stringify(currentUser)),
        completeProjects: JSON.parse(JSON.stringify(completeProjects)),
        completedTaskTotalPriorityArray: completedTaskTotalPriorityArray,
        uncompletedTaskTotalPriorityArray: uncompletedTaskTotalPriorityArray,
      },
    }
  },
})

export default Overview
