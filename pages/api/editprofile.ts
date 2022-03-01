import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const profileData = JSON.parse(req.body)

  console.log(profileData)

  const editProfile = await prisma.user.update({
    where: { id: profileData.id },
    data: {
      image: profileData.image,
      username: profileData.username,
      email: profileData.email,
    },
  })

  res.json(editProfile)
}
