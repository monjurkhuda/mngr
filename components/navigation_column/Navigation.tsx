import { Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { IoMdExit } from 'react-icons/io'
import { RiCalendarEventLine, RiHistoryLine } from 'react-icons/ri'
import { GoSearch } from 'react-icons/go'
import NavigationItem from './NavigationItem'

function Navigation() {
  const [queryString, setQueryString] = useState('')
  const today = format(new Date(), 'MMM d, yyyy')

  var historyActive = ''
  var userActive = ''
  var searchActive = ''

  useEffect(() => {
    setQueryString(window.location.pathname)
  }, [queryString])

  if (queryString === '/history') {
    historyActive = 'active'
  } else if (queryString === '/user') {
    userActive = 'active'
  } else if (queryString === '/search') {
    searchActive = 'active'
  }

  return (
    <>
      <Flex
        direction="column"
        mt={[2, 2, 0, 0, 0]}
        mb={[2, 2, 0, 0, 0]}
        align={['center', 'center', 'center', 'flex-start', 'flex-start']}
        justifyContent="center"
      >
        <Flex
          flexDir="row"
          justifyContent="flex-end"
          alignItems="center"
          color="gray.500"
          display={['flex', 'flex', 'none', 'none', 'none']}
          mb={4}
        >
          <RiCalendarEventLine size={24} />
          <Text fontWeight="500" ml={2}>
            {today}
          </Text>
        </Flex>

        <Flex flexDir={['row', 'row', 'column', 'column', 'column']}>
          <NavigationItem
            navClass={searchActive}
            icon={GoSearch}
            text={'Search'}
            link={'/search'}
          />

          <NavigationItem
            navClass={historyActive}
            icon={RiHistoryLine}
            text={'History'}
            link={'/history'}
          />

          <Flex display={['flex', 'flex', 'none', 'none', 'none']}>
            <NavigationItem
              navClass={userActive}
              icon={FiUser}
              text={'User'}
              link={'/user'}
            />
          </Flex>

          <NavigationItem
            navClass=""
            icon={IoMdExit}
            text={'SignOut'}
            link={'/api/auth/logout'}
          />
        </Flex>
      </Flex>
    </>
  )
}

export default Navigation
