import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { GiEgyptianProfile } from 'react-icons/gi'
import { IoMdExit } from 'react-icons/io'
import { RiEyeLine, RiHistoryLine } from 'react-icons/ri'
import NavigationItem from './NavigationItem'

function Navigation() {
  const [queryString, setQueryString] = useState('')
  var overviewActive = ''
  var tasksActive = ''
  var projectsActive = ''
  var historyActive = ''
  var usersActive = ''

  useEffect(() => {
    setQueryString(window.location.pathname)
  }, [queryString])

  //const queryString = window.location.pathname

  if (queryString === '/overview') {
    overviewActive = 'active'
  } else if (queryString === '/tasks') {
    tasksActive = 'active'
  } else if (queryString === '/projects') {
    projectsActive = 'active'
  } else if (queryString === '/history') {
    historyActive = 'active'
  } else if (queryString === '/users') {
    usersActive = 'active'
  }

  return (
    <>
      <Flex
        flexDir={['row', 'row', 'column', 'column', 'column']}
        mt={[2, 2, 0, 0, 0]}
        mb={[2, 2, 0, 0, 0]}
        align={['center', 'center', 'center', 'flex-start', 'flex-start']}
        justifyContent="center"
      >
        <NavigationItem
          navClass={overviewActive}
          icon={RiEyeLine}
          text={'Overview'}
          link={'/overview'}
        />

        <NavigationItem
          navClass={historyActive}
          icon={RiHistoryLine}
          text={'History'}
          link={'/history'}
        />

        <NavigationItem
          navClass={usersActive}
          icon={FiUser}
          text={'Users'}
          link={'/users'}
        />

        <NavigationItem
          navClass=""
          icon={IoMdExit}
          text={'SignOut'}
          link={'/api/auth/logout'}
        />
      </Flex>
    </>
  )
}

export default Navigation
