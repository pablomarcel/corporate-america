const express = require('express')

//need to require authentication for the user specific phrases but not the global phrases

const {

    getOpenPhrases,
    getOpenPhrase,

} = require('../controllers/allPhraseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all Phrase routes
router.use(requireAuth)

// GET all Phrases
router.get('/', getOpenPhrases)

//GET a single Phrase
router.get('/:id', getOpenPhrase)

module.exports = router
