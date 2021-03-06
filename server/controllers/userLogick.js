const Groop = require('../models/Groop')
const Week = require('../models/Week')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

exports.createGroop = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: ('Некорректные данные при добавлении группы')
            })
        }

        const { login, nameGroop, passwordGroop } = req.body
        const candidate = await Groop.findOne({ login: login })

        if (candidate) {
            return res.status(400).json({ message: `Группа с таким login ${login} уже зарегистрирована` })
        }

        const hashPassword = await bcrypt.hash(passwordGroop, 7)
        const groop = new Groop({ login, nameGroop, passwordGroop: hashPassword, user: req.user.userID, rules: 'groop' })
        await groop.save()
        return res.status(201).json({ groop, message: 'Группа добавлена' })
    } catch (error) {
        res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }

}

exports.listGroop = async (req, res) => {
    try {
        const groops = await Groop.find({ user: req.user.userID })
        res.json(groops)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

}
exports.cardGroop = async (req, res) => {
    try {
        const groop = await Groop.findOne({ login: req.params.login })
        const week = await Week.findOne({ idGroops: groop._id })
        res.json({ groop, week })
    } catch (e) {
        res.status(500).json({ message: ' попробуйте снова' })
    }

}