const CATEGORY_FILTER_KEY = "collectifyCategoryFilter";

export const setCategoryFilter = (filter) => {
  localStorage.setItem(CATEGORY_FILTER_KEY, filter);
}

export const getCategoryFilter = () => {
  return localStorage.getItem(CATEGORY_FILTER_KEY);
}

export const removeCategoryFilter = () => {
  localStorage.removeItem(CATEGORY_FILTER_KEY);
}
