import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const projectData = JSON.parse(req.body)

  const editProject = await prisma.project.update({
    where: { id: projectData.id },
    data: {
      title: projectData.title,
      description: projectData.description,
      dueDate: projectData.dueDate,
    },
  })

  res.json(editProject)
}
