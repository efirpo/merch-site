import React from "react";
import PropTypes from "prop-types";

function Item(props) {

  function handleAddToCartClick() {
    props.onAddToCart({
      name: props.name, description: props.description,
      quantity: props.quantity, price: props.price
    })
  }

  function handleAddToStock(event) {
    event.preventDefault();
    props.onAddToStock(event.target.adds.value, props.name);
  }

  function handleSelectingItem() {
    props.onSelectingItem(props.id)
  }

  return (
    <React.Fragment>
      <h3>{props.name}</h3>
      <p>Description: {props.description}</p>
      {props.quantity > 0 &&
        <p>Quantity in Stock: {props.quantity}</p>
      }
      {props.quantity === 0 &&
        <p>This item is out of stock.</p>
      }
      <p><em>{props.price}</em> <strong>gold pieces</strong></p>
      <br></br>
      <button onClick={handleAddToCartClick}>Add to Cart</button>
      <form onSubmit={handleAddToStock}>
        <input type="number" name="adds" placeholder="Add Additional Stock" />
        <button type="submit"><h2>+</h2></button>
      </form>
      <button onClick={handleSelectingItem}>Edit Item</button>
    </React.Fragment>


  )
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  id: PropTypes.string,
  onAddToCart: PropTypes.func,
  onAddToStock: PropTypes.func,
  onSelectingItem: PropTypes.func,
}

export default Item;