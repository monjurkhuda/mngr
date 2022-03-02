import React, { useState } from 'react'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
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
import { RiCalendarEventLine } from 'react-icons/ri'
import { FiChevronUp, FiChevronDown, FiSearch, FiBell } from 'react-icons/fi'
import { IoIosExit, IoMdExit } from 'react-icons/io'
import TaskTable from '../TaskTable'

function OverviewRightColumn(props) {
  const { username, profileimage, email } = props

  const today = format(new Date(), 'MMM d, yyyy')

  return (
    <>
      <Flex
        flexDir="row"
        justifyContent="flex-end"
        alignItems="center"
        mb={4}
        color="white"
      >
        <RiCalendarEventLine size={24} />
        <Text fontWeight="500" ml={2}>
          {today}
        </Text>
      </Flex>
      <Flex
        backgroundColor="white"
        w="100%"
        h="fit-content"
        p={4}
        borderRadius={10}
        boxShadow="base"
        direction="column"
        mb={4}
      >
        <Flex>
          <Heading size="md">My Profile:</Heading>
        </Flex>
        <Flex mt={4}>
          <Avatar src={profileimage} size="lg"></Avatar>
          <Flex direction="column" ml={4}>
            <Text fontSize="lg" fontWeight="700" color="blackAlpha.700">
              {username}
            </Text>
            <Text fontSize="md" color="blackAlpha.800" mt={1}>
              {email}
            </Text>
          </Flex>
        </Flex>
        <Flex mt={4} justifyContent="flex-end">
          <Button colorScheme="purple">Edit Profile</Button>
          <Button colorScheme="pink" ml={6}>
            Sign Out
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default OverviewRightColumn
