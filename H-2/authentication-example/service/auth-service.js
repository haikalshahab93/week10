const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await req.db.collection('users').findOne({ username })
        if (user) {
            throw new Error("Username Already exists")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await req.db.collection('users').insertOne({ username, password: hashPassword })

        res.status(201).json({
            message: "user Successfully Registered",
            data: newUser
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body

    const user = await req.db.collection('users').findOne({ username })

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (user && isPasswordCorrect) {
        const token = jwt.sign({ username: user.username, id: user._id }, 'sign')
        res.status(200).json({
            message: "User Successfully Logged In",
            data: token
        })
    }
    else {
        res.status(400).json({
            error: "Password Is Incorrect"
        })
    }
}

module.exports = {
    register, login
}