const express = require('express');
const router = express.Router();

const projectDb = require('../data/helpers/projectModel.js');



router.get('/', (req, res) => {
    projectDb.get()
    .then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    const { id } = req.params;
    projectDb.getProjectActions(id)
    .then(a => {
        res.status(200).json(a)
    }) 
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    projectDb.insert(req.body)
    .then(p => {
        res.status(201).json(p)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    projectDb.update(id, req.body)
    .then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', validateProjectId, (req, res) => {
    const {id } = req.params;
    projectDb.remove(id)
    .then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

async function validateProjectId(req, res, next) {
    try {
    const { id } = req.params;

    let project = await projectDb.get(id);
    if(project) {
        console.log(project)
        req.project = project;
        next();
    } else {
        res.status(404).json({message: 'invalid project id'});
    }
} catch(error) {
    res.status(500).json(error);
}
};








module.exports = router;