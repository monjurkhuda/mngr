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
import { Field, Form, Formik, useFormikContext } from 'formik'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { HiOutlineClipboardList } from 'react-icons/hi'
import Navigation from '../../../components/navigation_column/Navigation'
import NavigationColumnLogo from '../../../components/navigation_column/NavigationColumnLogo'
import OverviewRightColumn from '../../../components/overview_right_column/OverviewRightColumn'
import { prisma } from '../../../prisma/db'
import { useRouter } from 'next/router'

async function editProject(project) {
  const response = await fetch('/api/editproject', {
    method: 'PUT',
    body: JSON.stringify(project),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

const EditProject = ({ currentUser, project }) => {
  const parsedDate = Date.parse(project.dueDate)
  const router = useRouter()
  const [dueDate, setDueDate] = useState(new Date(parsedDate))

  function DatePickerField({ name }) {
    const formik = useFormikContext()

    return (
      <DatePicker
        selected={dueDate}
        onChange={(date) => {
          setDueDate(date)
          formik.setFieldValue(name, date)
        }}
      />
    )
  }

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
              Edit Project
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
                id: project.id,
                image: project.image,
                title: project.title,
                description: project.description,
                dueDate: project.dueDate,
                ownerId: currentUser.id,
              }}
              onSubmit={async (values, actions) => {
                await editProject(values)
                router.push('/projects')
              }}
            >
              {(props) => (
                <Form>
                  <Avatar src={project.image} size="lg" />

                  <Field name="image">
                    {({ field, form }) => (
                      <FormControl
                        w={['30vh', '30vh', '50vh', '65vh', '50vh']}
                        isInvalid={form.errors.image && form.touched.image}
                      >
                        <FormLabel htmlFor="image" mt={2}>
                          Project Logo
                        </FormLabel>
                        <Input
                          {...field}
                          id="image"
                          placeholder="Project Logo"
                        />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="title">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.title && form.touched.title}
                      >
                        <FormLabel htmlFor="image" mt={2}>
                          Title
                        </FormLabel>
                        <Input
                          {...field}
                          id="title"
                          placeholder="Title"
                          type="text"
                        />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel htmlFor="image" mt={2}>
                          Description
                        </FormLabel>
                        <Input
                          {...field}
                          id="description"
                          placeholder="Description"
                          type="text"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <FormLabel htmlFor="dueDate" mt={2}>
                    Due Date
                  </FormLabel>

                  <Flex
                    backgroundColor="purple.500"
                    mt={1}
                    padding="0.2em"
                    w="fit-content"
                  >
                    <DatePickerField name="dueDate" />
                  </Flex>

                  <Button
                    {...props}
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
  async getServerSideProps({ req, res, params }) {
    const {
      user: { email },
    } = await getSession(req, res)

    const currentUser = await prisma.user.findUnique({
      where: { email: email },
    })

    const slugString = params.slug.toString()

    const project = await prisma.project.findUnique({
      where: {
        id: slugString,
      },
    })

    await prisma.$disconnect()

    return {
      props: {
        currentUser: JSON.parse(JSON.stringify(currentUser)),
        project: JSON.parse(JSON.stringify(project)),
      },
    }
  },
})

export default EditProject
