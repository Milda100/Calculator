// import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";


  const buttons = [
    { value: "C", id: "clear" },
    { 
      id: 'github',
      type: 'link',
      link: 'https://github.com/milda100',
      icon: faGithub
    },
    { value: "/", id: "divide" },
    { value: 7, id: "seven" },
    { value: 8, id: "eight" },
    { value: 9, id: "nine" },
    { value: "*", id: "multiply" },
    { value: 4, id: "four" },
    { value: 5, id: "five" },
    { value: 6, id: "six" },
    { value: "-", id: "subtract" },
    { value: 1, id: "one" },
    { value: 2, id: "two" },
    { value: 3, id: "three" },
    { value: "+", id: "add" },
    { value: 0, id: "zero" },
    { value: ".", id: "decimal" },
    { value: "=", id: "equals" },
  ];


function App() {

  return (
    <>
      <h1>Welcome to the Calculator App</h1>
      <Container id="calculator">
        <p id="display">result</p>
          <div id="keypad">
          {buttons.map(({ id, value }) => {
            // Choose which buttons should span 2 columns
            const gridColumn = (id === 'clear' || id === 'equals')
              ? 'span 2'
              : 'span 1';
            return (
              <Button
                key={id}
                id={id}
                variant="secondary"
                style={{ gridColumn }}
              >
                {value}
              </Button>
            );
          })}
          </div>
          <p>Made with ❤️ by Milda</p>
      </Container>
    </>
  )
}

export default App

