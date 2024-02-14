const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    
});

const Subscription = mongoose.model('Subscription',subscriptionSchema);
module.exports = Subscription