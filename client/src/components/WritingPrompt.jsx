/* eslint-disable no-console */
/* eslint-disable-next-line */
import faker from 'faker'; // TODO: Remove this when 
import React from 'react';
import axios from 'axios';

import Topic from './Topic';
import StoryBlock from './StoryBlock';
import TextInput from './TextInput';

class WritingPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: 'Lorem Ipsum',
      content: faker.lorem.paragraphs(2),
      testState: 'TEST',
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { testState } = this.state;
    const payload = {
      content: testState,
    };
    axios.post('/create', payload)
      .then(console.log)
      .catch(console.log);
  }

  handleTextChange(e) {
    // This needs to post, and then grab the content
    e.preventDefault();
    this.setState({
      testState: e.target.value,
    });
  }

  render() {
    const { topic, content, testState } = this.state;
    const handleTextChangeProps = {
      handleTextChange: this.handleTextChange,
      handleSubmit: this.handleSubmit,
      testState,
    };

    return (
      <div>
        <Topic topic={topic} />
        <StoryBlock content={content} />
        <TextInput {...handleTextChangeProps} />
      </div>
    );
  }
}

export default WritingPrompt;
