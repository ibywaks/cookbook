interface ListFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export interface GetAllIngredientsFilters extends ListFilters {}
export interface GetAllRecipesFilters extends ListFilters {}
export interface GetAllReviewsFilters extends ListFilters {
    isPublished?: boolean
    isNotPublished?: boolean
}