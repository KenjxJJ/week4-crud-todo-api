const logger = (req, res, next) => {
    console.log('=====================================================')
    let timestamp = new Date().toISOString()
    console.log(`${timestamp}: ${req.method} ${req.url} ${req.ip}`)
    console.log('=====================================================')
    next()

}

module.exports = logger