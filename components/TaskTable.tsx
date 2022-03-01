import React from 'react'
import NextLink from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { getUserByEmail } from '../utils/db'
import { Flex, Table, Tbody, Button, Icon } from '@chakra-ui/react'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'
import TaskTableRow from './TaskTableRow'
import { PrismaClient } from '@prisma/client'

function TaskTable() {
  return (
    <>
      <Flex flexDir="column">
        <NextLink href="/tasks/createtask">
          <Button width="fit-content" colorScheme="purple" mt={2}>
            + Create Task
          </Button>
        </NextLink>
        <Flex overflow="auto">
          <Table mt={4} borderBottom="4px" borderColor="#e3e3e3">
            <Tbody>
              <TaskTableRow />
              <TaskTableRow />
              <TaskTableRow />
              <TaskTableRow />
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
            All Tasks
            <Icon as={MdOutlineArrowDropDownCircle} ml={2} />
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default TaskTable
