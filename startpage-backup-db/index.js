const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const moment = require('moment');
const nodemailer = require('nodemailer');

const c = require('./config');
const serviceAccount = require('./p-kin-startpage.json');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();

const gmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: c.email.user,
    pass: c.email.pass
  }
});

app.get('/', async (req, res) => {
  const now = moment().format('YYYY-MM-DD');
  const emailData = {
    from: `"My Startpage" <${c.email.user}>`,
    to: c.email.to,
    subject: 'Startpage database backups @ ' + now,
    attachments: []
  };
  let newElem;
  try {
    const notesData = [];
    const notesSnapshot = await firestore.collection('notes').get();
    notesSnapshot.forEach((doc) => {
      newElem = doc.data();
      newElem.id = doc.id;
      notesData.push(newElem);
    });

    emailData.attachments[0] = {
      filename: `notes_${now}.json`,
      content: JSON.stringify(notesData)
    };

    const linksData = [];
    const linksSnapshot = await firestore.collection('links').get();
    linksSnapshot.forEach((doc) => {
      newElem = doc.data();
      newElem.id = doc.id;
      linksData.push(newElem);
    });

    emailData.attachments[1] = {
      filename: `links_${now}.json`,
      content: JSON.stringify(linksData)
    };

    const tilesData = [];
    const tilesSnapshot = await firestore.collection('tiles').get();
    tilesSnapshot.forEach((doc) => {
      newElem = doc.data();
      newElem.id = doc.id;
      tilesData.push(newElem);
    });

    emailData.attachments[2] = {
      filename: `tiles_${now}.json`,
      content: JSON.stringify(tilesData)
    };

    await gmail.sendMail(emailData);

    res.status(200).send({message: 'Email sent.'});

  } catch(error) {
    res.status(500).send({message: 'An error occurred.', reason: error});
  }
});

app.listen(port, () => console.log(`App is listening at PORT ${port}`));
