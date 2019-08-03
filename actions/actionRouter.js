const express = require('express');
const router = express.Router();

const actionDb = require('../data/helpers/actionModel.js');



router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
})

router.post('/', (req, res) => {
    actionDb.insert(req.body)
    .then(a => {
        res.status(201).json(a)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id', validateActionId, (req, res) => {
    const { id } = req.params;

    actionDb.update(id, req.body)
    .then(a => {
        res.status(200).json(a)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    actionDb.remove(id)
    .then(r => {
        res.status(200).json(r)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

async function validateActionId(req, res, next) {
    try {
    const { id } = req.params;

    let action = await actionDb.get(id);
    if(action) {
        
        req.action = action;
        next();
    } 
} catch(error) {
    console.log(error);
    res.status(404).json({message: 'invalid action id'});
}
};
//everything works actionRouter had a bug where was throwing 500 so changed 404 to run in catch.  worked other way in projectRouter
//Am not sure of the why of this why cant have the else with 404 and catch with 500 in action router?  I know async get in project has something to do with it

module.exports = router;

