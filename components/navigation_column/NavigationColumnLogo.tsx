import React from 'react'
import { Flex, Text, Heading } from '@chakra-ui/react'

function NavigationColumnLogo() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      backgroundColor="black"
      w="50px"
      h="50px"
      mt={[2, 50, 100]}
      mb={[2, 50, 100]}
    >
      <Heading fontSize="2xl" color="white">
        M
      </Heading>
      <Heading fontSize="4xl" color="yellow.400">
        .
      </Heading>
    </Flex>
  )
}

export default NavigationColumnLogo
