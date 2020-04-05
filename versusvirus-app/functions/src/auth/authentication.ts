import { Request, Response } from "express";
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import { Base64 } from 'js-base64';

export async function isAuthenticated(req: Request, res: Response, next: Function) {
    console.log('checking authentication...');
    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).send({ message: 'Unauthorized' });

    if (!authorization.startsWith('Bearer'))
        return res.status(401).send({ message: 'Unauthorized' });

    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });

    const token = split[1];
    console.log('Token: ' + token);

    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        console.log("decodedToken", JSON.stringify(decodedToken))
        res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
        console.log('... success');
        return next();
    }
    catch (err) {
        console.error(`${err.code} -  ${err.message}`)
        return res.status(401).send({ message: 'Unauthorized' });
    }
}

export function login(req: Request, res: Response) {
    console.log('logging in...');
    firebase.initializeApp({
        apiKey: "xxxx",
        authDomain: "versusvirus-273113.firebaseapp.com",
        databaseURL: "https://versusvirus-273113.firebaseio.com",
        projectId: "versusvirus-273113",
        storageBucket: "gs://versusvirus-ocr-input",
        messagingSenderId: "xxxxx",
        appId: "xxxx"
    });

    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).send({ message: 'Unauthorized' });

    if (!authorization.startsWith('Basic'))
        return res.status(401).send({ message: 'Unauthorized' });

    const split = authorization.split('Basic ')
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });

    const token = split[1];
    const decodedToken = Base64.decode(token);
    const tokenSplit = decodedToken.split(':');
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });

    const email = tokenSplit[0];
    const password = tokenSplit[1];
    console.log("email: " + email + " password: " + password);

    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            firebase.auth().currentUser?.getIdToken()
                .then(function (idToken) {
                    console.log('... success');
                    return res.status(200).send({ idToken: idToken });
                })
                .catch(error => res.status(401).send({message: 'Unauthorized'}));
        })
        .catch(error => res.status(401).send({message: 'Unauthorized'}));
}