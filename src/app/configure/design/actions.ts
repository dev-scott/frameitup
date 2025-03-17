'use server'

import { db } from '@/db'
import { FrameMaterial , FrameColor , FrameStyle } from '@prisma/client'

export type SaveConfigArgs = {
  color: FrameColor
  style: FrameStyle
  material: FrameMaterial
  
  configId: string
}

export async function saveConfig({
  color,
  style,
  material,
  
  configId,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, style, material },
  })
}
