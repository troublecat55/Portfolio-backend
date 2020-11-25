import mongoose from 'mongoose';
import {HomeSchema} from '../models/homeModel.js'
import {WorkSchema} from '../models/workModel.js';
import {homeTranslations} from '../locales/home/translations.js';
import {preworkTranslations} from '../locales/preworks/translations.js';
import  {Prework} from '../controllers/preworkController.js'
import Debug from "debug";
const debug = Debug("app");

const Home = mongoose.model('Home', HomeSchema, 'home');

export const addNewWholeHome = async (req, res) => {
    try{
        const home = await Home.insertMany(homeTranslations);
        debug('Successfully add home json into mongodb: )')
    } 
    catch(err) {
        debug(err.message)
    }
    
}

export const addNewWholePrework = async (req, res) => {
    try{
        const prework = await Prework.insertMany(preworkTranslations);
        debug('Successfully add preworks json into mongodb: )')
    } 
    catch(err) {
        debug(err.message)
    }
    
}

