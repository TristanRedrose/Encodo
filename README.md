# Encodo

Encodo is a web application that allows users to input a string and get an encoded version of that string. The encoding is such that each unique character in the string is represented by the character followed by the number of times it occurs consecutively. For example, "X" becomes "X1", "XXYY" becomes "X2Y2", and "XXYYZZZ" becomes "X2Y2Z3".

The frontend of the application is built using Angular and the backend is built using Node.js.

## Installation

To run the application, follow these steps:

1. Clone this repository to your local machine.
2. Install the required packages by running npm install for both API and APP.
3. To test the encode route run npm test from the API directory.
4. Start the backend server by running npm start from the API directory.
5. Start the frontend server by running ng serve from the APP directory.
6. Access the application by navigating to http://localhost:4200 in your web browser.

## Usage

1. Enter a valid username and password (currently only: optimus.prime@autobots.com/validPassword1234!)
2. Enter a string into the input field.
3. Click the "Encode" button.
4. The encoded string will be displayed in the output field.