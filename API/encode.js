module.exports = function encoder(req, res) {
  
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({message: 'Request body cannot be empty'});
    }

    const { dataToEncode } = req.body;

    if (!dataToEncode) {
      return res.status(400).send({message: 'String cannot be empty'});
    }

    const encodedString = encode(dataToEncode);
    
    return res.send({encodedData: `${encodedString}`})
}

function encode(inputString) {
  let encoded = '';
  let currChar = inputString[0];
  let charCount = 1;

  for (let i = 1; i < inputString.length; i++) {
    if (inputString[i] === currChar) {
      charCount++;
    } else {
      encoded += currChar + charCount.toString();
      currChar = inputString[i];
      charCount = 1;
    }
  }

  encoded += currChar + charCount.toString();
  return encoded;
}