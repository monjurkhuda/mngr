import { Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react'

function NavigationColumnLogo() {
  return (
    <Link href="/overview">
      <Flex
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        backgroundColor="black"
        w="50px"
        h="50px"
        mt={[2, 2, 100]}
        mb={[2, 2, 100]}
      >
        <Heading fontSize="2xl" color="white">
          M
        </Heading>
        <Heading fontSize="4xl" color="yellow.400">
          .
        </Heading>
      </Flex>
    </Link>
  )
}

export default NavigationColumnLogo
