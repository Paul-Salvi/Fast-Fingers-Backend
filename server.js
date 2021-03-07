const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const WordsDB = require('./src/plugins/prepareDatabase');

const app = express();
const port =  5000;
const userRoutes = require('./src/routes/user.routes');
const loginRoutes = require('./src/routes/login.routes');
const settingsRoutes = require('./src/routes/setting.routes');
const wordsRoutes = require('./src/routes/words.routes');

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/words', wordsRoutes);

app.get('/', (req, res) => { res.send("{'Game':'Fast Fingers' }"); });
app.listen(port, () => { console.log(`Server is listening on port ${port}`); });


//Stream word dictionary to database.
//WordsDB.SetupDictionary();