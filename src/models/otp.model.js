const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true
    },

    otp:{
        type: Number,
        required : true
    },

    isVarified: {
        type: Boolean,
        default: false
    },

    timestamp: {
        type : Date,
        default: Date.now,
        set : (timestamp)=> new Date(timestamp),
        get : (timestamp)=> timestamp.getTime()
    }

});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp