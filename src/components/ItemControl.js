import React from 'react';
import PropTypes from 'prop-types';
import ItemList from './ItemList';
import Cart from "./Cart";
import EditItem from "./EditItem";
import { connect } from 'react-redux';

class ItemControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: {},
      selectedItem: null
    }
  };

  handleCreatingItemsToList = (newItem) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity, price } = newItem;
    const action = {
      type: 'ADD_ITEM',
      id: id,
      name: name,
      description: description,
      quantity: quantity,
      price: price
    }
    dispatch(action);
  }

  handleAddingItemsToCart = (item) => {
    const newCartList = { ...this.state.cartList, [item.name]: (this.state.cartList[item.name] || 0) + 1 }
    if (item.quantity > 0) {
      const { dispatch } = this.props;
      const { id, name, description, quantity, price } = item;
      const action = {
        type: 'ADD_ITEM',
        id: id,
        name: name,
        description: description,
        quantity: quantity - 1,
        price: price
      }
      dispatch(action);
      this.setState({
        cartList: newCartList
      }, () => {
        console.log(this.state.cartList);
        console.table(this.props.masterItemList);
      })
    }
  }

  handleAddingInventoryToItem = (amount, item) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity, price } = item;
    const action = {
      type: 'ADD_ITEM',
      id: id,
      name: name,
      description: description,
      quantity: parseInt(quantity) + parseInt(amount),
      price: price
    }
    dispatch(action)
  }



  handleSelectingItem = (id) => {
    const selectedItem = this.props.masterItemList[id];
    this.setState({ selectedItem: selectedItem })
  }

  handleEditingItem = (item) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity, price } = item;
    const action = {
      type: 'ADD_ITEM',
      id: id,
      name: name,
      description: description,
      quantity: quantity,
      price: price
    }
    dispatch(action)
    this.setState({ selectedItem: null })

  }

  handleDeletingItem = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: "DELETE_ITEM",
      id: id
    }
    dispatch(action);
    const thisItem = this.props.masterItemList[id];
    const { [thisItem.name]: value, ...listWithoutItem } = this.state.cartList;
    console.log("NEW CART");
    console.table(listWithoutItem);
    this.setState({
      selectedItem: null,
      cartList: listWithoutItem
    })
  }

  render() {
    let cartState = <Cart cartList={this.state.cartList} />;
    let itemState = null

    if (this.state.selectedItem == null) {
      itemState = <ItemList itemList={this.props.masterItemList}
        onItemCreation={this.handleCreatingItemsToList}
        onAddToCart={this.handleAddingItemsToCart}
        onAddToStock={this.handleAddingInventoryToItem}
        onSelectingItem={this.handleSelectingItem} />;
    } else if (this.state.selectedItem != null) {
      itemState = <EditItem item={this.state.selectedItem}
        onEditItem={this.handleEditingItem}
        onDeleteItem={this.handleDeletingItem} />
    }
    return (

      <React.Fragment>
        <h3>Item Control</h3>
        {cartState}
        {itemState}
      </React.Fragment>
    );
  }
}
ItemControl.propTypes = {
  masterItemList: PropTypes.object
};
const mapStateToProps = state => {
  return {
    masterItemList: state
  }
}
ItemControl = connect(mapStateToProps)(ItemControl);

export default ItemControl;