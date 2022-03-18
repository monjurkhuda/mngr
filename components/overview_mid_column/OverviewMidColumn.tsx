import { Flex, Heading, Icon, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiCalendarEventLine, RiFullscreenExitFill } from 'react-icons/ri'
import ProjectTable from '../ProjectTable'

function OverviewMidColumn() {
  const [display, setDisplay] = useState('hide')

  return (
    <>
      <Flex justifyContent="space-between" mt={8}>
        <Flex align="flex-end">
          <RiFullscreenExitFill size={32} />
          <Heading as="h2" size="lg" letterSpacing="tight" ml={2}>
            Projects
          </Heading>
          <Icon as={RiCalendarEventLine} ml={6} mb={1}></Icon>
          <Text fontSize="small" ml={2} mb={1}>
            Nov 11, 2021
          </Text>
        </Flex>
      </Flex>

      <ProjectTable />
    </>
  )
}

export default OverviewMidColumn
