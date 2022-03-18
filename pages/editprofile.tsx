import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { HiOutlineClipboardList } from 'react-icons/hi'
import Navigation from '../components/navigation_column/Navigation'
import NavigationColumn from '../components/navigation_column/NavigationColumn'
import NavigationColumnLogo from '../components/navigation_column/NavigationColumnLogo'
import OverviewRightColumn from '../components/overview_right_column/OverviewRightColumn'
import { prisma } from '../prisma/db'

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
          flexDir="column"
          w={['100%', '100%', '10%', '10%', '10%']}
          h={['100%', '100%', '30%', '30%', '30%']}
          borderRight="2px"
          borderColor="#eeeeee"
          alignItems="center"
          justifyContent="space-between"
          justifyItems="space-between"
          alignContent="space-between"
        >
          <NavigationColumnLogo />
          <Navigation />
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
                        <FormLabel htmlFor="image" mt={2}>
                          Profile Image URL
                        </FormLabel>
                        <Input
                          {...field}
                          id="image"
                          placeholder="Profile Image URL"
                        />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <FormLabel htmlFor="createtask" mt={2}>
                          Username
                        </FormLabel>
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
                        <FormLabel htmlFor="email" mt={2}>
                          Email
                        </FormLabel>
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
        {/* Column 3 */}
        <Flex
          display={['none', 'none', 'none', 'none', 'inline']}
          w={['100%', '100%', null, null, '35%']}
          p="3%"
          flexDir="column"
          overflow="auto"
          backgroundColor="gray.600"
        >
          <OverviewRightColumn />
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
