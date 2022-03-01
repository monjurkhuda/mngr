import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { HiOutlineClipboardList } from 'react-icons/hi'
import {
  RiSettings5Line,
  RiEyeLine,
  RiPencilRuler2Line,
  RiTaskLine,
  RiHistoryLine,
} from 'react-icons/ri'
import NavigationItem from './NavigationItem'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { PrismaClient } from '@prisma/client'

function Navigation() {
  var overviewActive = ''
  var tasksActive = ''
  var projectsActive = ''
  var historyActive = ''

  const queryString = window.location.pathname

  if (queryString === '/overview') {
    overviewActive = 'active'
  } else if (queryString === '/tasks') {
    tasksActive = 'active'
  } else if (queryString === '/projects') {
    projectsActive = 'active'
  } else if (queryString === '/history') {
    historyActive = 'active'
  }

  return (
    <>
      <Flex
        flexDir={['row', 'row', 'column', 'column', 'column']}
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
          navClass={tasksActive}
          icon={RiTaskLine}
          text={'My Tasks'}
          link={'/tasks'}
        />

        <NavigationItem
          navClass={projectsActive}
          icon={HiOutlineClipboardList}
          text={'My Projects'}
          link={'/projects'}
        />

        <NavigationItem
          navClass={historyActive}
          icon={RiHistoryLine}
          text={'My History'}
          link={'/history'}
        />
      </Flex>
    </>
  )
}

export default Navigation
