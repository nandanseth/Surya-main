function fixCoverageVehiclePremiums(changes, policyJSON) {
  const overallPremiumChange = changes['coverage.overallPremium'];

  console.log(changes, overallPremiumChange, 'sakll')

  if (overallPremiumChange !== undefined) {
        let oldValue = overallPremiumChange.values[0].oldValue;
        let newValue = overallPremiumChange.values[0].newValue;

        if (typeof oldValue !== 'number') {
            oldValue = parseFloat(oldValue);
        }

        if (typeof newValue !== 'number') {
            newValue = parseFloat(newValue);
        }

        const changeTime = new Date(overallPremiumChange.values[0].time).getTime();

        const vehicles = policyJSON.vehicles.values;
        const effectiveDate = new Date(policyJSON.policy.effectiveDate).getTime();
        const expirationDate = new Date(policyJSON.policy.expirationDate).getTime();

        console.log(oldValue, newValue, changeTime, vehicles, effectiveDate, expirationDate, 'sakll')

    // Iterate over each vehicle and calculate the premium change
    for (let i = 0; i < vehicles.length; i++) {
        const vehicle = vehicles[i];
        const baseExpDate = new Date(vehicle.baseExpDate).getTime();
        const baseEffDate = new Date(vehicle.baseEffDate).getTime();
        const vehicleAddedAfterChange = baseEffDate > changeTime;
        const vehicleRemovedBeforeChange = baseExpDate < changeTime;

        console.log(vehicle, baseExpDate, baseEffDate, vehicleRemovedBeforeChange, 'sakll')

        // Skip the vehicle if it was removed before the coverage change time
        if (vehicleRemovedBeforeChange) {
            continue;
        }

        let oldPremium = 0;
        let newPremium = 0;

        // Calculate the pro rata premium and daily pro rata premium for the vehicle

        const proRataDays = Math.ceil((changeTime - baseEffDate) / (24 * 60 * 60 * 1000));
        const proRataFactor = proRataDays / 365;
        oldPremium = oldValue * proRataFactor;
        const dailyProRataPremium = oldPremium / proRataDays;

        console.log(proRataDays, proRataFactor, oldPremium, proRataDays/365,  'sakll')
    

        // Calculate the premium for the remainder of the policy period based on the new overallPremium
        const remainingDays = Math.ceil((expirationDate - changeTime) / (24 * 60 * 60 * 1000));
        const remainingFactor = remainingDays / 365;
        const remainingPremium = newValue * remainingFactor;

        // Calculate the total premium for the vehicle
        newPremium = oldPremium + remainingPremium;

        console.log(newPremium, oldPremium, remainingPremium, 'sakkl')

        // If the vehicle was added after the coverage change, set the premium to the remaining premium
        if (vehicleAddedAfterChange) {
            newPremium = remainingPremium;
        }

        // Update the overallPremium for the vehicle
        vehicle.overallPremium = newPremium.toFixed(2);
    }

    return policyJSON;
  } else {
      return policyJSON
  }
  
}

export default fixCoverageVehiclePremiums