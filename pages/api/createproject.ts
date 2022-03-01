import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const projectData = JSON.parse(req.body)

  const createProject = await prisma.project.create({
    data: {
      User: {
        connect: { id: projectData.ownerId },
      },
      title: projectData.title,
      description: projectData.description,
      dueDate: projectData.dueDate,
    },
  })

  res.json(createProject)
}
