const mongoose = require('mongoose');

const moment = require('moment');

//mongoose.connect('mongodb://localhost/pusherProjectDB');
mongoose.connect('mongodb://indigo@ds235860.mlab.com:35860/pusher-contest-db', {
    auth: {
      user: 'indigo',
      password: 'bc9k07*/'
    }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));


const countryInitialState = {
  ar: 57127,
  br: 35000,
  co: 600000,
  cl: 119051,
  ec: 39519,
  pa: 36365,
  pe: 26239,
  ur: 6033,
};

const countryList = Object.keys(countryInitialState);

const populationRecordSchema = mongoose.Schema({
  country: { type: String, enum: countryList, default: 'ar' },
  currentPopulationVenezuelan: Number,
  create_at: { type: Date, default: moment().toDate() },
});

const PopulationRecord = mongoose.model('PopulationRecord', populationRecordSchema);

const db = mongoose.connection;



db.once('open', function () {
  countryList.map((countryName) => {
    PopulationRecord.find({ country: countryName }, (err, dataFind) => {
      if (err) {
        console.error(err);
      }

      if (dataFind[0] == undefined) {
        const initialState = countryInitialState[countryName];
        const saveData = { country: countryName, currentPopulationVenezuelan: initialState };
        const initalValuePopulations = new PopulationRecord(saveData);

        initalValuePopulations.save((err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`${countryName}: o.k`);
          }
        });
      } else if (dataFind[0] !== undefined) {
        console.log(`Data from ${countryName}: loaded`);
      }
    });
  });
});

db.on('error', console.error.bind(console, 'connection error:'));


module.exports = PopulationRecord;
