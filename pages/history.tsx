import react, { useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import {
  withPageAuthRequired,
  useUser,
  getSession,
  UserProvider,
} from '@auth0/nextjs-auth0'
import { PrismaClient } from '@prisma/client'
import NextLink from 'next/link'

import { RootState } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUserEmail } from '../redux/slices/currentUserSlice'

import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
} from '@chakra-ui/react'
import { HiOutlineClipboardList } from 'react-icons/hi'
import {
  RiSettings5Line,
  RiEyeLine,
  RiPencilRuler2Line,
  RiTaskLine,
  RiCalendarEventLine,
  RiFullscreenExitFill,
  RiHistoryLine,
} from 'react-icons/ri'
import { CgArrowTopRightR } from 'react-icons/cg'
import NavigationColumn from '../components/navigation_column/NavigationColumn'
import OverviewMidColumn from '../components/overview_mid_column/OverviewMidColumn'
import OverviewRightColumn from '../components/overview_right_column/OverviewRightColumn'
import TaskTable from '../components/TaskTable'
import TaskTableRow from '../components/TaskTableRow'
import ProjectTableRow from '../components/ProjectTableRow'
import CompletedProjectTableRow from '../components/CompletedProjectTableRow'

function History({ currentUser }) {
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
              <RiHistoryLine size={32} />
              <Heading as="h2" size="lg" letterSpacing="tight" ml={1}>
                History
              </Heading>
              <Icon as={RiCalendarEventLine} ml={6} mb={1}></Icon>
              <Text fontSize="small" ml={2} mb={1}>
                Nov 11, 2021
              </Text>
            </Flex>
          </Flex>

          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              {completeProjects.map(
                (
                  { id, title, description, slug, completedAt, createdAt },
                  index
                ) => (
                  <CompletedProjectTableRow
                    key={id}
                    id={id}
                    title={title}
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
              <></>
            ) : (
              <Flex
                backgroundColor="gray.200"
                w="100%"
                borderRadius={10}
                padding={2}
                mt={4}
              >
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
          backgroundColor="purple.400"
        >
          <OverviewRightColumn />
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

export default History
