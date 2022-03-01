import React from 'react'
import { Flex, Avatar, Text, Link, Button } from '@chakra-ui/react'
import { IoMdExit } from 'react-icons/io'
import { RiPencilLine } from 'react-icons/ri'

function UserProfile(props) {
  return (
    <>
      <Flex flexDir="column" alignItems="center" mb={10}>
        <Avatar size="md" boxShadow="md" my={2} src={props.profilePic} />
        <Link href="/api/auth/logout">
          <Flex flexDir="row" alignItems="center">
            <IoMdExit size={20} />
            <Text
              display={['inline', 'inline', 'none', 'inline', 'inline']}
              fontSize="sm"
              ml={2}
            >
              Sign Out
            </Text>
          </Flex>
        </Link>
        <Link href="/editprofile">
          <Button mt={2} colorScheme="purple">
            <RiPencilLine />
            Edit
          </Button>
        </Link>
      </Flex>
    </>
  )
}

export default UserProfile
