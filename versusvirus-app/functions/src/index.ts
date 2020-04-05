//import libraries
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { routesConfig } from './users/routes-config';
import { BigQuery } from '@google-cloud/bigquery'

admin.initializeApp();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
routesConfig(app);

const bigquery = new BigQuery()

// Event triggered functions
exports.pushToBigQuery = functions.firestore
    .document("/testCollection/{docID}")
    .onWrite(async  event => {
        let result = bigquery
            .dataset("reportedCases")
            .table("testTable")
            .insert([{ name: "Patient0", testDate: new Date() }])

        return result
    });

//define google cloud function name
export const webApi = functions.https.onRequest(app);