import Nuxeo from 'nuxeo';

// const baseURL = 'https://demo.nuxeo.com/nuxeo/';
const baseURL = 'http://localhost:8080/nuxeo/';

export const basicAuth = () =>
  new Nuxeo({
    baseURL,
    auth: {
      method: 'basic',
      username: 'Administrator',
      password: 'Administrator',
    }
  });

export const createFolder = ({ nuxeo, folderName = 'My Folder' }) =>
  nuxeo.operation('Document.Create')
    .params({
      type: 'Folder',
      name: folderName,
      properties: `dc:title=${folderName} \ndc:description=A Simple Folder`
    })
    .input('/')
    .execute()
    .then(function(doc) {
      console.log('Created ' + doc.title + ' folder');
    })
    .catch(function(error) {
      throw error;
    });
;
