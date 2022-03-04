import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { intervalToDuration } from 'date-fns'
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

async function completeTaskApi(task) {
  const response = await fetch('/api/completetask', {
    method: 'PUT',
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

function TaskTableRow(props) {
  const [remainingYears, setRemainingYears] = useState(0)
  const [remainingMonths, setRemainingMonths] = useState(0)
  const [remainingDays, setRemainingDays] = useState(0)
  const [pastDue, setPastDue] = useState(false)

  const { id, title, priority, description, projectTitle, slug } = props

  const remaining = () => {
    const endDate = props?.dueDate
    const now = new Date()
    if (endDate) {
      const end = new Date(endDate)

      if (now > end) {
        setPastDue(true)
      }

      return intervalToDuration({
        start: now,
        end: end,
      })
    }
  }

  useEffect(() => {
    const dur = remaining()

    if (dur && pastDue === false) {
      const { years, months, days } = dur
      setRemainingYears(years)
      setRemainingMonths(months)
      setRemainingDays(days)
    }
  }, [])

  return (
    <Tr backgroundColor="white" borderTop="2px" borderColor="#f6f6f6">
      <Td>
        <Flex align="center">
          <Avatar
            boxShadow="md"
            size="md"
            mr={4}
            ml={4}
            src="https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png"
          />
          <Flex flexDir="column">
            <Flex flexDir="row" alignItems="center">
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

              <Button
                ml={4}
                size="xs"
                boxShadow="base"
                colorScheme="red"
                onClick={() => {
                  completeTaskApi(props)
                }}
              >
                Mark Complete
              </Button>
            </Flex>
            <Flex mt={2} backgroundColor="gray.100">
              <Text fontSize="sm" color="gray.600" padding={2}>
                {description}
              </Text>
            </Flex>
            <Flex flexDir="row" alignItems="center" mt={2}>
              <HiOutlineClipboardList size={20} />
              <Text fontSize="sm" ml={1}>
                {projectTitle}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          mt={1}
        >
          <Flex flexDir="row" alignItems="center" ml={20}>
            <Icon as={BsClockFill}></Icon>
            <Text fontSize="sm" ml={2}>
              {pastDue === true ? 'Past Due by ' : ''}
              {remainingYears > 0
                ? `${remainingYears} years, ${remainingMonths} months, ${remainingDays} days`
                : remainingMonths > 0
                ? `${remainingMonths} months, ${remainingDays} days`
                : remainingMonths === 0 && remainingDays > 0
                ? `${remainingDays} days`
                : remainingDays === 0
                ? `Today`
                : 'Error'}
            </Text>
          </Flex>
        </Flex>
      </Td>
    </Tr>
  )
}

export default TaskTableRow
