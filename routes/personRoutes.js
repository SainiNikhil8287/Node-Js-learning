const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddelware, generateToken} = require('./../jwt');

//////////////////////////////////////////////////////

router.post('/login', async(req, res) => {

    try{
        // extract username and password form request body
        const {username, password} = req.body;

        const user = await Person.findOne({username: username});

        if(!user || !(await user.comparePassword(password)))
        {
            return res.status(401).json({error:'Invalid Username or Password'});
        }

        const payload = {
            id : user.id,
            username : user.username,
        }

        const token = generateToken(payload);
        res.json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }

});

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

        const token = generateToken(response.username);
        console.log('Token is : ', token);

        res.status(200).json({response : response, token: token});

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

router.put('/:id', async(req, res)=>{
        try{

            const personId = req.params.id;
            const updatedPersonData = req.body;

            const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
                new : true,  // return the updated data
                runValidators : true // Run Mongoose Validations
            });

            if(!response){
                return res.status(404).json({error: 'No data found'});
            }

            res.status(200).json(response);
            console.log('data updated');

        }catch(err){

            console.log(err);
            res.status(500).json({error : 'Internal Server Error'});

        }
});

////////////////////////////////////////////////////////

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        // Wait for the deletion operation to complete
        const response = await Person.findByIdAndDelete(personId);

        // If the document wasn't found, response will be null
        if (!response) {
            return res.status(404).json({ error: "No data found to delete" });
        }

        console.log('Data deleted:', response);
        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

////////////////////////////////////////////////////////

module.exports = router;