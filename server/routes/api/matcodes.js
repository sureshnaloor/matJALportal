const express = require('express');
const router = express.Router();

// load book model 

const Matcodes = require('../../models/Matcodes');
const Matgroup = require('../../models/MatGroup');

// route GET api/matmaster/test
// description matmaster get route testing
// access Public

router.get('/test', (req, res) => res.send('route testing!')); 
router.get('/', (req,res) => res.json({message: "inside matcode model route"}))

// GET /api/matcodes
// description: Get all Matcodes
// access: Public
router.get('/all', (_, res) => {
    try{
        console.log(`fetch started at ${new Date().getSeconds()}`)
        Matcodes.find({MaterialGroup: "CM02"}).lean()        
            .then(matcodes => res.json(matcodes))
            .then(() => console.log(`fetch ended at ${new Date().getSeconds()}`))
    }catch(err){
        console.error(err.message)
    }  
});

router.get('/matgroup/:matgroup', (req, res) => {
    try{
        Matcodes.find({MaterialGroup: req.params.matgroup})        
            .then(matcodes => res.json(matcodes))
            
    }catch(err){
        console.error(err.message)
    }    
});

router.get('/matgroups', (req,res) => {
    try {
        Matgroup.find()
        .then(data => res.json(data))
    }
    catch(err){
        console.log(err.message)
    }
})

router.get('/:id', (req, res) => {
    Matcodes.findById(req.params.id)
      .then(matcode => res.json(matcode))
      .catch(err => res.status(404).json({ nobookfound: 'No matcode found' }));
  });

router.get('/matcode/:matcode', (req, res) => {    
    Matcodes.find({MaterialCode: req.params.matcode})
      .then(matcode => res.json(matcode))
      .catch(err => res.status(404).json({ nobookfound: 'No matcode found' }));
  });

router.get('/matdesc/:mdesc', (req, res) => {
    Matcodes.find({"MaterialDescription": new RegExp('^'+ req.params.mdesc, "i")})
    .then(mat => res.json(mat))
    .catch(err => res.status(404).json(err));
});

router.post('/', (req, res) => {
    Matcodes.create(req.body)
      .then(matcode => res.json({ msg: 'Matcode added successfully' }))
      .catch(err => res.status(400).json({ error: `{${err.message}}` }));
  });

  // @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
    Matcodes.findByIdAndUpdate(req.params.id, req.body)
      .then(matcode => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  });
  
  // @route GET api/books/:id
  // @description Delete book by id
  // @access Public
router.delete('/:id', (req, res) => {
    Matcodes.findByIdAndRemove(req.params.id, req.body)
      .then(matcode => res.json({ mgs: 'Matcode entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'Such matcode doesnt exist' }));
  });

module.exports = router; 