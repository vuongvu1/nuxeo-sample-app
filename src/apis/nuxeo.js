import Nuxeo from 'nuxeo';

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

const createFile = async ({ nuxeo, folderPath = 'default-domain/workspaces/', fileName = 'test file' }) =>
  nuxeo.operation('Document.Create')
    .params({
      type: 'File',
      name: fileName,
      properties: `dc:title=${fileName} \ndc:description=A Simple File`
    })
    .input(folderPath)
    .execute()
    .then(function(doc) {
      return doc.path;
    })
    .catch(function(error) {
      throw error;
    });

export const uploadBatch = async ({ nuxeo, file }) => {
  const blob = new Nuxeo.Blob({ content: file });
  const folderPath = '/default-domain/workspaces/';
  const fileName = 'test';
  const filePath = await createFile({ nuxeo, folderPath, fileName });

  nuxeo.batchUpload()
    .upload(blob)
    .then(function(res) {
      return nuxeo.operation('Blob.AttachOnDocument')
        .param('document', filePath)
        .input(res.blob)
        .execute();
    })
    .then(function() {
      return nuxeo.repository().fetch(filePath, { schemas: ['dublincore', 'file']});
    })
    .then(function(doc) {
      console.log({ doc });
    })
    .catch(function(error) {
      throw error;
    });

};
