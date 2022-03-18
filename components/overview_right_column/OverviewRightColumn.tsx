import { Avatar, Button, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import React from 'react'
import { RiCalendarEventLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/store'

function OverviewRightColumn() {
  const userInfo = useSelector(selectUser)
  const today = format(new Date(), 'MMM d, yyyy')

  return (
    <>
      <Flex
        flexDir="row"
        justifyContent="flex-end"
        alignItems="center"
        mb={4}
        color="white"
      >
        <RiCalendarEventLine size={24} />
        <Text fontWeight="500" ml={2}>
          {today}
        </Text>
      </Flex>
      <Flex
        backgroundColor="white"
        w="100%"
        h="fit-content"
        p={4}
        borderRadius={10}
        boxShadow="base"
        direction="column"
        mb={4}
      >
        <Flex>
          <Heading size="md">My Profile:</Heading>
        </Flex>
        <Flex mt={4}>
          <Avatar src={userInfo.image} size="lg"></Avatar>
          <Flex direction="column" ml={4}>
            <Text fontSize="lg" fontWeight="700" color="blackAlpha.700">
              {userInfo.username}
            </Text>
            <Text fontSize="md" color="blackAlpha.800" mt={1}>
              {userInfo.email}
            </Text>
          </Flex>
        </Flex>
        <Flex mt={4} justifyContent="flex-end">
          <Link href="/editprofile">
            <Button colorScheme="purple">Edit Profile</Button>
          </Link>
          <Link href="/api/auth/logout">
            <Button colorScheme="pink" ml={6}>
              Sign Out
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  )
}

export default OverviewRightColumn
