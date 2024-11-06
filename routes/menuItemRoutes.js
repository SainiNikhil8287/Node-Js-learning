const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/Menu');

///////////////////////////////////////////////////////////////

router.get('/', async (req, res) => {

    try{
         const menus_items = await MenuItem.find();

         console.log('Menu Items fetched');
         res.status(200).json(menus_items);

    }catch(err){

        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
});

/////////////////////////////////////////////////////////////////

router.post('/add', async (req, res) => {

    try{
        const posted_menu = req.body;
        const new_menu = new MenuItem(posted_menu);
        const response = await new_menu.save();

        console.log('Menu Item Saved');
        res.status(200).json(response);

    }catch(err){

        console.log(err);
        res.status(500).json({error : 'Error, Menu Item not save'});
    }
});

//////////////////////////////////////////////////////////////////////

router.get('/:search', async(req, res) => {

    try{

        const search_data = req.params.search;
        const response = await MenuItem.find({name: search_data});
    
        console.log('data fetched');
        res.status(200).json(response);

    }catch(err){

        console.log(err);
        res.status(500).json({error: 'Internal error'});
    }

});

//////////////////////////////////////////////////////////////////////

module.exports = router;