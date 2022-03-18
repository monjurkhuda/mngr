import { Avatar, Box, Flex, Td, Text, Tr } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { HiOutlineClipboardList } from 'react-icons/hi'

function ProjectSearchResult(props) {
  const { id, image, title, description } = props

  return (
    <Tr backgroundColor="white">
      <Td>
        <Flex direction="column">
          <Flex alignItems="center">
            <Avatar src={image} />
            <Text fontSize="lg" fontWeight={600} ml={2}>
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
