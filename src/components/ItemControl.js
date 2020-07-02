import React from 'react';
import ItemList from './ItemList';
import Cart from "./Cart";
import EditItem from "./EditItem";

class ItemControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterItemList: [],
      cartList: {},
      selectedItem: null
    }
  };

  handleCreatingItemsToList = (newItem) => {
    const newMasterItemList = this.state.masterItemList.concat(newItem)
    this.setState({
      masterItemList: newMasterItemList
    })
  }

  handleAddingItemsToCart = (item) => {
    const newCartList = { ...this.state.cartList, [item.name]: (this.state.cartList[item.name] || 0) + 1 }
    if (item.quantity > 0) {
      this.setState(prevState => ({
        cartList: newCartList,
        masterItemList: prevState.masterItemList.map(
          (obj, index) => (obj.name === item.name ? Object.assign({}, this.state.masterItemList[index], { quantity: item.quantity - 1 }) : obj)
        )
      }), () => {
        console.log(this.state.cartList);
        console.table(this.state.masterItemList);
      })
    }
  }

  handleAddingInventoryToItem = (amount, item) => {
    this.setState(prevState => ({
      masterItemList: prevState.masterItemList.map(
        (obj, index) => (obj.name === item ? Object.assign({}, this.state.masterItemList[index], { quantity: parseInt(obj.quantity) + parseInt(amount) }) : obj)
      )
    }))

  }

  handleSelectingItem = (id) => {
    const selectedItem = this.state.masterItemList.filter(item => item.id === id)[0];
    this.setState({ selectedItem: selectedItem });
  }

  handleEditingItem = (item) => {
    const masterItemListWithEdit = this.state.masterItemList.map(
      (obj, index) => (obj.id === item.id ? Object.assign({}, this.state.masterItemList[index], item) : console.log("ERROR YOU JOKER"))
    );
    this.setState({ masterItemList: masterItemListWithEdit, selectedItem: null })

  }

  handleDeletingItem = (id) => {
    const masterItemListWithoutItem = this.state.masterItemList.filter(item => item.id !== id);
    const thisItem = this.state.masterItemList.filter(item => item.id === id)[0];
    const { [thisItem.name]: value, ...listWithoutItem } = this.state.cartList;
    console.log("NEW CART");
    console.table(listWithoutItem);
    this.setState({
      masterItemList: masterItemListWithoutItem,
      selectedItem: null,
      cartList: listWithoutItem
    })




    // const { [thisItem.name]: value, ...listWithoutItem } = this.state.cartList;
    // console.log("NEW CART");
    // console.table(listWithoutItem);
  }

  render() {
    let cartState = <Cart cartList={this.state.cartList} />;
    let itemState = null

    if (this.state.selectedItem == null) {
      itemState = <ItemList itemList={this.state.masterItemList}
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

export default ItemControl;
