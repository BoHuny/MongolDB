import jwt from 'jsonwebtoken'

export function authenticateToken(needAuthent, req, res, next) {
    if (needAuthent) {
        const token = req.headers['authorization']
      
        if (token == null) {
            res.redirect("/welcome")
        }
      
        jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => { 
          if (err) return res.sendStatus(403)
          req.user = user
          next()
        })
    }
    else {
        next()
    }
}

export function generateAccessToken(username) {
    return jwt.sign({username: username}, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });
}