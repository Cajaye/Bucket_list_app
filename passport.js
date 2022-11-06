const passport = require('passport')
const LocalStrategy = require('passport-local')


const bcrypt = require("bcryptjs")

const User = require("./models/auth")

const comparePws = async (enteredPassword, oldPassword) => {
    return await bcrypt.compare(enteredPassword, oldPassword)
}


passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser(async (username, done) => { //takes cookie and see which user the cookie belongs to
    try {
        const result = await User.findOne({ username: username })
        if (!result) done(null, false)

        done(null, result)

    } catch (error) {
        done(error, false);
    }
})

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const result = await User.findOne({ username: username })
            if (!result) done(null, false)

            const matchPasswords = await comparePws(password, result.password)
            if (!matchPasswords) done(null, false)

            done(null, result)
        }
        catch (error) {
            done(error, false);
        }
    }
))