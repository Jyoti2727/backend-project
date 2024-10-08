const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());

let persons = [
    { 
      id: "1",
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: "2",
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: "3",
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: "4",
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
];

app.get('', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    const numberOfPersons = persons.length;
    const requestTime = new Date();

    res.send(`
        <p>Phonebook has info for ${numberOfPersons} people</p>
        <p>${requestTime}</p>
    `);
});

// Route to get a single person by ID
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).send({ error: 'Person not found' });
    }
});


// Route to delete a person by ID
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const personIndex = persons.findIndex(p => p.id === id);

    if (personIndex !== -1) {
        persons = persons.filter(p => p.id !== id);
        res.status(204).end();
    } else {
        res.status(404).send({ error: 'Person not found' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
