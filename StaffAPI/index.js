
const process = require('node:process');  
const express = require('express');
const cors = require('cors');

const app = express();

const PARSED_PORT = parseInt(process.argv[2]);
const PORT = isNaN(PARSED_PORT) ? 3000 : PARSED_PORT;

const STAFF = [
    {
        id: 1,
        name: "John Smith",
        phone: "02 9988 2211",
        department: 1,
        address: {
            street: "1 Code Lane",
            city: "Javaville",
            state: "NSW",
            zip: "0100",
            country: "Australia"
        }
    },
    {
        id: 2,
        name: "Sue White",
        phone: "03 8899 2255",
        department: 2,
        address: {
            street: "16 Bit Way",
            city: "Byte Cove",
            state: "QLD",
            zip: "1101",
            country: "Australia"
        }
    },
    // Add other sample staff data as needed
];

const ERR_MSG = (msg) => ({ reason: msg });

app.use(express.json());
app.use(cors());

// Get all staff
app.get('/staff', (req, res) => {
    res.send(STAFF);
});

// Get a staff member by ID
app.get('/staff/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send(ERR_MSG("ID is not a number"));
    } else {
        const staff = STAFF.find(s => s.id === id);
        if (!staff) {
            res.status(404).send(ERR_MSG("Staff member not found"));
        } else {
            res.send(staff);
        }
    }
});

// Add a new staff member
app.post('/staff', (req, res) => {
    const staff = req.body;
    if (staff.name && staff.phone && staff.department && staff.address) {
        staff.id = STAFF.length ? STAFF[STAFF.length - 1].id + 1 : 1; // Generate new ID
        STAFF.push(staff);
        res.status(200).send({ reason: "Success, staff member added" });
    } else {
        res.status(400).send(ERR_MSG("Missing fields for staff member"));
    }
});

// Update a staff member by ID
app.put('/staff/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send(ERR_MSG("ID is not a number"));
    } else {
        const index = STAFF.findIndex(s => s.id === id);
        if (index === -1) {
            res.status(404).send(ERR_MSG("Staff member not found"));
        } else {
            const staff = req.body;
            if (staff.name && staff.phone && staff.department && staff.address) {
                STAFF[index] = staff;
                res.status(200).send({ reason: "Success, staff member updated" });
            } else {
                res.status(400).send(ERR_MSG("Missing fields for staff member"));
            }
        }
    }
});

// Delete a staff member by ID
app.delete('/staff/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send(ERR_MSG("ID is not a number"));
    } else {
        const index = STAFF.findIndex(s => s.id === id);
        if (index === -1) {
            res.status(404).send(ERR_MSG("Staff member not found"));
        } else {
            STAFF.splice(index, 1);
            res.status(200).send({ reason: "Success, staff member removed" });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Staff Directory API running on port ${PORT}`);
});
