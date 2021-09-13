const express = require('express');
const router = express.Router();
const members = require('../../Members');
const users = require('../../config/database');

const getU = () => {
    return new Promise((resolve, reject) => {
        const usersQ = users.getUsers();
        resolve(usersQ);
    })
}

// Gets all members
router.get('/',(req, res) => {
    getU().then((usersQ) => res.json(usersQ));
    });

router.get('/:name', (req, res) => {
    const found = members.some(member => member.name === req.params.name);
    if(found) {
    res.json(members.filter(member => member.name === req.params.name));
    } else {
        res.status(400).json({msg: `Member not found with name ${req.params.name}`});
    }
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        name: req.body.name,
        age: req.body.age
    }
    members.push(newMember);
    //res.redirect('/');
    res.json(members);
});

// Update Member
router.put('/:name', (req, res) => {
    const found = members.some(member => member.name === req.params.name);
    if(found) {
    const updMember = req.body;
    members.forEach(member => {
        if(member.name === updMember.name) {
            member.age = updMember.age? updMember.age : member.age;
            res.json({ msg: 'Member updated', member});
        }
    });
    } else {
        res.status(400).json({msg: `Member not found with name ${req.params.name}`});
    }
});

// Delete Member
router.delete('/:name', (req, res) => {
    const found = members.some(member => member.name === req.params.name);
    if(found) {
    res.json({
    msg: 'Member deleted', 
    members: members.filter(member => member.name !== req.params.name)
    });
    } else {
        res.status(400).json({msg: `Member not found with name ${req.params.name}`});
    }
});

module.exports = router;
