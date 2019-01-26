import React from 'react';
import PropTypes from 'prop-types';

const StoryBlock = ({ content }) => (
  <p>
    {content}
  </p>
);

StoryBlock.propTypes = {
  content: PropTypes.string.isRequired,
};

export default StoryBlock;
