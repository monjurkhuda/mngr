import React from 'react'
import Link from 'next/link'
import {
  CircularProgress,
  CircularProgressLabel,
  Progress,
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
  Button,
} from '@chakra-ui/react'
import {
  HiOutlineClipboardList,
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi'
import { BsQuestionSquare, BsClock, BsClockFill } from 'react-icons/bs'

function ProjectTableRow(props) {
  const { id, title, description, tasks_completed_sum, tasks_uncompleted_sum } =
    props

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
                <Link href={`/projects/${id}`}>{title}</Link>
              </Text>
            </Flex>

            <Progress
              value={projectCompletedPercentage()}
              height={2}
              colorScheme="purple"
              mt={1}
            />
            <Text fontSize="sm" borderRadius={10}>
              {`${projectCompletedPercentage()} % Completed`}
            </Text>
            {projectCompletedPercentage() === 100 ? (
              <Button
                size="xs"
                width="fit-content"
                colorScheme="yellow"
                boxShadow="base"
                onClick={() => {
                  completeProjectApi(props)
                }}
              >
                Mark Completed
              </Button>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>

        <Flex mt={2} ml={20} backgroundColor="gray.100">
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
          <Flex flexDir="row" alignItems="center" ml={20}>
            <Icon as={BsClockFill}></Icon>
            <Text fontSize="sm" ml={2}>
              64 days
            </Text>
          </Flex>
          <Text fontSize="sm" ml={4}>
            Last Update: Nov 3, 2021
          </Text>
        </Flex>
      </Td>
    </Tr>
  )
}

export default ProjectTableRow
