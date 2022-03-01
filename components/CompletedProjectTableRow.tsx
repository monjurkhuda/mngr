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

function CompletedProjectTableRow(props) {
  const { id, title, description, completedAt, createdAt } = props

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
          <Flex flexDir="row" alignItems="center">
            <Text fontSize="lg" fontWeight={600}>
              <Link href={`/projects/${id}`}>{title}</Link>
            </Text>
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
              {`Created At: ${createdAt}`}
            </Text>
          </Flex>
          <Text fontSize="sm" ml={4}>
            {`Completed At: ${completedAt}`}
          </Text>
        </Flex>
      </Td>
    </Tr>
  )
}

export default CompletedProjectTableRow
