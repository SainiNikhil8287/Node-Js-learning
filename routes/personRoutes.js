const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

////////////////////////////////////////////////////////

router.get('/', async (req, res) =>{
    try{
        const get_data = await Person.find();
        
        console.log('data fetched');
        res.status(200).json(get_data);

    }catch(err){

        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

////////////////////////////////////////////////////////

router.post('/add', async (req, res) => {
    try{

        const posted_data = req.body;
        const newPerson = new Person(posted_data);
        const response = await newPerson.save();

        console.log('data saved');
        res.status(200).json(response);

    }catch(err){

        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }

});

////////////////////////////////////////////////////////

router.get('/:search', async(req, res) => {
    try{
        const search_data = req.params.search;
        if(search_data == 'chef' || search_data == 'manager' || search_data == 'waiter'){
            const response = await Person.find({work: search_data});

            console.log('response fetched');
            res.status(200).json(response);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

////////////////////////////////////////////////////////

module.exports = router;