import merchSiteReducer from '../../reducers/merch-site-reducer'

describe('merchSiteReducer', () => {
  let action;
  const itemData = {
    name: "Rusty Dagger",
    description: "A well worn dagger",
    quantity: "4",
    price: "2",
    id: 1
  }
  const stateData = {
    1: { name: "Rusty Dagger", description: "A well worn dagger", quantity: "4", price: "2", id: 1 },
    2: {
      name: "Long Sword", description: "Cuts things, longly.", quantity: "3", price: "10"
    }
  }
  test('Should return default state if there is no action passed to reducer', () => {
    expect(merchSiteReducer({}, { type: null })).toEqual({});
  })

  test('Should successfully add a new item to masterItemList', () => {
    const { name, description, quantity, price, id } = itemData;
    action = {
      type: 'ADD_ITEM',
      name: name,
      description: description,
      quantity: quantity,
      price: price,
      id: id
    };

    expect(merchSiteReducer({}, action)).toEqual({
      [id]: {
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        id: id
      }
    })
  })

  test('Should successfully delete an item', () => {
    action = {
      type: 'DELETE_ITEM',
      id: 1
    };
    expect(merchSiteReducer(stateData, action)).toEqual({
      2: {
        name: "Long Sword", description: "Cuts things, longly.", quantity: "3", price: "10"
      }
    })
  })
})