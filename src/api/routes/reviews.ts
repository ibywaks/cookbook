import { Router } from 'express'

const reviewsRouter = Router()

reviewsRouter.get('/', () => {
  // fetch reviews
})

reviewsRouter.post('/', () => {
  // create review
})

reviewsRouter.get('/:slug', () => {
  // fetch review
})

reviewsRouter.put('/:id', () => {
  // update review
})

reviewsRouter.delete('/:id', () => {
  // delete review
})

reviewsRouter.post('/:id/publish', () => {
  // publish review
})

reviewsRouter.post('/:id/unpublish', () => {
  // unpublish review
})

export default reviewsRouter

