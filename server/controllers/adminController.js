import AdminModel from "../models/Admin.js";
import jwt from 'jsonwebtoken'

export const adminLogin = (req, res) => {
    const { email, password } = req.body;
    AdminModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    const accessToken = jwt.sign({ email: email }, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' })
                    const refreshToken = jwt.sign({ email: email }, process.env.JWT_REFRESH_KEY, { expiresIn: '1h' })

                    res.cookie('accessToken', accessToken, { maxAge: 30 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' })
                    res.cookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' })

                    return res.json({ login: true, name: user.name })
                }
                else {
                    res.json({ login: false, message: "You are not Admin" })
                }
            }
            else {
                res.json({ login: false, message: "You are not Admin" })
            }
        })
        .catch(err => res.json(err))
}

export const dashboard = (req, res) => {
    return res.json({ valid: true, email: req.email });
}


export const adminLogout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ logout: true });
}
