import React from 'react'
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
} from '@chakra-ui/react'
import NavigationColumnLogo from './NavigationColumnLogo'
import Navigation from './Navigation'
import UserProfile from '../UserProfile'

function NavigationColumn() {
  return (
    <>
      <Flex
        flexDir="column"
        h={[null, null, '100vh']}
        justifyContent="space-between"
      >
        <Flex as="nav">
          <NavigationColumnLogo />
        </Flex>
      </Flex>
    </>
  )
}

export default NavigationColumn
