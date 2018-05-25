const PopulationRecord = require('./dbConfiguration.js');

module.exports = {

  quantifyCountryPeaple: (countrySelected) => {
    return new Promise((resolve, reject) => {
      const selectTarget = { country: countrySelected };
      PopulationRecord.findOne(selectTarget, null, { sort: { create_at: -1 } }, (err, n) => {
        if (n) {
          resolve(n);
        }
        else {
          reject(err);
        }
      });
    });
  },

  quantifyCountryPeapleUpdate: (countrySelected, fluctuatingPopulation) => {
    return new Promise((resolve, reject) => {
      PopulationRecord.findOne({ country: countrySelected }, null,{ sort: { create_at: -1 } }, (err, data) => {
        if (err) reject(err);

        const currentPopulaton = data.currentPopulationVenezuelan + fluctuatingPopulation;
        const selectTarget = { country: countrySelected };
        const itemToTarget = { currentPopulationVenezuelan: currentPopulaton };
        PopulationRecord.findOneAndUpdate(selectTarget, itemToTarget, { sort: { create_at: -1 } }, (err, updateData) => {
          if (err) reject(err);

          if (updateData) resolve(updateData);
        });
      });
    });
  }

};
