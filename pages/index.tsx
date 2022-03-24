import { Button, Flex, Link, Heading, Text } from '@chakra-ui/react'
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

      <Heading size="md" mb={4}>
        Project Management Simplified
      </Heading>

      <Link href="/overview">
        <Button size="lg" colorScheme="purple" boxShadow="base">
          Login
        </Button>
      </Link>

      <Flex
        direction="column"
        p={4}
        borderRadius={10}
        backgroundColor="gray.50"
        mt={4}
        boxShadow="base"
      >
        <Text size="md" fontWeight="600" mb={1}>
          Demo Account
        </Text>

        <Text size="md" mb={1}>
          Username: demo@demo.com
        </Text>

        <Text size="md">Password: @Demouser1234</Text>
      </Flex>
    </Flex>
  )
}
