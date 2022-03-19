import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tag,
  Tbody,
  Text,
} from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'
import { intervalToDuration } from 'date-fns'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BsClockFill } from 'react-icons/bs'
import { HiOutlineClipboardList } from 'react-icons/hi'
import CompletedTaskTableRow from '../../components/CompletedTaskTableRow'
import Navigation from '../../components/navigation_column/Navigation'
import NavigationColumnLogo from '../../components/navigation_column/NavigationColumnLogo'
import OverviewRightColumn from '../../components/overview_right_column/OverviewRightColumn'
import TaskTableRow from '../../components/TaskTableRow'

const ProjectPage = ({ project }) => {
  const [remainingYears, setRemainingYears] = useState(0)
  const [remainingMonths, setRemainingMonths] = useState(0)
  const [remainingDays, setRemainingDays] = useState(0)
  const [pastDue, setPastDue] = useState(false)

  var incompleteTasks = project.Tasks.filter(function (task) {
    return task.completed === false
  })
  var completeTasks = project.Tasks.filter(function (task) {
    return task.completed === true
  })

  const remaining = () => {
    const endDate = project.dueDate
    const now = new Date()
    if (endDate) {
      const end = new Date(endDate)

      if (now > end) {
        setPastDue(true)
      }

      return intervalToDuration({
        start: now,
        end: end,
      })
    }
  }

  useEffect(() => {
    const dur = remaining()

    if (dur && pastDue === false) {
      const { years, months, days } = dur
      setRemainingYears(years)
      setRemainingMonths(months)
      setRemainingDays(days)
    }
  }, [])

  return (
    <>
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
            <Avatar src={project.image} size="lg" mb={2} />
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
              <Text fontSize="sm" ml={1}>
                {pastDue === true ? 'Past Due by ' : ''}
                {remainingYears > 0
                  ? `${remainingYears} years, ${remainingMonths} months, ${remainingDays} days`
                  : remainingMonths > 0
                  ? `${remainingMonths} months, ${remainingDays} days`
                  : remainingMonths === 0 && remainingDays > 0
                  ? `${remainingDays} days`
                  : remainingDays === 0
                  ? `Today`
                  : 'Error'}
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

          <Heading size="lg" mt={4}>
            Completed Tasks
          </Heading>

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
              <></>
            ) : (
              <Flex w="100%" borderRadius={10} padding={2} mt={2}>
                0 Completed Projects Found . . . .
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
          backgroundColor="gray.600"
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

    const slugString = params.slug.toString()

    const project = await prisma.project.findUnique({
      where: {
        id: slugString,
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
