import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Field, Form, Formik, useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { HiOutlineClipboardList } from 'react-icons/hi'
import NavigationColumn from '../../../components/navigation_column/NavigationColumn'
import OverviewRightColumn from '../../../components/overview_right_column/OverviewRightColumn'
import { prisma } from '../../../prisma/db'

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

const EditTask = ({ task, projects }) => {
  const currentTaskPriority = task.priority
  const parsedDate = Date.parse(task.dueDate)
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
        <NavigationColumn />
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
                priority: String(task.priority),
                dueDate: task.dueDate,
                projectId: task.Project[0].id,
              }}
              onSubmit={async (values, actions) => {
                await editTask(values)
                router.push('/overview')
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

                        <Select
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
                        </Select>

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
                        <FormLabel mt={2} htmlFor="title">
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
                        <FormLabel mt={2} htmlFor="description">
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

                  <Field name="priority" type="radio">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.priority && form.touched.priority
                        }
                      >
                        <FormLabel htmlFor="priority" mt={2}>
                          Priority
                        </FormLabel>

                        <div role="group" aria-labelledby="my-radio-group">
                          <Stack direction={['column', 'row']} spacing="6px">
                            <Flex>
                              <Flex
                                alignItems="center"
                                p={2}
                                borderRadius={10}
                                border="2px"
                                borderColor="purple.500"
                                w="fit-content"
                              >
                                <Field type="radio" name="priority" value="1" />
                                <Text ml={1} color="purple" fontWeight="600">
                                  1
                                </Text>
                              </Flex>

                              <Flex
                                alignItems="center"
                                p={2}
                                borderRadius={10}
                                ml={2}
                                border="2px"
                                borderColor="purple.500"
                                w="fit-content"
                              >
                                <Field type="radio" name="priority" value="2" />
                                <Text ml={1} color="purple" fontWeight="600">
                                  2
                                </Text>
                              </Flex>

                              <Flex
                                alignItems="center"
                                p={2}
                                borderRadius={10}
                                ml={2}
                                border="2px"
                                borderColor="purple.500"
                                w="fit-content"
                              >
                                <Field type="radio" name="priority" value="3" />
                                <Text ml={1} color="purple" fontWeight="600">
                                  3
                                </Text>
                              </Flex>

                              <Flex
                                alignItems="center"
                                p={2}
                                borderRadius={10}
                                ml={2}
                                border="2px"
                                borderColor="purple.500"
                                w="fit-content"
                              >
                                <Field type="radio" name="priority" value="5" />
                                <Text ml={1} color="purple" fontWeight="600">
                                  5
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex>
                              <Flex
                                alignItems="center"
                                p={2}
                                borderRadius={10}
                                border="2px"
                                borderColor="purple.500"
                                w="fit-content"
                              >
                                <Field type="radio" name="priority" value="8" />
                                <Text ml={1} color="purple" fontWeight="600">
                                  8
                                </Text>
                              </Flex>

                              <Flex
                                alignItems="center"
                                p={2}
                                borderRadius={10}
                                ml={2}
                                border="2px"
                                borderColor="purple.500"
                                w="fit-content"
                              >
                                <Field
                                  type="radio"
                                  name="priority"
                                  value="13"
                                />
                                <Text ml={1} color="purple" fontWeight="600">
                                  13
                                </Text>
                              </Flex>

                              <Flex
                                alignItems="center"
                                p={2}
                                borderRadius={10}
                                ml={2}
                                border="2px"
                                borderColor="purple.500"
                                w="fit-content"
                              >
                                <Field
                                  type="radio"
                                  name="priority"
                                  value="21"
                                />
                                <Text ml={1} color="purple" fontWeight="600">
                                  21
                                </Text>
                              </Flex>

                              <Flex
                                alignItems="center"
                                p={2}
                                borderRadius={10}
                                ml={2}
                                border="2px"
                                borderColor="purple.500"
                                w="fit-content"
                              >
                                <Field
                                  type="radio"
                                  name="priority"
                                  value="40"
                                />
                                <Text ml={1} color="purple" fontWeight="600">
                                  40
                                </Text>
                              </Flex>
                            </Flex>
                          </Stack>
                        </div>

                        <FormErrorMessage>
                          {form.errors.priority}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <FormLabel mt={2} htmlFor="dueDate">
                    Due Date
                  </FormLabel>

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
          backgroundColor="gray.600"
        >
          <OverviewRightColumn />
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ params }) {
    const slugString = params.slug.toString()

    const task = await prisma.task.findUnique({
      where: {
        id: slugString,
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
        task: JSON.parse(JSON.stringify(task)),
        projects: JSON.parse(JSON.stringify(projectsFetch)),
      },
    }
  },
})

export default EditTask
