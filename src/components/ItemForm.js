import React from 'react';
import PropTypes from 'prop-types';

function ItemForm(props) {


  return (
    <React.Fragment>
      <form onSubmit={props.submitHandler}>
        <input
          type='text'
          name='name'
          placeholder='Item Name' />
        <input
          type='text'
          name='description'
          placeholder='Item Description' />
        <input
          type='number'
          name='quantity'
          placeholder='Initial Stock Quantity' />
        <input
          type='number'
          name='price'
          placeholder='Item Price Point' />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  )
}

ItemForm.propTypes = {
  submitHandler: PropTypes.func,
  buttonText: PropTypes.string
}

export default ItemForm;