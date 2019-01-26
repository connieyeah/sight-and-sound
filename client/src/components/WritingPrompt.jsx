/* eslint-disable no-console */
/* eslint-disable-next-line */
import faker from 'faker'; // TODO: Remove this when 
import React from 'react';
import axios from 'axios';

import Topic from './Topic';
import Story from './Story';
import TextInput from './TextInput';

const fakeData = [
  [
    { text: faker.lorem.paragraphs(2), votes: 4 },
    { text: faker.lorem.paragraphs(2), votes: 2 },
    { text: faker.lorem.paragraphs(2), votes: 1 },
  ],
  [
    { text: faker.lorem.paragraphs(2), votes: 19 },
    { text: faker.lorem.paragraphs(2), votes: 17 },
    { text: faker.lorem.paragraphs(2), votes: 16 },
  ],
  [
    { text: faker.lorem.paragraphs(2), votes: 29 },
    { text: faker.lorem.paragraphs(2), votes: 28 },
    { text: faker.lorem.paragraphs(2), votes: 0 },
  ],
];

class WritingPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: 'Lorem Ipsum',
      passages: fakeData,
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
    const { topic, passages, testState } = this.state;
    const handleTextChangeProps = {
      handleTextChange: this.handleTextChange,
      handleSubmit: this.handleSubmit,
      testState,
    };

    return (
      <div>
        <Topic topic={topic} />
        <Story passages={passages} />
        <TextInput {...handleTextChangeProps} />
      </div>
    );
  }
}

export default WritingPrompt;
