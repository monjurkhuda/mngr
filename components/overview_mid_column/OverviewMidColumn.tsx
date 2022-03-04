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
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import {
  RiSettings5Line,
  RiEyeLine,
  RiPencilRuler2Line,
  RiTaskLine,
  RiCalendarEventLine,
  RiFullscreenExitFill,
} from 'react-icons/ri'
import { HiOutlineClipboardList } from 'react-icons/hi'

import TaskTable from '../TaskTable'
import ProjectTable from '../ProjectTable'

function OverviewMidColumn() {
  const [display, setDisplay] = useState('hide')

  return (
    <>
      <Flex justifyContent="space-between" mt={8}>
        <Flex align="flex-end">
          <RiFullscreenExitFill size={32} />
          <Heading as="h2" size="lg" letterSpacing="tight" ml={2}>
            Projects
          </Heading>
          <Icon as={RiCalendarEventLine} ml={6} mb={1}></Icon>
          <Text fontSize="small" ml={2} mb={1}>
            Nov 11, 2021
          </Text>
        </Flex>
      </Flex>

      <ProjectTable />
    </>
  )
}

export default OverviewMidColumn
