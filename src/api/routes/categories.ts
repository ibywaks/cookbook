import { Router } from "express";

const categoriesRouter = Router();

categoriesRouter.get("/", () => {
  // list food categories
});

categoriesRouter.get("/:slug", () => {
  // get category by slug
  // load recipes related
});

categoriesRouter.put("/:id", () => {
  // update category
});

categoriesRouter.delete("/:id", () => {
  // delete category
});

categoriesRouter.post("/", () => {
  // create food category
});

export default categoriesRouter;
