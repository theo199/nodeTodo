module.exports = (req, res, next) => {

    if (req.headers['user-agent'].includes('Postman')) {
        res.json({
            status: 401,
            error: "Postman n'est pas autorisé."
        })
    } else {
        next()
    }
    
}