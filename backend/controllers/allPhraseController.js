const Phrase = require('../models/phraseModel')
const mongoose = require('mongoose')

// get all phrases
const getOpenPhrases = async (req, res) => {
    const user_id = req.user._id

    const query={}

    const phrases = await Phrase.find({query}).sort({createdAt: -1})

    console.log(phrases)

    res.status(200).json(phrases)
}

// get a single phrase
const getOpenPhrase = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such phrase'})
    }

    const phrase = await Phrase.findById(id)

    if (!phrase) {
        return res.status(404).json({error: 'No such phrase'})
    }

    res.status(200).json(phrase)
}

module.exports = {
    getOpenPhrases,
    getOpenPhrase,
}
