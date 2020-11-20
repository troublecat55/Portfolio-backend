import {addNewPrework,
        getPrework,
        getPreworkWithId,
        updatePrework,
        deletePrework
        } from '../controllers/preworkController.js'
import Debug from "debug";
const debug = Debug("MyApp");

const preworkRoutes = async (app) => {
    await app.route('/preworks.json')
        .all((req, res, next) =>{
            //middleware
            debug(`request from : ${req.originalUrl}`);
            debug(`request type : ${req.method}`);
            next()})
        .get(getPrework)
        .post(addNewPrework)
        // .post(addNewWholePrework);
        

    await app.route('/preworks.json/:preworksID')
        .all((req, res, next) =>{
            //middleware
            debug(`request from : ${req.originalUrl}`);
            debug(`request type : ${req.method}`);
            next()})
        .get(getPreworkWithId)
        .put(updatePrework)
        .delete(deletePrework)
}

export default preworkRoutes;