import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const taskData = JSON.parse(req.body)
  const parsedIntPriority = parseInt(taskData.priority)

  // const createTaskApi = await prisma.task.create({
  //   data: taskData,
  // })

  const createTaskApi = await prisma.task.create({
    data: {
      User: {
        connect: { id: taskData.assignedToId },
      },
      Project: {
        connect: { id: taskData.projectId },
      },
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      priority: parsedIntPriority,
    },
  })

  res.json(createTaskApi)
}
