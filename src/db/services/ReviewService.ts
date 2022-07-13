import * as reviewDal from "../dal/review";
import { GetAllReviewsFilters } from "../dal/types";
import { ReviewInput, ReviewOuput } from "../models/Review";

export const create = (payload: ReviewInput): Promise<ReviewOuput> => {
  return reviewDal.create(payload);
};

export const update = (
  id: number,
  payload: Omit<ReviewInput, "isPublished" | "publishedOn">
): Promise<ReviewOuput> => {
  return reviewDal.update(id, payload);
};

export const getById = (id: number): Promise<ReviewOuput> => {
  return reviewDal.getById(id);
};

export const deleteById = (id: number): Promise<boolean> => {
  return reviewDal.deleteById(id);
};

export const getAll = (
  filters: GetAllReviewsFilters
): Promise<ReviewOuput[]> => {
  return reviewDal.getAll(filters);
};

export const publishReview = (id: number): Promise<ReviewOuput> => {
  return reviewDal.update(id, {
    isPublished: true,
    publishedOn: new Date(),
  });
};

export const unpublishReview = (id: number): Promise<ReviewOuput> => {
  return reviewDal.update(id, {
    isPublished: false,
    publishedOn: null,
  });
};
