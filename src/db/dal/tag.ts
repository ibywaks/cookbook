import { isEmpty } from 'lodash'
import {Tag} from '../models'
import { TagInput, TagOutput } from '../models/Tag'

export const create = async (payload: TagInput): Promise<TagOutput> => {
    return Tag.create(payload)
}

export const update = async (id: number, payload: Partial<TagInput>): Promise<TagOutput> => {
    const tag = await Tag.findByPk(id)

    if (!tag) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return tag.update(payload)
}

export const getById = async (id: number): Promise<TagOutput> => {
    const tag = await Tag.findByPk(id)

    if (!tag) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return tag
}

export const deleteById = async (id: number): Promise<boolean> => {
    const numDeletedTags = await Tag.destroy({
        where: {id}
    })

    return !!numDeletedTags
}

export const getAll = async (): Promise<TagOutput[]> => {
    return Tag.findAll()
}

export const checkSlugExists = async (slug: string): Promise<boolean> => {
    const tagWithSlug = await Tag.findOne({
        where: {slug}
    })

    return !isEmpty(tagWithSlug)
}
