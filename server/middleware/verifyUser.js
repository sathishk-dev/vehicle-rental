import jwt from 'jsonwebtoken'

const renewToken = (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    if (!refreshtoken) {
        return res.json({ valid: false, message: "No refresh token" });
    }

    jwt.verify(refreshtoken, process.env.JWT_REFRESH_KEY, (err, decoded) => {
        if (err) {
            return res.json({ valid: false, message: "Invalid Refresh Token" });
        }

        const accessToken = jwt.sign({ email: decoded.email }, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' });
        res.cookie('accessToken', accessToken, { maxAge: 60000 });
        return res.json({ valid: true });
    });
};

export const verifyUser = (req, res, next) => {
    const accesstoken = req.cookies.accessToken;
    if (!accesstoken) {
        return renewToken(req, res);
    }
    jwt.verify(accesstoken, process.env.JWT_ACCESS_KEY, (err, decoded) => {
        if (err) {
            return res.json({ valid: false, message: "Invalid Token" });
        }
        req.email = decoded.email;
        next();
    });
};
