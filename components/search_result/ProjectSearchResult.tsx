import { Box, Flex, Td, Text, Tr } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { HiOutlineClipboardList } from 'react-icons/hi'

function ProjectSearchResult(props) {
  const { id, title, description } = props

  return (
    <Tr backgroundColor="white">
      <Td>
        <Flex direction="column">
          <Flex>
            <HiOutlineClipboardList />
            <Text fontSize="lg" fontWeight={600}>
              <Link href={`/projects/${id}`}>{title}</Link>
            </Text>
          </Flex>
          <Flex mt={2} backgroundColor="gray.100">
            <Text fontSize="sm" color="gray.600" padding={2}>
              {description}
            </Text>
          </Flex>
        </Flex>
      </Td>
    </Tr>
  )
}

export default ProjectSearchResult
