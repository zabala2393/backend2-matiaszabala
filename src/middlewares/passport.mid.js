import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { compareHash, createHash } from "../helpers/hash.util.js";

const callbackURL = "http://localhost:8080/auth/google/redirect"

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
                    const error = new Error("invalid data")
                    error.statusCode = 400
                    throw error
                }
                /* validar si el usuario fue registrado */
                let user = await usersManager.readBy({ email })
                if (user) {
                    const error = new Error("invalid credentials")
                    error.statusCode = 401
                    throw error
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
                    const error = new Error("invalid credentials")
                    error.statusCode = 401
                    throw error
                }

                const verify = compareHash(password, user.password)

                if (!verify) {
                    const error = new Error("invalid credentials")
                    error.statusCode = 401
                    throw error
                }
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
    {clientID:process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET},
    async(accesToken, refreshToken, profile, done)=>{
        try {
            
        } catch (error) {
            done(error)
        }
    }
    )
)
export default passport
