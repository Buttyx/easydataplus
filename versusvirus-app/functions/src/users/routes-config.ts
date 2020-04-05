import { Application } from 'express';
import { createCase, readCase, readAllCases, readAllCantonCases, updateCase, deleteCase } from './controller';
import { login, isAuthenticated } from '../auth/authentication';

export function routesConfig(app: Application) {
    app.post('/case',
        isAuthenticated,
        createCase
    );

    app.get('/case/:caseId',
        isAuthenticated,
        readCase
    );

    app.get('/cases',
        isAuthenticated,
        readAllCases
    );

    app.get('/cases/:cantonId',
        isAuthenticated,
        readAllCantonCases
    );

    app.put('/case/:caseId',
        isAuthenticated,
        updateCase
    );

    app.delete('/case/:caseId',
        isAuthenticated,
        deleteCase
    );

    app.get('/login',
        login
    );
}