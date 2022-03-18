import React from 'react'
import { Flex, Text, Icon, Link } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'

function NavigationItem(props: {
  icon: IconType
  text: string
  navClass: string
  link: string
}) {
  return (
    <>
      <Flex className="navigation-items">
        <Link
          href={props.link}
          display={['center', 'center', 'center', 'flex-start', 'flex-start']}
        >
          <Icon
            display={['flex', 'flex', 'flex', 'flex', 'flex']}
            as={props.icon}
            fontSize="2xl"
            className={props.navClass}
          ></Icon>
        </Link>
        <Link
          href={props.link}
          display={['none', 'none', 'none', 'flex', 'flex']}
          _hover={{ textDecor: 'none' }}
        >
          <Text
            className={props.navClass}
            fontSize={['xs', 'sm', 'md', 'sm', 'sm']}
          >
            {props.text}
          </Text>
        </Link>
      </Flex>
    </>
  )
}

export default NavigationItem
