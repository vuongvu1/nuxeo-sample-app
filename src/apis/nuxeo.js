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

export const getUserInfo = async ({ nuxeo }) =>
  nuxeo.connect()
    .then(function(client){
      // client.user.id === 'Administrator'
      return client.user;
    })
    .catch(function(error) {
      // wrong credentials / auth method / ...
      throw error;
    });

export const getServerInfo = async ({ nuxeo }) =>
  nuxeo.connect()
    .then(function(client){
      console.log(client.serverVersion);
      return client.serverVersion;
    })
    .catch(function(error) {
      throw error;
    });

export const createFolder = async ({ nuxeo, folderPath = '/default-domain/workspaces/', folderName = 'test'}) =>
  nuxeo.operation('Document.Create')
    .params({
      type: 'Folder',
      name: folderName,
      properties: `dc:title=${folderName} \ndc:description=A Simple Folder`
    })
    .input(folderPath)
    .execute()
    .then(function(doc) {
      return doc.path;
    })
    .catch(function(error) {
      throw error;
    });

export const getDir = ({ nuxeo }) => {
  nuxeo.directory('/default-domain/workspaces/')
    .fetch('test')
    .then(function(res) {
      // res.properties.id === 'article'
      // res.properties.label === 'article label.directories.nature.article'
      console.log({ res });
    })
    .catch(function(error) {
      throw new Error(error);
    });
};
