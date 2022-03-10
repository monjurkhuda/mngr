import { Box, Flex, Td, Text, Tr } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { HiOutlineClipboardList } from 'react-icons/hi'

function TaskSearchResult(props) {
  const { id, title, priority, description, projectTitle } = props

  return (
    <Tr backgroundColor="white">
      <Td>
        <Flex align="center">
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
      </Td>
    </Tr>
  )
}

export default TaskSearchResult
