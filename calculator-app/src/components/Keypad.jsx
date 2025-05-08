import React from 'react'
import Button from 'react-bootstrap/Button'


function Keypad({ buttons, handleButtonClick }) {
    return (
        <>
            <div id="keypad">
            {buttons.map(({ id, value }) => {

                return (
                <Button
                    key={id}
                    id={id}
                    onClick={() => handleButtonClick(value)}
                    variant="secondary"
                    style={{ gridColumn: (id === 'clear' || id === 'equals') ? 'span 2' : 'span 1'}} // buttons span 2 columns
                >
                    {value}
                </Button>
                );
            })}
            </div>
          </>
    )
}

export default Keypad;