import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { PatientReport } from '../../../src/app/model/patientReport.model';

export async function createCase(req: Request, res: Response) {
    console.log('creating record...');
    const db = admin.firestore();
    const covidCaseCollection = 'covidCaseCollection';
    try {
        const patientReport: PatientReport = JSON.parse(req.body);
        const ahvnr = patientReport.patient.ahvnr;
        const id = ahvnr;

        await db.collection(covidCaseCollection).doc(id).set(patientReport);
        console.log('... success');

        return res.status(200).json({ id: id});
    } catch (error) {
        return handleError(res, error)
    }
}

export function readCase(req: Request, res: Response) {
    console.log('reading record...');

    const db = admin.firestore();
    const covidCaseCollection = 'covidCaseCollection';

    const caseId = req.params.caseId;

    db.collection(covidCaseCollection).doc(caseId).get()
        .then(patientReport => {
            if (!patientReport.exists) throw new Error('patientReport not found');

            console.log('... success');
            return res.status(200).json({ id: patientReport.id, data: patientReport.data() })
        })
        .catch(error => res.status(500).send(error));
}

export async function readAllCases(req: Request, res: Response) {
    console.log('reading all records...');
    try{
        const db = admin.firestore();
        const covidCaseCollection = 'covidCaseCollection';

        const ids = await db.collection(covidCaseCollection).get();
        const cases: any[] = [];

        ids.forEach(
            (doc)=>{
                cases.push({
                    id: doc.id,
                    data: doc.data()
            });
            }
        );

        console.log('... success');
        return res.status(200).json(cases);
    } catch (error) {
        return handleError(res, error);
    }
}

export async function readAllCantonCases(req: Request, res: Response) {
    console.log('reading all records for a canton...');
    try{
        const db = admin.firestore();
        const covidCaseCollection = 'covidCaseCollection';

        const cantonId = req.params.cantonId;

        const ids = await db.collection(covidCaseCollection).get();
        const cases: any[] = [];

        ids.forEach(
            function (doc) {
                const patientReport: PatientReport = <PatientReport><unknown> doc.data();
                if (patientReport.patient.kanton === cantonId){
                    cases.push({
                        id: doc.id,
                        data: doc.data()
                    });
                }
            }
        );
        
        console.log('... success');
        return res.status(200).json(cases);
    } catch (error) {
        return handleError(res, error);
    }
}

export async function updateCase(req: Request, res: Response) {
    console.log('updating record...');

    const db = admin.firestore();
    const covidCaseCollection = 'covidCaseCollection';
    try {
        const caseId = req.params.caseId;
        const patientReport: PatientReport = JSON.parse(req.body);

        await db.collection(covidCaseCollection).doc(caseId).set(patientReport);

        console.log('... success');
        return res.status(200).json({status: 'Successfully updated patient report!'});
    } catch (error) {
        return handleError(res, error);
    }
}

export function deleteCase(req: Request, res: Response) {
    console.log('deleting record...');
    const db = admin.firestore();
    const covidCaseCollection = 'covidCaseCollection';
    const caseId = req.params.caseId;

    db.collection(covidCaseCollection).doc(caseId).delete()
        .then(function () {
            console.log('... success');
            return res.status(204).send({})})
        .catch(function (error) {
            return handleError(res, error);
        });
}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}