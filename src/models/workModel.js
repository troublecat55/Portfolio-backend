import mongoose from 'mongoose';

const {Schema} = mongoose;

const DetailSchema = new Schema ({
    country: [String],
    company: String,
    year: Date,
    
})

const DataSchema = new Schema({
    title:  String,
    views:  String,
    discription: Array,
    image: String,
    language: [{lang: String, url: String}],
    platform: [{name: String, url: String}],
    details:[DetailSchema],
    created_date: {
        type: Date,
        default: Date.now()
    },
});

export const WorkSchema = new Schema({
    lang: String,
    ns: String,
    data: [DataSchema]
})