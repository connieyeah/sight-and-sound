import React from 'react';
import PropTypes from 'prop-types';

const StoryBlock = ({ passage }) => (

  <div>
    <h3>{`Votes: ${passage[0].votes}`}</h3>
    <p>
      {passage[0].text}
    </p>
  </div>
);

StoryBlock.propTypes = {
  passage: PropTypes.instanceOf(Array).isRequired,
};

export default StoryBlock;
