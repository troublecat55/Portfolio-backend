import mongoose from 'mongoose';
import {WorkSchema} from '../models/workModel.js';
import {preworkTranslations} from '../locales/translations.js';
import  {Prework} from '../controllers/preworkController.js'
import Debug from "debug";
const debug = Debug("app");



export const addNewWholePrework = async (req, res) => {
    try{
        const prework = await Prework.collection.insertMany(preworkTranslations);
        debug('Successfully add json into mongodb: )')
    } 
    catch(err) {
        debug(err.message)
    }
    
}