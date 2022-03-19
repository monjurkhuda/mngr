import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Table,
  Tbody,
} from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import { useState } from 'react'
import { GoSearch } from 'react-icons/go'
import Navigation from '../components/navigation_column/Navigation'
import NavigationColumnLogo from '../components/navigation_column/NavigationColumnLogo'
import OverviewRightColumn from '../components/overview_right_column/OverviewRightColumn'
import ProjectSearchResult from '../components/search_result/ProjectSearchResult'
import TaskSearchResult from '../components/search_result/TaskSearchResult'

function Users({ taskSearchResult, projectSearchResult }) {
  const [searchTerm, setSearchTerm] = useState('')
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
          <Flex justifyContent="space-between" mt={8}>
            <Flex align="flex-end">
              <GoSearch size={32} />
              <Heading as="h2" size="lg" letterSpacing="tight" ml={1}>
                Search
              </Heading>
            </Flex>
          </Flex>

          <Flex mt={4} mb={4}>
            <InputGroup
              bgColor="#fff"
              border="none"
              borderColor="#fff"
              borderRadius="10px"
            >
              <InputLeftElement pointerEvents="none"></InputLeftElement>
              <Input
                placeholder="Search"
                _placeholder={{ color: 'gray' }}
                color="black"
                borderRadius="10px"
                boxShadow="base"
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
              />
            </InputGroup>
            <Link href={`?searchterm=${searchTerm}`}>
              <Button
                borderRadius="10px"
                boxShadow="base"
                ml={4}
                colorScheme="yellow"
              >
                Search
              </Button>
            </Link>
          </Flex>

          {(taskSearchResult.length || projectSearchResult.length) > 0 ? (
            <>
              <Heading size="lg" color="gray.600" mb={2}>
                Search Results
              </Heading>
              <Divider />
            </>
          ) : (
            <></>
          )}

          {taskSearchResult.length > 0 ? (
            <Flex direction="column">
              <Heading size="md" color="gray.600" mt={4}>
                Tasks
              </Heading>
              <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
                <Tbody>
                  {taskSearchResult.map(
                    ({ id, title, description, priority, Project }) => (
                      <TaskSearchResult
                        id={id}
                        key={id}
                        title={title}
                        description={description}
                        priority={priority}
                        projectTitle={Project[0].title}
                      />
                    )
                  )}
                </Tbody>
              </Table>
            </Flex>
          ) : (
            <></>
          )}

          {projectSearchResult.length > 0 ? (
            <Flex direction="column">
              <Heading size="md" color="gray.600" mt={4}>
                Projects
              </Heading>
              <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
                <Tbody>
                  {projectSearchResult.map(
                    ({ id, image, title, description }, index) => (
                      <ProjectSearchResult
                        key={id}
                        id={id}
                        title={title}
                        description={description}
                        image={image}
                      />
                    )
                  )}
                </Tbody>
              </Table>
            </Flex>
          ) : (
            <></>
          )}
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
  async getServerSideProps({ req, res, query }) {
    const {
      user: { email },
    } = await getSession(req, res)

    const prisma = new PrismaClient()

    const searchTerm = query.searchterm
    const searchTermString = searchTerm.toString()
    var taskSearchResult = ''
    var projectSearchResult = ''

    if (searchTerm?.length > 0) {
      const taskSearch = await prisma.task.findMany({
        where: {
          title: {
            search: searchTermString,
          },
        },
        include: {
          Project: true,
        },
      })

      taskSearchResult = JSON.stringify(taskSearch)

      const projectSearch = await prisma.project.findMany({
        where: {
          title: {
            search: searchTermString,
          },
        },
      })

      projectSearchResult = JSON.stringify(projectSearch)
    }

    await prisma.$disconnect()

    return {
      props: {
        taskSearchResult: JSON.parse(taskSearchResult),
        projectSearchResult: JSON.parse(projectSearchResult),
      },
    }
  },
})

export default Users
