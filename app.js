const createError = require('http-errors');

const express = require('express');

const path = require('path');

const cookieParser = require('cookie-parser');

const logger = require('morgan');

const Pusher = require('pusher');

const bodyParser = require('body-parser');

const expressLayouts = require('express-ejs-layouts');

const rn = require('random-number');

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.set('layout extractScripts', true);

app.set('layout extractStyles', true);

app.set('layout', 'layouts/mainStructure');

app.use(expressLayouts);

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

const ops = require('./models/ops');

const pusher = new Pusher({
  appId: '524994',
  key: '186e76af49a25c6908a1',
  secret: '291104dba774bf8b8592',
  cluster: 'us2',
  encrypted: true,
});

const randonsCountry = {
  min: 0,
  max: 9,
  integer: true,
};

const valueFluctuating = {
  min: -8,
  max: 10,
  integer: true,
};

setInterval(() => {
  const bunchToPusher = [ops.quantifyCountryPeapleUpdate('ar', rn(valueFluctuating)), ops.quantifyCountryPeapleUpdate('br', rn(valueFluctuating)), ops.quantifyCountryPeapleUpdate('cl', rn(valueFluctuating)), ops.quantifyCountryPeapleUpdate('co', rn(valueFluctuating)), ops.quantifyCountryPeapleUpdate('ec', rn(valueFluctuating)), ops.quantifyCountryPeapleUpdate('pa', rn(valueFluctuating)), ops.quantifyCountryPeapleUpdate('pe', rn(valueFluctuating)), ops.quantifyCountryPeapleUpdate('ur', rn(valueFluctuating))];

  Promise.all(bunchToPusher).then((value) => {
    let countryObject = {};

    value.map((currentValue) => {
      const countryName = currentValue.country;

      const countryNumber = currentValue.currentPopulationVenezuelan;

      countryObject[countryName] = countryNumber;
    });

    return countryObject;
  }).then((x) => {
    console.log(x);
    pusher.trigger('my-channel', 'saveMongoDb', { message: [x] });
  });
}, 6000);

const bunchOfPromise = [ops.quantifyCountryPeaple('ar'), ops.quantifyCountryPeaple('br'), ops.quantifyCountryPeaple('cl'), ops.quantifyCountryPeaple('co'), ops.quantifyCountryPeaple('ec'), ops.quantifyCountryPeaple('pa'), ops.quantifyCountryPeaple('pe'), ops.quantifyCountryPeaple('ur')];

app.get('/', (req, res) => {
  Promise.all(bunchOfPromise).then((value) => {
    let countryObject = {};

    value.map((currentValue) => {
      const countryName = currentValue.country;
      const countryNumber = currentValue.currentPopulationVenezuelan;
      countryObject[countryName] = countryNumber;
    });

    return countryObject;
  }).then((x) => {
    console.log(x);
    res.locals = x;
    res.render('index');
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8989, () => {
  console.log('Hello World!');
});
