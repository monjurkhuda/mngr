import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Flex, Heading, Table, Tbody } from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'
import Head from 'next/head'
import { RiHistoryLine } from 'react-icons/ri'
import CompletedProjectTableRow from '../components/CompletedProjectTableRow'
import NavigationColumn from '../components/navigation_column/NavigationColumn'
import OverviewRightColumn from '../components/overview_right_column/OverviewRightColumn'

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
        <NavigationColumn />

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
              <RiHistoryLine size={32} />
              <Heading as="h2" size="lg" letterSpacing="tight" ml={1}>
                Completed Projects
              </Heading>
            </Flex>
          </Flex>

          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              {completeProjects.map(
                ({
                  id,
                  title,
                  image,
                  description,
                  slug,
                  completedAt,
                  createdAt,
                }) => (
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
          backgroundColor="gray.600"
        >
          <OverviewRightColumn />
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const {
      user: { email },
    } = await getSession(req, res)

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
