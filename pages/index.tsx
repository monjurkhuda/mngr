import { Button, Flex, Link, Heading } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  return (
    <Flex
      height="100vh"
      width="100%"
      flexDir="column"
      overflow="hidden"
      justifyContent="center"
      alignItems="center"
    >
      <Head>
        <title>Overview. M: Project Management Simplified</title>
      </Head>

      <Flex
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        backgroundColor="black"
        w="50px"
        h="50px"
        mb={[2, 2, 2]}
      >
        <Heading fontSize="2xl" color="white">
          M
        </Heading>
        <Heading fontSize="4xl" color="yellow.400">
          .
        </Heading>
      </Flex>

      <Heading size="md" mb={10}>
        Project Management Simplified
      </Heading>

      <Link href="/overview">
        <Button size="lg" colorScheme="purple">
          Login
        </Button>
      </Link>
    </Flex>
  )
}
