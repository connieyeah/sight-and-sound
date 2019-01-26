import React from 'react';
import PropTypes from 'prop-types';

// TODO: Add word counter
const TextInput = ({ handleTextChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <textarea onChange={handleTextChange} />
    <input type="submit" />
  </form>
);

TextInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
};

export default TextInput;
