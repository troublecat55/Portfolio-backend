import mongoose from 'mongoose';

const {Schema} = mongoose;
const HomeDetailSchema = new Schema({
    subBanner:  String,
    upperBtn:  String,
    bottomBtn: String,
    currentLearning:Array,
    advertisingMarketer:Array,
    created_date: {
        type: Date,
        default: Date.now()
    },
});

export const HomeSchema = new Schema({
    lang: String,
    ns: String,
    data: HomeDetailSchema
})