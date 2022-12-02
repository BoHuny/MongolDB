import jwt from 'jsonwebtoken'

export function authenticateToken(needAuthent, req, res, next) {
    if (needAuthent) {
        let token = req.headers['authorization']
      
        if (token == null) return res.sendStatus(401)
        token = token.split(" ")[1]

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