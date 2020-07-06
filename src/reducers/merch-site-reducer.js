export default (state = {}, action) => {
  const { name, description, quantity, price, id } = action;
  switch (action.type) {
    case 'ADD_ITEM':
      return Object.assign({}, state, {
        [id]: {
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          id: id
        }
      })
    case 'DELETE_ITEM':
      const newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
}
