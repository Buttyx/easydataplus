# EasyData+
Project for the #versusvirus Hackathon 

# Using the EasyData+ Webapp and submitting a report
1. Go to https://versusvirus-273113.web.app and sign up by typing in an e-mail and password.
2. After login in using the information you just provided, you will see three options: "Image Upload", "Webform" and "Statistics".

![](login.gif)

3. "Image Upload" enables you to upload reports as an image or pdf, which will instantly get forwarded to the database and asynchronously processed by the OCR service, running on the cloud.

![](fileupload.gif)

4. You can also pick the "Webform" option to quickly fill out the report manually which, after saving the inputs, will be directly forwarded.

![](manuelupload.gif)

5. The "Statistics" option will show you additional aggregated information by querying the database (in progress).

![](statistics.gif)


6. To return to the three options you can always click on the house icon on the navgiation bar in the top left corner.

![](home.gif)

We note here that we kept the UI simple to make the process of submitting a report as straightforward as possible.

# Using the API
## Login
First you need to log in using your registered user.
You can register a user through the WebGUI:
[https://versusvirus-273113.web.app/home](https://versusvirus-273113.web.app/home)

```bash
Authorization: Basic <your BasicAuth credentials>
GET https://us-central1-versusvirus-273113.cloudfunctions.net/webApi/login
```
If authenticated successfully, you will receive an idToken (as a JSON Web Token/JWT) in the response body. You will need this token to authenticate the other REST calls to the API.

```bash
{
    "idToken": "eyJhb....F1Y9RkqriG23g"
}
```
Use this token in the following request as follows:
```bash
Authorization: Bearer eyJhb....F1Y9RkqriG23g
```
## API Calls
### Create new record
```bash
Authorization: Bearer eyJhb....F1Y9RkqriG23g
POST https://us-central1-versusvirus-273113.cloudfunctions.net/webApi/case
<body> (see below for an example data structure)
```
### Read all records
```bash
Authorization: Bearer eyJhb....F1Y9RkqriG23g
GET https://us-central1-versusvirus-273113.cloudfunctions.net/webApi/cases
```
### Read a record with specific id
```bash
Authorization: Bearer eyJhb....F1Y9RkqriG23g
GET https://us-central1-versusvirus-273113.cloudfunctions.net/webApi/case/<caseId>
```
### Read all records for a specific canton
```bash
Authorization: Bearer eyJhb....F1Y9RkqriG23g
GET https://us-central1-versusvirus-273113.cloudfunctions.net/webApi/cases/<cantonId
```
### Update a record with a specific id
```bash
Authorization: Bearer eyJhb....F1Y9RkqriG23g
PUT https://us-central1-versusvirus-273113.cloudfunctions.net/webApi/case/<caseId>
<body> (see below for an example data structure)
```
### Delete a record with a specific id
```bash
Authorization: Bearer eyJhb....F1Y9RkqriG23g
DELETE https://us-central1-versusvirus-273113.cloudfunctions.net/webApi/case/<caseId>
```
## Example Body
```bash
{
	"patient": {
		"ahvnr": "756.1234.5678.97",
		"kanton": "ZH",
		"geschlecht": "w"
	},
	"manifestation": {
		"fieber": true,
		"husten": false,
		"atembeschwerden": true,
		"pneumonie": false,
		"ards": false,
		"durchfall": true,
		"andereSymptome": "schnupfen",
		"keineSymptome": false,
		"manifestationsBeginn": "2020-02-16"
	},
	"grunderkrankung": {
		"diabetes": false,
		"herzKreislauf": true,
		"immunsuppression": true,
		"hypertonie": false,
		"chronischeAtemwegserkrankung": true,
		"krebs": false,
		"keineGrunderkrankung": false,
		"andereGrunderkrankung": "keine"
	},
	"verlauf": {
		"hospitalisierung": false,
		"ipsAufenthalt": false,
		"beatmung": false,
		"tod": false,
		"todesDatum": null,
		"spital": "Kantonsspital Zürich"
	},
	"exposition": {
		"ch": true,
		"ausland": true,
		"ort": "Wuhan, Bern",
		"unbekannt": false,
		"expositionDatum": "2020-02-05",
		"wie": {
			"kontaktZuCovidPositiv": true,
			"kontaktUnbekannt": false,
			"familie": true,
			"medizinPflegePersonal": false,
			"schule": false,
			"arbeit": false,
			"andere": ""
		},
		"reisetaetigkeit": true,
		"medizinPflegePersonal": false
	},
	"labor": {
		"laborGenf": true,
		"anderesLabor": false,
		"entnahmeDatum": "2020-03-20"
	},
	"bemerkungen": "Patient befindet sich in gutem Zustand.",
}

```
# Swagger Definition
```bash
swagger: "2.0"
info:
  description: "Create new patient records and read, modify or delete existing records"
  version: "1.0.0"
  title: "Swagger EasyData+"
  contact:
    email: "vanessa.hunziker@ipt.ch"
host: "us-central1-versusvirus-273113.cloudfunctions.net"
basePath: "/webApi"
tags:
- name: "patientReport"
  description: "Patient Data"
- name: "login"
  description: "Login for accessing api functions"
schemes:
- "https"
paths:
  /case:
    post:
      tags:
      - "patientReport"
      summary: "Add a new patientReport to the BAG database"
      description: ""
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "Patient Report object that needs to be added to the database"
        required: true
        schema:
          $ref: "#/definitions/PatientReport"
      responses:
        200:
          description: "Object creation successful, returns the identifier of the newly created object"
        400:
          description: "Invalid input"
      security: 
      - bearerAuth: []
  /cases:
    get:
      tags:
      - "patientReport"
      summary: "Get all available patientReports"
      description: ""
      produces:
      - "application/json"
      responses:
        200:
          description: "Returns all available cases"
        400:
          description: "Invalid input"
      security: 
      - bearerAuth: []
  /cases/{cantonId}:
    get:
      tags:
      - "patientReport"
      summary: "Get all available patientReports for a canton"
      description: ""
      produces:
      - "application/json"
      parameters:
      - name: "cantonId"
        in: "path"
        description: "Canton ID to filter by"
        required: true
        type: string
      responses:
        200:
          description: "Returns all cases for given canton"
        400:
          description: "Invalid input"
      security: 
      - bearerAuth: []
  /case/{caseId}:
    get:
      tags:
      - "patientReport"
      summary: "Get reports by caseId"
      description: ""
      produces:
      - "application/json"
      parameters:
      - name: "caseId"
        in: "path"
        description: "Case ID to filter by"
        required: true
        type: "string"
      responses:
        200:
          description: "Get patientReport for given case ID"
        400:
          description: "Invalid input"
      security: 
      - bearerAuth: []
    put:
      tags:
      - "patientReport"
      summary: "Updates a report by caseId"
      description: ""
      produces:
      - "application/json"
      parameters:
      - name: "caseId"
        in: "path"
        description: "Case ID to filter by"
        required: true
        type: "string"
      responses:
        200:
          description: "Update successful"
        400:
          description: "Invalid input"
      security: 
      - bearerAuth: []
    delete:
      tags:
      - "patientReport"
      summary: "Deletes a report by caseId"
      description: ""
      produces:
      - "application/json"
      parameters:
      - name: "caseId"
        in: "path"
        description: "Case ID to filter by"
        required: true
        type: "string"
      responses:
        204:
          description: "Deletion successful, no value returned"
        400:
          description: "Invalid input"
      security: 
      - bearerAuth: []
  /login:
    get:
      tags:
      - "login"
      summary: "Logs in an existing user and return a JWT Token to access api functions"
      description: ""
      produces:
      - "application/json"
      parameters:
      - name: "authorization"
        in: "header"
        description: "Basic Authentication login information"
        required: true
        type: string
      responses:
        200:
          description: "Login successful, JWT is returned in body"
        401:
          description: "Invalid login information provided, not logged in"
      security:
      - basicAuth: []

securityDefinitions:
  bearerAuth:            
    type: apiKey
    in: header
    name: Authorization Bearer
  basicAuth:
    type: basic

definitions:
  PatientReport:
    type: "object"
    properties:
      patient:
        $ref: "#/definitions/Patient"
      manifestation:
        $ref: "#/definitions/Manifestation"
      grunderkrankung:
        $ref: "#/definitions/Grunderkrankung"
      verlauf:
        $ref: "#/definitions/Verlauf"
      exposition:
        $ref: "#/definitions/Exposition"
      labor:
        $ref: "#/definitions/Labor"
      bemerkungen:
        type: "string"
      _id:
        type: "string"
  Patient:
    type: "object"
    properties:
      ahvnr:
        type: "string"
      kanton:
        type: "string"
      geschlecht:
        type: "string"
  Manifestation:
    type: "object"
    properties:
      fieber:
        type: "boolean"
      husten:
        type: "boolean"
      atembeschwerden:
        type: "boolean"
      pneumonie:
        type: "boolean"
      ards:
        type: "boolean"
      durchfall:
        type: "boolean"
      andereSymptome:
        type: "string"
      keineSymptome:
        type: "boolean"
      manifestationsBeginn:
        type: "object"
  Grunderkrankung:
    type: "object"
    properties:
      diabetes:
        type: "boolean"
      herzKreislauf:
        type: "boolean"
      immunsuppression:
        type: "boolean"
      hypertonie:
        type: "boolean"
      chronischeAtemwegserkrankung:
        type: "boolean"
      krebs:
        type: "boolean"
      keineGrunderkrankung:
        type: "boolean"
      andereGrunderkrankung:
        type: "string"
  Verlauf:
    type: "object"
    properties:
      hospitalisierung:
        type: "boolean"
      ipsAufenthalt:
        type: "boolean"
      beatmung:
        type: "boolean"
      tod:
        type: "boolean"
      todesDatum:
        type: "object"
      spital:
        type: "string"
  Exposition:
    type: "object"
    properties:
      ch:
        type: "boolean"
      ausland:
        type: "boolean"
      ort:
        type: "string"
      unbekannt:
        type: "boolean"
      expositionDatum: 
        type: "object"
      wie:
        $ref: "#/definitions/ExpositionWie"
      reisetätigkeit:
        type: "boolean"
      medizinPflegePersonal:
        type: "boolean"
  ExpositionWie:
    type: "object"
    properties:
      kontaktZuCovidPositiv:
        type: "boolean"
      kontaktUnbekannt:
        type: "boolean"
      familie:
        type: "boolean"
      medizinPflegePersonal:
        type: "boolean"
      schule:
        type: "boolean"
      arbeit:
        type: "boolean"
      andere:
        type: "string"
  Labor:
    type: "object"
    properties:
      laborGenf: 
        type: "boolean"
      anderesLabor: 
        type: "boolean"
      entnahmeDatum: 
        type: "object"
```
