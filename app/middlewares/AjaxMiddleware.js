module.exports = function (req, res, next) {
    if (req.xhr)
        next()
    else
        res.status(400).send('Bad Request');
}