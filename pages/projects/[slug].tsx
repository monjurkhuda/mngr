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
import TaskPage from '../tasks/[slug]'
import OverviewRightColumn from '../../components/overview_right_column/OverviewRightColumn'
import { RiTaskLine } from 'react-icons/ri'
import { CgArrowTopRightR } from 'react-icons/cg'
import TaskTableRow from '../../components/TaskTableRow'
import CompletedTaskTableRow from '../../components/CompletedTaskTableRow'
import { BsClockFill } from 'react-icons/bs'
import { HiOutlineClipboardList } from 'react-icons/hi'

const ProjectPage = ({ project }) => {
  var incompleteTasks = project.Tasks.filter(function (task) {
    return task.completed === false
  })
  var completeTasks = project.Tasks.filter(function (task) {
    return task.completed === true
  })

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
            <HiOutlineClipboardList size={32} />
            <Heading as="h2" size="lg" letterSpacing="tight" ml={1}>
              Project
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
              <Heading size="md">{project.title}</Heading>
              {project.completed === true ? (
                <Tag ml={2}>✔️ Completed</Tag>
              ) : (
                <></>
              )}
            </Flex>
            <Text mt={2}>{project.description}</Text>
            <Link href={`/projects/editproject/${project.id}`}>
              <Button w="fit-content" mt={2} colorScheme="yellow">
                Edit Project
              </Button>
            </Link>

            <Flex alignItems="center" justifyContent="flex-end">
              <Icon as={BsClockFill}></Icon>
              <Text fontSize="sm" ml={2}>
                {`Due: ${project.dueDate}`}
              </Text>
            </Flex>
          </Flex>

          {project.completed === true ? (
            <></>
          ) : (
            <Heading size="lg" mt={4}>
              Pending Tasks:
            </Heading>
          )}
          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              {incompleteTasks.map((task) => (
                <TaskTableRow
                  id={task.id}
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  dueDate={task.dueDate}
                  slug={task.slug}
                  projectTitle={project.title}
                />
              ))}
            </Tbody>
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
              {project.Tasks.map((task) =>
                task.completed === true ? (
                  <CompletedTaskTableRow
                    id={task.id}
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    slug={task.slug}
                    completedAt={task.completedAt}
                    projectTitle={project.title}
                  />
                ) : (
                  <></>
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
  async getServerSideProps({ params }) {
    const prisma = new PrismaClient()

    const project = await prisma.project.findUnique({
      where: {
        id: params.slug,
      },
      include: {
        Tasks: true,
      },
    })

    await prisma.$disconnect()

    return {
      props: {
        project: JSON.parse(JSON.stringify(project)),
      },
    }
  },
})

export default ProjectPage
