import React from 'react';
import Topic from './Topic';

class WritingPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: 'Lorem Ipsum',
    };
  }

  render() {
    const { topic } = this.state;
    return <Topic topic={topic} />;
  }
}

export default WritingPrompt;
