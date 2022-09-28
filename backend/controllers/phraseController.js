const Phrase = require('../models/phraseModel')
const mongoose = require('mongoose')

// get all phrases
const getPhrases = async (req, res) => {
    const user_id = req.user._id

    const phrases = await Phrase.find({user_id}).sort({createdAt: -1})

    res.status(200).json(phrases)
}

// get a single phrase
const getPhrase = async (req, res) => {
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


// create new phrase
const createPhrase = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const phrase = await Phrase.create({title, load, reps, user_id})
        res.status(200).json(phrase)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a phrase
const deletePhrase = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such phrase'})
    }

    const phrase = await Phrase.findOneAndDelete({_id: id})

    if (!phrase) {
        return res.status(400).json({error: 'No such phrase'})
    }

    res.status(200).json(phrase)
}

// update a phrase
const updatePhrase = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such phrase'})
    }

    const phrase = await Phrase.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!phrase) {
        return res.status(400).json({error: 'No such phrase'})
    }

    res.status(200).json(phrase)
}


module.exports = {
    getPhrases,
    getPhrase,
    createPhrase,
    deletePhrase,
    updatePhrase
}
