const express = require('express')
const {
    createPhrase,
    getPhrases,
    getPhrase,
    deletePhrase,
    updatePhrase
} = require('../controllers/phraseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all Phrase routes
router.use(requireAuth)

// GET all Phrases
router.get('/', getPhrases)

//GET a single Phrase
router.get('/:id', getPhrase)

// POST a new Phrase
router.post('/', createPhrase)

// DELETE a Phrase
router.delete('/:id', deletePhrase)

// UPDATE a Phrase
router.patch('/:id', updatePhrase)


module.exports = router
