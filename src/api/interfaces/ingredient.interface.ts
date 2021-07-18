export interface Ingredient {
  id: number
  name: string
  slug: string
  description?: string
  foodGroup?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date 
}