const express = require('express'); //Express library
const cors = require('cors');//CORS
const app = express();//Creating Express application
const port = 3000;// Port Number

let users = []; //User Data Storing Array
// Enable CORS 
app.use(cors());
app.use(express.json());
// Handle POST requests for Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});
// Handle POST request to register
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const userExists = users.find(u => u.email === email);

    if (userExists) {
        res.status(409).json({ success: false, message: 'User already exists' });
    } else {
        users.push({ email, password });
        res.json({ success: true, message: 'Registration successful' });
    }
});
// Starting The server and listening the port if it has successfully started
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
