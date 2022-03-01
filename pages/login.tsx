import Link from 'next/link'
import { Flex, Heading, Input, Button } from '@chakra-ui/react'
import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordFill } from 'react-icons/ri'

export default function Login() {
  return (
    <Flex backgroundColor="#f6f6f6" alignItems="center" justifyContent="center">
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        color="black"
      >
        <Flex
          direction="column"
          alignItems="center"
          background="white"
          boxShadow="lg"
          p={12}
          rounded={6}
        >
          <Flex>
            <Heading
              fontSize="4xl"
              color="white"
              padding="20px"
              borderRadius="50px"
              alignSelf="center"
              letterSpacing="tight"
              backgroundColor="black"
              mb={3}
            >
              M.
            </Heading>
          </Flex>
          <Heading size="md">Log In</Heading>

          <Flex direction="row" alignItems="center" mt={6}>
            <HiOutlineMail size="1.6em" />
            <Input placeholder="Email" variant="filled" type="email" ml={3} />
          </Flex>
          <Flex direction="row" alignItems="center" mt={6}>
            <RiLockPasswordFill size="1.6em" />
            <Input
              placeholder="Password"
              variant="filled"
              ml={3}
              type="password"
            />
          </Flex>
          <Link href="/overview" passHref>
            <Button mt={6} backgroundColor="purple.500" colorScheme="purple">
              Log In
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}
