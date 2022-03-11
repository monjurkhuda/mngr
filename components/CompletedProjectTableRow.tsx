import { Avatar, Button, Flex, Icon, Td, Text, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import { BsClockFill } from 'react-icons/bs'

function CompletedProjectTableRow(props) {
  const { id, title, image, description, completedAt, createdAt } = props
  const createdAtFormatted = format(new Date(createdAt), 'MMM do, Y')
  const completedAtFormatted = format(new Date(completedAt), 'MMM do, Y')

  async function uncompleteProjectApi(project) {
    const response = await fetch('/api/uncompleteproject', {
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
          <Avatar boxShadow="md" size="md" mr={4} ml={4} src={image} />
          <Flex flexDir="row" alignItems="center">
            <Text fontSize="lg" fontWeight={600}>
              <Link href={`/projects/${id}`}>{title}</Link>
            </Text>
          </Flex>
          <Button
            ml={2}
            size="xs"
            width="fit-content"
            colorScheme="blue"
            boxShadow="base"
            onClick={() => {
              uncompleteProjectApi(props)
            }}
          >
            Mark Incomplete
          </Button>
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
              {`Start: ${createdAtFormatted}`}
            </Text>
          </Flex>
          <Text fontSize="sm" ml={4}>
            {`End: ${completedAtFormatted}`}
          </Text>
        </Flex>
      </Td>
    </Tr>
  )
}

export default CompletedProjectTableRow
