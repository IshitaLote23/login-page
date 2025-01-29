const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/registrationForm')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));
const userSchema = new mongoose.Schema({
    username: String,
    FirstName: String,
    lastname: String,
    number: String,
    password: String
});
const User = mongoose.model('User', userSchema);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.post('/register', (req, res) => {
    const { username, FirstName, lastname, number, password } = req.body;
    const newUser = new User({
        username,
        FirstName,
        lastname,
        number,
        password
    });

    newUser.save()
        .then(() => res.send('Registration successful!'))
        .catch(err => res.status(500).send('Error registering user: ' + err.message));
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (user) {
            res.send(`Welcome back, ${user.username}!`);
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        res.status(500).send('Error logging in: ' + err.message);
    }
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});