import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import {
  CircularProgress,
  Flex,
  Heading,
  Avatar,
  Text,
  IconButton,
  Tag,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Box,
  Icon,
  Tooltip,
  Button,
} from '@chakra-ui/react'
import {
  HiOutlineClipboardList,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi'
import { BsQuestionSquare, BsClock, BsClockFill } from 'react-icons/bs'

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
  const [remainingYears, setRemainingYears] = useState(0)
  const [remainingMonths, setRemainingMonths] = useState(0)
  const [remainingDays, setRemainingDays] = useState(0)

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
