import React, { useState } from 'react'
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

function OverviewRightColumn() {
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
          Nov 11, 2021
        </Text>
      </Flex>
    </>
  )
}

export default OverviewRightColumn
