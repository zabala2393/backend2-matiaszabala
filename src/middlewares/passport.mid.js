import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { compareHash, createHash } from "../helpers/hash.util.js";
import { usersManager } from "../data/manager.mongo.js";
import { createToken } from "../helpers/token.util.js";

const callbackURL = "http://localhost:8080/api/auth/google/redirect"

passport.use(
    "register",
    new LocalStrategy(
        /* objeto de configuracion */
        { passReqToCallback: true, usernameField: "email" },
        /* callback de la logica */
        async (req, email, password, done) => {
            try {
                const { city } = req.body
                if (!city) {
                    //const error = new Error("invalid data")
                    //error.statusCode = 400
                    //throw error
                    return done(null, null, {message: "invalid data", statusCode:400})
                }
                /* validar si el usuario fue registrado */
                let user = await usersManager.readBy({ email })
                if (user) {
                    //const error = new Error("invalid credentials")
                    //error.statusCode = 401
                    //throw error
                    return done(null, null, {message: "invalid credentials", statusCode:401})
                }
                req.password = createHash(password)
                /* registro del usuario (create) */
                user = await usersManager.createOne(req.body)
                /* done terrmina proceso y agrega los datos al req.user */
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
        /* objeto de configuracion */
        { passReqToCallback: true, usernameField: "email" },
        /* callback de la logica */
        async (req, email, password, done) => {

            try {

                /* validar si el usuario fue registrado */

                let user = await usersManager.readBy({ email })

                if (!user) {
                    //const error = new Error("invalid credentials")
                    //error.statusCode = 401
                    //throw error
                    return done(null, null, {message: "invalid data", statusCode:401})
                }

                const verify = compareHash(password, user?.password)

                if (!verify) {
                    //const error = new Error("invalid credentials")
                    //error.statusCode = 401
                    //throw error
                    return done(null, null, {message: "invalid data", statusCode:400})
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
    "google",
    new GoogleStrategy(
        { clientID: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET, callbackURL },
        async (accesToken, refreshToken, profile, done) => {
            try {
                let user = await usersManager.readBy({ email: id })
                if (!user) {
                    user = {
                        email: id,
                        name: name.givenName,
                        avatar: picture,
                        password: createHash(email),
                        city: "Google"
                    }
                    user = await usersManager.createOne(user)
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
                const user = await usersManager.readBy({_id, role, email})
                if (!user) {
                    //const error = new Error("Forbidden")
                    //error.statusCode = 403
                    //throw error
                    return done(null, null, {message: "Forbidden", statusCode:403})
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
        async(data,done) => {
            try {
                const { _id, role, email } = data
                const user = await usersManager.readBy({_id, role, email})
                if (!user && user?.role !== "ADMIN") {
                    //const error = new Error("Forbidden")
                    //error.statusCode = 403
                    //throw error
                    return done(null, null, {message: "forbidden", statusCode:403})
                }
            } catch (error) {
                done(error)
            }
         }
    )
)
export default passport
