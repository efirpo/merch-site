import React from 'react';
import PropTypes from 'prop-types';
import Item from "./Item";
import ItemForm from "./ItemForm";
import { v4 } from 'uuid';

function ItemList(props) {

  function handleNewItemSubmission(event) {
    event.preventDefault();
    props.onItemCreation({ name: event.target.name.value, description: event.target.description.value, quantity: event.target.quantity.value, price: event.target.price.value, id: v4() })
  }
  return (
    <React.Fragment>
      <ItemForm buttonText="Add Item to Shop" submitHandler={handleNewItemSubmission} />
      <br></br><br></br>
      <hr />
      {Object.values(props.itemList).map((item) => {
        return <Item name={item.name}
          description={item.description}
          quantity={parseInt(item.quantity)}
          id={item.id}
          price={parseInt(item.price)}
          key={item.id}
          onAddToCart={props.onAddToCart}
          onAddToStock={props.onAddToStock}
          onSelectingItem={props.onSelectingItem}
        />
      })}

    </React.Fragment>
  );
}

ItemList.propTypes = {
  itemList: PropTypes.object,
  onItemCreation: PropTypes.func
};

export default ItemList;