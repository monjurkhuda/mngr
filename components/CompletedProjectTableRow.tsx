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
        <Flex direction="column" width="100%">
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

          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
          >
            <Flex flexDir="row" alignItems="center">
              <Icon as={BsClockFill}></Icon>
              <Text fontSize="sm" ml={2}>
                {`Start: ${createdAtFormatted}`}
              </Text>
            </Flex>
            <Text fontSize="sm" ml={4}>
              {`End: ${completedAtFormatted}`}
            </Text>
          </Flex>

          <Button
            mt={2}
            colorScheme="red"
            boxShadow="base"
            onClick={() => {
              uncompleteProjectApi(props)
            }}
          >
            Mark Incomplete
          </Button>
        </Flex>
      </Td>
    </Tr>
  )
}

export default CompletedProjectTableRow
