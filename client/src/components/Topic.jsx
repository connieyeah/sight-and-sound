import React from 'react';
import PropTypes from 'prop-types';

const Topic = ({ topic }) => <h1>{topic}</h1>;

Topic.propTypes = {
  topic: PropTypes.string.isRequired,
};

export default Topic;
