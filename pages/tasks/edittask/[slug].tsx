import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik'
import NavigationColumn from '../../../components/navigation_column/NavigationColumn'
import { prisma } from '../../../prisma/db'
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
import OverviewRightColumn from '../../../components/overview_right_column/OverviewRightColumn'
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

async function editTask(task) {
  const response = await fetch('/api/edittask', {
    method: 'PUT',
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

const EditTask = ({ currentUser, task, projects }) => {
  const [dueDate, setDueDate] = useState()

  const parsedDate = Date.parse(task.dueDate)

  const monthFormat = format(parsedDate, 'MMM')

  function DatePickerField({ name }) {
    const formik = useFormikContext()
    const field = formik.getFieldProps(name)

    return (
      <DatePicker
        selected={dueDate}
        value={field.value}
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
              Edit Task
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
                id: task.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                dueDate: task.dueDate,
                projectId: task.Project[0].id,
              }}
              onSubmit={async (values, actions) => {
                await editTask(values)
                await alert(JSON.stringify(values))
              }}
            >
              {(props) => (
                <Form>
                  <Field name="projectId">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.projectId && form.touched.projectId
                        }
                      >
                        <FormLabel htmlFor="projectId">Project</FormLabel>

                        <select
                          {...field}
                          id="projectId"
                          defaultValue="Choose_Project"
                          placeholder="Choose Project"
                          style={{ display: 'block' }}
                        >
                          <option value="" selected disabled hidden>
                            Choose Project
                          </option>
                          {projects.map((project) => (
                            <option
                              key={project.id}
                              value={project.id}
                              label={project.title}
                            />
                          ))}
                        </select>

                        <FormErrorMessage>
                          {form.errors.projectId}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="title">
                    {({ field, form }) => (
                      <FormControl
                        w={['30vh', '30vh', '50vh', '65vh', '50vh']}
                        isInvalid={form.errors.title && form.touched.title}
                      >
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                          {...field}
                          id="title"
                          placeholder="Title"
                          width="100%"
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
                        <FormLabel htmlFor="description">Description</FormLabel>
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

                  <Field name="priority" type="radio">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.priority && form.touched.priority
                        }
                      >
                        <FormLabel htmlFor="priority">Priority</FormLabel>
                        <div role="group" aria-labelledby="my-radio-group">
                          <label>
                            <Field type="radio" name="priority" value="1" />1
                          </label>
                          <label>
                            <Field type="radio" name="priority" value="2" />2
                          </label>
                          <label>
                            <Field type="radio" name="priority" value="3" />3
                          </label>
                          <label>
                            <Field type="radio" name="priority" value="5" />5
                          </label>
                          <label>
                            <Field type="radio" name="priority" value="8" />8
                          </label>
                          <label>
                            <Field type="radio" name="priority" value="13" />
                            13
                          </label>
                          <label>
                            <Field type="radio" name="priority" value="21" />
                            21
                          </label>
                          <label>
                            <Field type="radio" name="priority" value="40" />
                            40
                          </label>
                        </div>
                        <FormErrorMessage>
                          {form.errors.priority}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Icon as={RiCalendarEventLine} ml={6} mb={1}></Icon>
                  {' Due Date: '}

                  <Flex
                    backgroundColor="#e6e6e6"
                    mt={2}
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
          backgroundColor="purple.400"
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

    const task = await prisma.task.findUnique({
      where: {
        id: params.slug,
      },
      include: {
        Project: true,
      },
    })

    const projectsFetch = await prisma.project.findMany({
      where: {
        completed: false,
      },
    })

    await prisma.$disconnect()

    return {
      props: {
        currentUser: JSON.parse(JSON.stringify(currentUser)),
        task: JSON.parse(JSON.stringify(task)),
        projects: JSON.parse(JSON.stringify(projectsFetch)),
      },
    }
  },
})

export default EditTask
