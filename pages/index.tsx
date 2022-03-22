import {
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Table,
  Tbody,
  Text,
} from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { RiHistoryLine, RiTaskLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import Navigation from '../components/navigation_column/Navigation'
import NavigationColumnLogo from '../components/navigation_column/NavigationColumnLogo'
import OverviewRightColumn from '../components/overview_right_column/OverviewRightColumn'
import TaskTableRow from '../components/TaskTableRow'
import { addUserInfo } from '../redux/userSlice'

export default function Home() {
  return (
    <Flex
      height={[null, null, '100vh']}
      width="100%"
      flexDir={['column', 'column', 'row']}
      overflow="hidden"
      justifyContent="center"
      alignItems="center"
    >
      <Head>
        <title>Overview. M: Project Management Simplified</title>
      </Head>
      <Link href="/api/auth/login">
        <Button size="lg" colorScheme="purple">
          Login
        </Button>
      </Link>
    </Flex>
  )
}
