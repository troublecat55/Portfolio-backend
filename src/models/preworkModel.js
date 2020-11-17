import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DetailSchema = new Schema ({
    country: [String],
    company: String,
    platform: [String],
    language: [String],
    year: Date,
    
})

export const PreworkSchema = new Schema({
    title:  String,
    views:  String,
    discription: Array,
    links: [String],
    details:[DetailSchema],
    created_date: {
        type: Date,
        default: Date.now()
    },
});