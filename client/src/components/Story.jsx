import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import StoryBlock from './StoryBlock';

// Story should take in an array of passages and render the first

const Story = ({ passages }) => {
  const story = _.map(passages, (passage, index) => <StoryBlock key={index} passage={passage} />);
  return (
    <div>
      {story}
    </div>
  );
};

Story.propTypes = {
  passages: PropTypes.instanceOf(Array).isRequired,
};

export default Story;
