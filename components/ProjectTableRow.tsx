import {
  Avatar,
  Button,
  Flex,
  Icon,
  Progress,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react'
import { intervalToDuration } from 'date-fns'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsClockFill } from 'react-icons/bs'
import { MdOutlineDone } from 'react-icons/md'

function ProjectTableRow(props) {
  const [remainingYears, setRemainingYears] = useState(0)
  const [remainingMonths, setRemainingMonths] = useState(0)
  const [remainingDays, setRemainingDays] = useState(0)
  const [pastDue, setPastDue] = useState(false)

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

  const {
    id,
    image,
    title,
    description,
    tasks_completed_sum,
    tasks_uncompleted_sum,
  } = props

  function projectCompletedPercentage() {
    if (tasks_completed_sum === 0 && tasks_uncompleted_sum === 0) {
      return 0
    } else if (tasks_completed_sum && tasks_uncompleted_sum) {
      return Math.round(
        (tasks_completed_sum * 100) /
          (tasks_completed_sum + tasks_uncompleted_sum)
      )
    } else if (tasks_uncompleted_sum === 0) {
      return 100
    } else {
      return 0
    }
  }

  async function completeProjectApi(project) {
    const response = await fetch('/api/completeproject', {
      method: 'PUT',
      body: JSON.stringify(project),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return await response.json()
  }

  return (
    <Tr backgroundColor="white" borderTop="2px" borderColor="#f6f6f6">
      <Td>
        <Flex direction="column" w="100%">
          <Flex alignItems="center">
            <Avatar boxShadow="md" size="md" mr={2} src={image} />
            <Text fontSize="lg" fontWeight={600}>
              <Link href={`/projects/${id}`}>{title}</Link>
            </Text>
          </Flex>

          <Flex mt={2} backgroundColor="gray.50">
            <Text fontSize="sm" color="gray.600" padding={2}>
              {description}
            </Text>
          </Flex>

          <Progress
            value={projectCompletedPercentage()}
            height={2}
            colorScheme="green"
            mt={2}
          />
          <Text fontSize="sm" borderRadius={10}>
            {`${projectCompletedPercentage()} % Completed`}
          </Text>

          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
          >
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

            {projectCompletedPercentage() === 100 ? (
              <Button
                size="xs"
                width="fit-content"
                colorScheme="green"
                boxShadow="base"
                onClick={() => {
                  completeProjectApi(props)
                }}
              >
                <MdOutlineDone size={20} />
              </Button>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
      </Td>
    </Tr>
  )
}

export default ProjectTableRow
