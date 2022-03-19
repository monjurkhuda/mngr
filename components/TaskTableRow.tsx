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
import { intervalToDuration } from 'date-fns'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsClockFill, BsQuestionSquare } from 'react-icons/bs'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { MdOutlineDone } from 'react-icons/md'

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
        <Flex direction="column" w="100%">
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
          <Flex mt={2} backgroundColor="gray.50">
            <Text fontSize="sm" color="gray.600" padding={2}>
              {description}
            </Text>
          </Flex>

          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Flex flexDir="row" alignItems="center">
              <HiOutlineClipboardList size={20} />
              <Text fontSize="sm" ml={1}>
                {projectTitle}
              </Text>
            </Flex>
            <Flex flexDir="row" alignItems="center">
              <Icon as={BsClockFill}></Icon>
              <Text fontSize="sm" ml={2}>
                {pastDue === true ? 'Late by ' : ''}
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
            <Button
              size="xs"
              boxShadow="base"
              colorScheme="green"
              onClick={() => {
                completeTaskApi(props)
              }}
            >
              <MdOutlineDone size={20} />
            </Button>
          </Flex>
        </Flex>
      </Td>
    </Tr>
  )
}

export default TaskTableRow
