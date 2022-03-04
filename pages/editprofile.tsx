import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'
import NavigationColumn from '../components/navigation_column/NavigationColumn'
import { prisma } from '../prisma/db'
import { withPageAuthRequired, useUser, getSession } from '@auth0/nextjs-auth0'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  parse,
} from 'date-fns'
import OverviewRightColumn from '../components/overview_right_column/OverviewRightColumn'
import {
  CircularProgress,
  CircularProgressLabel,
  Progress,
  Flex,
  Button,
  Heading,
  Avatar,
  Text,
  IconButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Tag,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Box,
  Input,
  Icon,
} from '@chakra-ui/react'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { RiCalendarEventLine } from 'react-icons/ri'

async function editProfile(profile) {
  const response = await fetch('/api/editprofile', {
    method: 'PUT',
    body: JSON.stringify(profile),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

const ProjectPage = ({ currentUser }) => {
  const [imageUrl, setImageUrl] = useState('')

  return (
    <>
      <Flex
        height={[null, null, '100vh']}
        flexDir={['column', 'column', 'row']}
        overflow="hidden"
      >
        {/* Column 1 */}
        <Flex
          w={['100%', '100%', '10%', '10%', '10%']}
          flexDir="column"
          alignItems="center"
          borderRight="2px"
          borderColor="#eeeeee"
        >
          <NavigationColumn />
        </Flex>
        {/*Column2*/}
        <Flex
          className="column_two"
          w={['100%', '100%', '90%', '90%', '55%']}
          p="3%"
          flexDir="column"
          overflow="auto"
          minH="100vh"
          backgroundColor="#f6f6f6"
        >
          <Flex>
            <HiOutlineClipboardList size={32} />
            <Heading as="h2" size="lg" letterSpacing="tight" mb={2}>
              Edit Profile
            </Heading>
          </Flex>
          <Flex
            direction="column"
            alignItems="center"
            w={['100%', '100%', '100%', '100%', '100%']}
            background="white"
            boxShadow="md"
            p={12}
          >
            <Formik
              initialValues={{
                id: currentUser.id,
                image: currentUser.image,
                username: currentUser.username,
                email: currentUser.email,
              }}
              onSubmit={async (values, actions) => {
                await editProfile(values)
                await alert(JSON.stringify(values))
              }}
            >
              {(props) => (
                <Form>
                  <Avatar src={currentUser.image}></Avatar>

                  <Field name="image">
                    {({ field, form }) => (
                      <FormControl
                        w={['30vh', '30vh', '50vh', '65vh', '50vh']}
                        isInvalid={form.errors.image && form.touched.image}
                      >
                        <FormLabel htmlFor="image">Profile Image URL</FormLabel>
                        <Input
                          {...field}
                          id="image"
                          placeholder="Profile Image URL"
                          width="100%"
                          //   onChange={(e) => {
                          //     setImageUrl(e.target.value)
                          //   }}
                        />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        w={['30vh', '30vh', '50vh', '65vh', '50vh']}
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <FormLabel htmlFor="createtask">Username</FormLabel>
                        <Input
                          {...field}
                          id="username"
                          placeholder="Username"
                          width="100%"
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          {...field}
                          id="email"
                          placeholder="Email"
                          type="email"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    disabled={!props.dirty}
                    mt={4}
                    colorScheme="purple"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, params }) {
    const {
      user: { email },
    } = await getSession(req)

    const currentUser = await prisma.user.findUnique({
      where: { email: email },
    })

    await prisma.$disconnect()

    return {
      props: {
        currentUser: JSON.parse(JSON.stringify(currentUser)),
      },
    }
  },
})

export default ProjectPage
