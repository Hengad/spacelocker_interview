const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// The fizzbuzz function
function fizzBuzz(fizz, buzz, start, end) {
    let result = '';
    for (let i = start; i < end + 1; i++) {
        let word = '';
        if (i % fizz == 0){
            word += 'fizz';
        }
        if (i % buzz == 0) {
            word += 'buzz';
        }
        if (word.length == 0) {
            word = i;
        }

        result += word + ', ';
    }
    return result.slice(0, -2);
}

// Initial parameters
const parameters = {
    fizz_nb: 2,
    buzz_nb: 5,
    start: 1,
    end: 10
};

// Endpoint to get the parameters
app.get('/api/parameters', (req, res) => {
    res.json(parameters);
});

// Endpoint to get the result
app.get('/api/result', (req, res) => {
    res.json(fizzBuzz(parameters.fizz_nb, parameters.buzz_nb, parameters.start, parameters.end));
});

// Endpoint to update the parameters
app.post('/api/parameter/:id', (req, res) => {
    const id = req.params.id;
    const val = req.body.value;

    if (typeof val !== 'number') {
        return res.status(400).json({ error: 'Invalid number' });
    }

    parameters[id] = val;
    res.json({ [id]: parameters[id] });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
