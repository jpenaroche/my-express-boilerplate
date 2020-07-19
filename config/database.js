module.exports = ({ env }) => {
    return {
        default_connection: env('DB_CONNECTION','mongodb'),
        connections: {
            mongodb: {
                user: env('DB_USER','root'),
                password: env('DB_PASSWORD','master'),
                host: env('DB_HOST','localhost'),
                port: env('DB_PORT',27017),
                db: env('DB_NAME','express-db'),
                disable_auth:env('DB_DISABLE_AUTH',false),
                driver:'mongoose'
            }
        }
    }
}