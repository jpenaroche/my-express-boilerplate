class Resolver {
    static controller(pathname) {
        return (req, res, next) => {
            const [controller, method] = pathname.split('@')

            let Blueprint = null
            try {
                Blueprint = require(`../app/controllers/${controller}`)
            }
            catch (e) {
                console.error("Resolver -> controller -> e", e)
                throw new Error(`Controller ${controller} doesn't exist`)
            }

            try{
                return new Blueprint(req, res)[method](req.params)
            }
            catch(e){
                console.error("Resolver -> controller -> e", e)
                throw new Error(`Method ${method} doesn't exist`)
            }
        }
    }
}

module.exports = Resolver