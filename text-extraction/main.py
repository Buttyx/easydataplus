import firebase_admin
import json
import uuid
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage

COLLECTION = u'covidCaseCollection'
BUCKET_NAME = u'versusvirus-output'
MOCK_MODUS = False

def setup():
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred, {
    'projectId': "versusvirus-273113",
    'storageBucket': BUCKET_NAME
    })


def loadFileMock(fileName):
    print("Start loading file MOCK")
    with open(fileName) as json_data_string:
        json_data = json.load(json_data_string)
    print(json_data)
    return json_data    

def loadFile(fileName):
    print("Start loading file")
    bucket = storage.bucket(BUCKET_NAME)
    blob = bucket.get_blob(fileName);
    print("File content type:" + blob.content_type)
    if (blob.content_type != application/json)
        raise TypeError("Image are not supported for this stage of the worklfow, only JSON files")
    json_data_string = blob.download_as_string()
    json_data = json.loads(json_data_string)
    print(json_data)
    return json_data

def writeToDB(collection, doc_name, jsonEntry):
    print("Save document " + doc_name + " to collection " + collection)
    db = firestore.client()
    doc_ref = db.collection(collection).document(doc_name)
    doc_ref.set(jsonEntry)

def extract(data, context):
    setup()

    if MOCK_MODUS:
        jsonObject = loadFileMock(data['name'])
    else:
        jsonObject = loadFile(data['name'])
    writeToDB(COLLECTION, str(uuid.uuid1()), jsonObject)

if MOCK_MODUS:    
    extract({ "name": "mock-output.json" },"")