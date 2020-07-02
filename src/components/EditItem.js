import React from 'react';
import ItemForm from './ItemForm';
import PropTypes from 'prop-types';

function EditItem(props) {
  const { item } = props;

  function handleItemEditSubmission(event) {
    event.preventDefault();
    props.onEditItem({
      name: event.target.name.value, description: event.target.description.value, quantity: event.target.quantity.value, price: event.target.price.value, id: item.id
    })
  };

  function handleDeletingItemClick() {
    props.onDeleteItem(item.id)
  }
  return (
    <React.Fragment>
      <h2>Edit Item: {item.name}</h2>
      <p>Current Description: {item.description}</p>
      <p>Current Price: {item.price}</p>
      <p>Current Quantity in Stock: {item.quantity}</p><br /><br />
      <ItemForm buttonText="Edit Item" submitHandler={handleItemEditSubmission} />
      <br /><br />
      <button onClick={handleDeletingItemClick}>Delete This Item</button>
    </React.Fragment>
  )
}

EditItem.propTypes = {
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
}

export default EditItem;