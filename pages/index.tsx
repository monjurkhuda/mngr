import { Button, Flex, Link } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  return (
    <Flex
      height={[null, null, '100vh']}
      width="100%"
      flexDir={['column', 'column', 'row']}
      overflow="hidden"
      justifyContent="center"
      alignItems="center"
    >
      <Head>
        <title>Overview. M: Project Management Simplified</title>
      </Head>
      <Link href="/overview">
        <Button size="lg" colorScheme="purple">
          Login
        </Button>
      </Link>
    </Flex>
  )
}
