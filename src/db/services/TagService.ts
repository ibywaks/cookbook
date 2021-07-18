import {TagInput, TagOutput} from '../models/Tag'
import * as tagDal from '../dal/tag'
import { kebabCase } from 'lodash'

export const create = async (payload: TagInput): Promise<TagOutput> => {
    let slug = kebabCase(payload.name)
    const slugExists = await tagDal.checkSlugExists(slug)

    payload.slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    
    return tagDal.create(payload)
}

export const update = async (id: number, payload: Partial<TagInput>): Promise<TagOutput> => {
    if (payload.name) {
        let slug = kebabCase(payload.name)
        const slugExists = await tagDal.checkSlugExists(slug)

        payload.slug = slugExists ? `${slug}-${Math.floor(Math.random() * 1000)}` : slug
    }

    return tagDal.update(id, payload)
}

export const getById = (id: number): Promise<TagOutput> => {
    return tagDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return tagDal.deleteById(id)
}

export const getAll = (): Promise<TagOutput[]> => {
    return tagDal.getAll()
}