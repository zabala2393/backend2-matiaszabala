import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, compareHash } from "../helpers/hash.util.js";
import usersRepository from "../repositories/users.repository.js"
import { createToken } from "../helpers/token.util.js";
import verifyUserEmail from "../helpers/verifyUser.helper.js";

const callbackURL = "http://localhost:8080/api/auth/google/redirect"

passport.use(
    "register",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                let user = await usersRepository.readBy({ email })
                if (user) { return done(null, null, { message: "invalid credentials", statusCode: 401 }) }
                user = await usersRepository.createOne(req.body)
                await verifyUserEmail(user.email, user.verifyCode)
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)
passport.use(
    "login",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                let user = await usersRepository.readBy({ email })
                if (!user) { return done(null, null, { message: "invalid credentials", statusCode: 401 }) }
                const verify = compareHash(password, user?.password)
                if (!verify) { return done(null, null, { message: "invalid password", statusCode: 400 }) }
                const data = {
                    _id: user._id,
                    role: user.role,
                    email
                }

                const verifyAccount = user.isVerified
                console.log(verifyAccount)
                if (!verifyAccount) {
                    return done(null, null, {
                        message: "Por favor, verifique su cuenta",
                        statusCode: 400
                    })
                }
                const token = createToken(data)
                user.token = token
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)
passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL,
            scope: ['profile', 'email']
        },
        async (accesToken, refreshToken, profile, done) => {
            try {

                const userEmail = profile.emails[0].value
                const userGoogleId = profile.id

                let user = await usersRepository.readBy({ email: userEmail })
                if (!user) {
                    user = {
                        email: id,
                        first_name: first_name.givenName,
                        last_name: last_name.givenName,
                        password: createHash(email),
                        googleId: userGoogleId
                    }
                    user = await usersRepository.createOne(user)
                }
                const data = {
                    _id: user_id,
                    role: user.role,
                    email
                }
                const token = createToken(data)
                user.token = token
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "user",
    new JwtStrategy(
        { secretOrKey: process.env.SECRET, jwtFromRequest: ExtractJwt.fromExtractors([req => req?.signedCookies?.token]) },
        async (data, done) => {
            try {
                const { _id, role, email } = data
                const user = await usersRepository.readAll({ _id, role, email })
                if (!user) {
                    return done(null, null, { message: "Forbidden", statusCode: 403 })
                }
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "admin",
    new JwtStrategy(
        { secretOrKey: process.env.SECRET, jwtFromRequest: ExtractJwt.fromExtractors([req => req?.signedCookies?.token]) },
        async (data, done) => {
            try {
                const { _id, role, email } = data
                const user = await usersRepository.readAll({ _id, role, email })
                if (!user && user?.role !== "ADMIN") { return done(null, null, { message: "forbidden", statusCode: 403 }) }
            } catch (error) {
                done(error)
            }
        }
    )
)
export default passport