const initialState = {
  categoriesList: [],
  subCategories: [],
};

export default function catList(state = initialState, action) {
  switch (action.type) {
    case 'CATEGORY_SUCCESS':
      return {...state, categoriesList: action.payload};
    case 'SUB_CATEGORY_SUCCESS':
      return {...state, subCategories: action.payload};
    default:
      return state;
  }
}
