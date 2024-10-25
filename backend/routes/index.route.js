const productRoutes = require('./product.route');
const userRoutes = require('./user.route');

module.exports = (app) => {
    app.use('/products', productRoutes)
    app.use('/users', userRoutes)
}