import {
  Box,
  Button,
  Flex,
  Icon,
  Td,
  Text,
  Tooltip,
  Tr,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import { BsQuestionSquare } from 'react-icons/bs'
import { HiOutlineClipboardList } from 'react-icons/hi'

async function uncompleteTaskApi(task) {
  const response = await fetch('/api/uncompletetask', {
    method: 'PUT',
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

function CompletedTaskTableRow(props) {
  const { id, title, priority, description, projectTitle, completedAt, slug } =
    props

  const completedAtFormatted = format(new Date(completedAt), 'MMM do, Y')

  return (
    <Tr backgroundColor="white" borderTop="2px" borderColor="#f6f6f6">
      <Td>
        <Flex direction="column" width="100%">
          <Flex alignItems="center">
            <Flex alignItems="center">
              <Text fontSize="lg" fontWeight={600}>
                <Link href={`/tasks/${id}`}>{title}</Link>
              </Text>

              <Box
                boxSize={5}
                backgroundColor="purple.500"
                ml={2}
                borderRadius={4}
              >
                <Flex
                  flexDir="column"
                  textColor="white"
                  fontWeight="600"
                  fontSize="sm"
                  alignItems="center"
                >
                  {priority}
                </Flex>
              </Box>
              <Tooltip
                label="Priority is set in Fibonacci numbers, from 1 to 40."
                hasArrow
                bg="gold"
                textColor="blackAlpha.800"
              >
                <span>
                  <Icon as={BsQuestionSquare} color="gray.500" ml={1}></Icon>
                </span>
              </Tooltip>
            </Flex>
          </Flex>
          <Flex mt={2} backgroundColor="gray.50">
            <Text fontSize="sm" color="gray.600" padding={2}>
              {description}
            </Text>
          </Flex>

          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
          >
            <Flex alignItems="center">
              <HiOutlineClipboardList size={20} />
              <Text fontSize="sm" ml={1}>
                {projectTitle}
              </Text>
            </Flex>

            <Text fontSize="sm">Completed: {completedAtFormatted}</Text>
          </Flex>

          <Button
            mt={2}
            colorScheme="red"
            boxShadow="base"
            onClick={() => {
              uncompleteTaskApi(props)
            }}
          >
            Mark Incomplete
          </Button>
        </Flex>
      </Td>
    </Tr>
  )
}

export default CompletedTaskTableRow
