import mongoose from 'mongoose';
import {WorkSchema} from '../models/workModel.js';
import Debug from "debug";
const debug = Debug("app");
// const debug = require('debug')('app');

//convert Schema into a Model 
//https://stackoverflow.com/questions/54878935/how-to-change-collection-name-in-mongoose-model
//Mongoose#model(name, [schema], [collection], [skipInit])
export const Prework = mongoose.model('Prework', WorkSchema, 'preworks');

export const addNewPrework = async (req, res) => {
    let newPrework = new Prework(req.body);
    try{
        const prework = await newPrework.save()
        res.json(prework);
    } 
    catch(err) {
        debug(err.message)
    }
    
}

export const getPrework = async (req, res) => {
    try{
        const prework = await Prework.find({});
        res.json(prework);
    }
    catch(err) {
        console.log(err.message)
    }
}

export const getPreworkWithId =  async (req, res) => {
    try{
        const prework = await Prework.findById(req.params.preworksID);
        res.json(prework);
    }
    catch(err) {
        console.log(err.message)
    }
    
}

export const updatePrework = async (req, res) => {
    try{
        const prework = await Prework.findOneAndUpdate({_id: req.params.preworksID}, req.body, {new:true, useFindAndModify:false});
        res.json(prework);
    }
    catch(err) {
        console.log(err.message)
    }
}


export const deletePrework = async(req, res) => {
    try{
        const prework = await Prework.deleteMany({_id: req.params.preworksID});
        res.json({message: `successfully deleted ${req.params.preworksID}`});
    }
    catch(err) {
        console.log(err.message)
    }
}

