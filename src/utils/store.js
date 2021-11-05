const CATEGORY_FILTER_KEY = "collectifyCategoryFilter";

export const setCategoryFilterStore = (filter) => {
  if (filter === null) {
    localStorage.removeItem(CATEGORY_FILTER_KEY);
    return;
  }
  localStorage.setItem(CATEGORY_FILTER_KEY, filter);
}

export const getCategoryFilterStore = () => {
  let storedCategoryId = localStorage.getItem(CATEGORY_FILTER_KEY);
  if (storedCategoryId) {
    storedCategoryId = parseInt(storedCategoryId);
  }
  return storedCategoryId;
}

export const removeCategoryFilterStore = () => {
  localStorage.removeItem(CATEGORY_FILTER_KEY);
}
