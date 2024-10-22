const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const os = require('os');
const cors = require('cors')

const authRoutes = require('./routes/authRoutes');
const configRoutes = require('./routes/configRoutes');
const typeRoutes = require('./routes/productTypeRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const deliveryStatusRoutes = require('./routes/deliveryStatusRoutes');
const paymentStatusRoutes = require('./routes/paymentStatusRoutes');
const accountRoutes = require('./routes/accountRoutes');
const formatRoutes = require('./routes/formatRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const vnpayRoutes = require('./routes/vnpayRoutes');
const eventRoutes = require('./routes/eventRoutes');
const donationRoutes = require('./routes/donationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const addressRoutes = require('./routes/addressRoutes');

const config = require('./config');
const morgan = require('morgan')
const passport = require('./passport');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: '*'
}))
app.use(passport.initialize());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB connected')

        User.findOne({username: 'admin'}).then(async (user) => {
            if (!user) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash('admin', salt);

                const adminUser = new User({
                    username: 'admin',
                    fullname: 'Admin User',
                    email: 'admin@gmail.com',
                    password: hashedPassword,
                    isAdmin: true,
                    isTeacher: true,
                });

                await adminUser.save();
            }
        })
    })
        .catch(err => console.log(err));
})
    .catch(err => console.log(err));

const version = 'v1'

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(`/${version}/auth`, authRoutes);
app.use(`/${version}/config`, configRoutes);
app.use(`/${version}/types`, typeRoutes);
app.use(`/${version}/payment-methods`, paymentRoutes);
app.use(`/${version}/delivery-methods`, deliveryRoutes);
app.use(`/${version}/delivery-statuses`, deliveryStatusRoutes);
app.use(`/${version}/payment-statuses`, paymentStatusRoutes);
app.use(`/${version}/accounts`, accountRoutes);
app.use(`/${version}/formats`, formatRoutes);
app.use(`/${version}/publishers`, publisherRoutes);
app.use(`/${version}/authors`, authorRoutes);
app.use(`/${version}/books`, bookRoutes);
app.use(`/${version}/carts`, cartRoutes);
app.use(`/${version}/orders`, orderRoutes);
app.use(`/${version}/vnpay`, vnpayRoutes);
app.use(`/${version}/events`, eventRoutes);
app.use(`/${version}/donations`, donationRoutes);
app.use(`/${version}/feedbacks`, feedbackRoutes);
app.use(`/${version}/addresses`, addressRoutes);

app.use(`/${version}`, express.static('uploads'));


function getServerIP() {
    const interfaces = os.networkInterfaces();
    for (const iface in interfaces) {
        for (const alias of interfaces[iface]) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'localhost';
}

const [host, port] = (process.argv[2] || '0.0.0.0:5000').split(':');

const server = app.listen(port, host, () => {
    const serverIP = getServerIP();
    console.log(`Server running at http://${serverIP}:${port}/${version}`);
});