import { Flex } from '@chakra-ui/react'
import Navigation from './Navigation'
import NavigationColumnLogo from './NavigationColumnLogo'

function NavigationColumn() {
  return (
    <Flex
      flexDir="column"
      w={['100%', '100%', '10%', '10%', '10%']}
      h="100%"
      borderRight={['0px', '0px', '2px', '2px', '2px']}
      borderColor={['#eeeeee', '#eeeeee', '#eeeeee', '#eeeeee', '#eeeeee']}
      alignItems="center"
    >
      <NavigationColumnLogo />
      <Navigation />
    </Flex>
  )
}

export default NavigationColumn
