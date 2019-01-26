import React from 'react';
import PropTypes from 'prop-types';

const StoryBlock = ({ passage }) => (
  <p>
    {passage}
  </p>
);

StoryBlock.propTypes = {
  passage: PropTypes.string.isRequired,
};

export default StoryBlock;
