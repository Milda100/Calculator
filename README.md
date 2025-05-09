# React Calculator (FreeCodeCamp Project)

## Description
This calculator follows FreeCodeCamp's user story guidelines while leveraging React for dynamic UI updates, Bootstrap for styling, and SASS for custom enhancements.
**Project link:**
https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-javascript-calculator

## Features
- **React-based UI** with dynamic state updates
- **Styled using Bootstrap** for responsiveness
- **SASS for custom styling** and maintainability
- **Formula logic** ensuring correct order of operations
- **Interactive keypad** with operators, numbers, decimal handling, and a display output

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/calculator.git
2. Navigate to the project directory:
npm install
npm install react-bootstrap bootstrap
npm install -g sass

## Usage- Start the development server:
1. npm run dev
2. Open http://localhost:5173/ in a browser.
3. Use the interactive calculator interface for calculations.

## Tech Stack
- **React** – Component-based UI design
- **Bootstrap** – Responsive styling
- **SASS** – Modular and scalable styles

## Logic Considerations
- Multiple consecutive operators default to the last entered (excluding `-` for negatives).
- Pressing `=` starts a new calculation based on the previous result.
- Decimal precision maintained to at least four places.
## Contributing
Fork the repository, make improvements, and submit pull requests!
## License
This project is licensed under the MIT License.
