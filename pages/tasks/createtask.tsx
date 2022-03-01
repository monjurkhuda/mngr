import React, { useState } from 'react'
import {
  Formik,
  Form,
  Field,
  useFormikContext,
  ErrorMessage,
  FormikConsumer,
} from 'formik'
import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { prisma } from '../../prisma/db'
import { withPageAuthRequired, useUser, getSession } from '@auth0/nextjs-auth0'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import OverviewRightColumn from '../../components/overview_right_column/OverviewRightColumn'

import {
  Flex,
  Heading,
  Avatar,
  Text,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Button,
  Icon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Checkbox,
} from '@chakra-ui/react'
import {
  RiSettings5Line,
  RiEyeLine,
  RiPencilRuler2Line,
  RiTaskLine,
  RiCalendarEventLine,
  RiFullscreenExitFill,
} from 'react-icons/ri'
import NavigationColumn from '../../components/navigation_column/NavigationColumn'

async function createTaskApi(task) {
  const response = await fetch('/api/createtask', {
    method: 'POST',
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

function createtask({ users, projects, currentUser }) {
  const [dueDate, setDueDate] = useState()

  console.log(currentUser)

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
        {/* Column 2 */}
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
            <RiTaskLine size={32} />
            <Heading as="h2" size="lg" letterSpacing="tight" mb={2}>
              Create A Task
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
                title: '',
                //assignedToId: '', //Commented out for multi-user version
                assignedToId: currentUser.id,
                description: '',
                priority: 0,
                dueDate: '',
                projectId: '',
              }}
              onSubmit={async (values, actions) => {
                await createTaskApi(values)
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
                        <FormLabel htmlFor="createtask">Title</FormLabel>
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

                  {/*                   
                  //Commented out for multi-user version
                  <Field name="assignedToId">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.assignedToId && form.touched.assignedToId
                        }
                      >
                        <FormLabel htmlFor="assignedToId">
                          Assigned To
                        </FormLabel>

                        <select
                          {...field}
                          id="assignedToId"
                          // value={values.color}
                          // onChange={handleChange}
                          // onBlur={handleBlur}
                          defaultValue="Choose_User"
                          placeholder="Choose User"
                          style={{ display: 'block' }}
                        >
                          <option value="" selected disabled hidden>
                            Choose User
                          </option>
                          {users.map((user) => (
                            <option
                              key={user.id}
                              value={user.id}
                              label={user.email}
                            />
                          ))}
                        </select>

                        <FormErrorMessage>
                          {form.errors.assignedToId}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field> */}

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
                  {/* <Field name="dueDate">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.dueDate && form.touched.dueDate}
                      >
                        <FormLabel htmlFor="dueDate">Due Date</FormLabel>
                        <Input {...field} id="dueDate" placeholder="Due Date" />
                        <FormErrorMessage>
                          {form.errors.dueDate}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field> */}
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
                    mt={4}
                    colorScheme="purple"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    + Create Task
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
        {/* Column 3 ENDS */}
      </Flex>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req }) {
    const {
      user: { email },
    } = await getSession(req)

    const currentUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    const projectsFetch = await prisma.project.findMany({
      where: {
        completed: false,
      },
    })

    const usersFetch = await prisma.user.findMany()

    return {
      props: {
        currentUser: JSON.parse(JSON.stringify(currentUser)),
        users: JSON.parse(JSON.stringify(usersFetch)),
        projects: JSON.parse(JSON.stringify(projectsFetch)),
      },
    }
  },
})

export default createtask
