import React from 'react';

const Keywords = (props) => {
  console.log(`these are props`, props)
  const words = props.words;
  const listWords = words.map((word) => 
    <ul>{word}</ul>
  )
  return (
    <ul>{listWords}</ul>
  )
}

export default Keywords;