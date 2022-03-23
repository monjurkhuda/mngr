import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
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
import Navigation from '../../components/navigation_column/Navigation'
import NavigationColumnLogo from '../../components/navigation_column/NavigationColumnLogo'
import OverviewRightColumn from '../../components/overview_right_column/OverviewRightColumn'
import { prisma } from '../../prisma/db'
import { useRouter } from 'next/router'

async function createProject(project) {
  const response = await fetch('/api/createproject', {
    method: 'POST',
    body: JSON.stringify(project),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

function createproject({ currentUser }) {
  const [dueDate, setDueDate] = useState(new Date())
  const router = useRouter()

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
            <HiOutlineClipboardList size={32} />
            <Heading as="h2" size="lg" letterSpacing="tight" mb={2}>
              Create A Project
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
                image: '',
                description: '',
                dueDate: '',
                ownerId: currentUser.id,
              }}
              onSubmit={async (values, actions) => {
                await createProject(values)
                actions.setSubmitting(true)
                router.push('/projects')
              }}
            >
              {(props) => (
                <Form>
                  <Field name="image">
                    {({ field, form }) => (
                      <FormControl
                        w={['30vh', '30vh', '50vh', '65vh', '50vh']}
                        isInvalid={form.errors.image && form.touched.image}
                      >
                        <Input
                          {...field}
                          id="image"
                          placeholder="Project Logo URL"
                          mt={4}
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
                        <Input
                          {...field}
                          id="title"
                          placeholder="Title"
                          mt={4}
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
                        <Input
                          {...field}
                          id="description"
                          placeholder="Description"
                          type="text"
                          mt={4}
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
                    backgroundColor="#e6e6e6"
                    mt={1}
                    padding="0.2em"
                    w="fit-content"
                  >
                    <DatePickerField name="dueDate" />
                  </Flex>

                  <Button
                    {...props}
                    mt={4}
                    colorScheme="purple"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    + Create Project
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
        {/* Column 3 ENDS */}
      </Flex>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const {
      user: { email },
    } = await getSession(req, res)

    const currentUser = await prisma.user.findUnique({
      where: { email: email },
    })

    return {
      props: {
        currentUser: JSON.parse(JSON.stringify(currentUser)),
      },
    }
  },
})

export default createproject
