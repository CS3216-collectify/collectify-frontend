const CATEGORY_FILTER_KEY = "collectifyCategoryFilter";

export const setCategoryFilterStore = (filter) => {
  localStorage.setItem(CATEGORY_FILTER_KEY, filter);
}

export const getCategoryFilterStore = () => {
  return localStorage.getItem(CATEGORY_FILTER_KEY);
}

export const removeCategoryFilterStore = () => {
  localStorage.removeItem(CATEGORY_FILTER_KEY);
}
