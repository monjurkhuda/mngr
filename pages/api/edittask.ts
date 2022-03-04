import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const taskData = JSON.parse(req.body)
  const parsedIntPriority = parseInt(taskData.priority)

  const editTask = await prisma.task.update({
    where: { id: taskData.id },
    data: {
      Project: {
        set: [],
        connect: { id: taskData.projectId },
      },
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      priority: parsedIntPriority,
    },
  })

  res.json(editTask)
}
