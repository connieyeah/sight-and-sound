/* eslint-disable-next-line */
import faker from 'faker'; // TODO: Remove this when 
import React from 'react';

import Topic from './Topic';
import StoryBlock from './StoryBlock';
import TextInput from './TextInput';

class WritingPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: 'Lorem Ipsum',
      content: faker.lorem.paragraphs(2),
    };
  }

  render() {
    const { topic, content } = this.state;
    return (
      <div>
        <Topic topic={topic} />
        <StoryBlock content={content} />
        <TextInput />
      </div>
    );
  }
}

export default WritingPrompt;
