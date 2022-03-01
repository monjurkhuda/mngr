import React from 'react'
import {
  Flex,
  Heading,
  Avatar,
  Text,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Button,
  Icon,
} from '@chakra-ui/react'
import { FiChevronRight } from 'react-icons/fi'
import {
  BsArrowDownRightSquare,
  BsArrowDownRightSquareFill,
} from 'react-icons/bs'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'
MdOutlineArrowDropDownCircle
import ProjectTableRow from './ProjectTableRow'

function ProjectTable() {
  return (
    <>
      <Flex flexDir="column">
        <Flex overflow="auto">
          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              <ProjectTableRow />
              <ProjectTableRow />
              <ProjectTableRow />
              <ProjectTableRow />
            </Tbody>
          </Table>
        </Flex>
        <Flex
          flexDir="row"
          justifyContent="center"
          alignItems="center"
          color="gray.500"
        >
          <Button mt={2} backgroundColor="gray.200">
            All Projects
            <Icon as={MdOutlineArrowDropDownCircle} ml={2} />
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default ProjectTable
