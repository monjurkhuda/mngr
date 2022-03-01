import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const taskData = JSON.parse(req.body)
  const completedAtDate = new Date()

  const completeTaskApi = await prisma.task.update({
    where: { id: taskData.id },
    data: {
      completed: true,
      completedAt: completedAtDate,
    },
  })

  res.json(completeTaskApi)
}
