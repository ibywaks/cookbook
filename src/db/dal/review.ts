import { Op } from 'sequelize'

import {Review} from '../models'
import { GetAllReviewsFilters } from './types'
import {ReviewInput, ReviewOuput} from '../models/Review'

export const create = (payload: ReviewInput): Promise<ReviewOuput> => {
    return Review.create(payload)
}

export const update = async (id: number, payload: Partial<ReviewInput>): Promise<ReviewOuput> => {
    const review = await Review.findByPk(id)

    if (!review) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return review.update(payload)
}

export const getById = async (id: number): Promise<ReviewOuput> => {
    const review = await Review.findByPk(id)

    if (!review) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return review
}

export const deleteById = async (id: number): Promise<boolean> => {
    const numOfDeletedReviews = await Review.destroy({
        where: {id}
    })

    return !!numOfDeletedReviews
}

export const getAll = (filters: GetAllReviewsFilters): Promise<ReviewOuput[]> => {
    return Review.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
            ...(filters?.isPublished && {isPublished: true}),
            ...(filters?.isNotPublished && {isPublished: false}),
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}