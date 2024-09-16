export const replaceOldToNew = (policyJSONOld, policyJSONNew, endEffDate) => {

  if (policyJSONOld.drivers.values < policyJSONNew.drivers.values || policyJSONOld.vehicles.values < policyJSONNew.vehicles.values) {
    console.log(policyJSONNew, 'registered')
    return policyJSONNew
  }

  const premiumProps = [
        "overallPremium",
        "personalInjuryProtectionPremium",
        "pedPipProtectionPremium",
        "medicalPaymentsPremium",
        "underinsuredMotoristPremium",
        "uninsuredMotoristPremium",
      ];

  const getProRataDays = (baseEffDate, endEffDate) => {
        const effDate = new Date(baseEffDate).getTime()
        const endDate = new Date(endEffDate).getTime()
        let days = 0
        if (effDate > endDate) {
            days = Math.floor((effDate - endDate) / (1000 * 60 * 60 * 24));
        } else if (endDate > effDate) {
            days = Math.floor((endDate - effDate) / (1000 * 60 * 60 * 24));
        }
        

        return days;
  }

  console.log()

  const oldVehicleLength = policyJSONOld.vehicles.values.slice().length

  for (let i = 0; i < oldVehicleLength; i++) {
    const oldVehicle = policyJSONOld.vehicles.values[i];
    const newVehicle = policyJSONNew.vehicles.values[i];

    if (oldVehicle.vin !== newVehicle.vin) {
      

      for (const j in premiumProps) {
          
          policyJSONOld.vehicles.values[i][premiumProps[j]] = ((getProRataDays(policyJSONOld.vehicles.values[i].baseEffDate, endEffDate)/365)*policyJSONOld.coverage[premiumProps[j]]).toFixed(2)
          newVehicle[premiumProps[j]] = ((getProRataDays(policyJSONOld.policy.expirationDate, endEffDate)/365)*policyJSONOld.coverage[premiumProps[j]]).toFixed(2)
      }

      policyJSONOld.vehicles.values[i].baseExpDate = endEffDate
      newVehicle.baseEffDate = endEffDate

      policyJSONOld.vehicles.values.push(newVehicle);
    }
  }

  const oldDriverLength = policyJSONOld.drivers.values.slice().length
  console.log(policyJSONOld.drivers.values, policyJSONNew.drivers.values, 'sala')
  for (let i = 0; i < oldDriverLength; i++) {
    const oldDriver = policyJSONOld.drivers.values[i];
    const newDriver = policyJSONNew.drivers.values[i];

    if (oldDriver.firstName !== newDriver.firstName && oldDriver.lastName !== newDriver.lastName) {
      policyJSONOld.drivers.values[i].baseExpDate = endEffDate
      newDriver.baseEffDate = endEffDate
      policyJSONOld.drivers.values.push(newDriver);
    }
  }

  if (policyJSONOld.drivers.values.length !== policyJSONNew.drivers.values.length || policyJSONOld.vehicles.values.length !== policyJSONNew.vehicles.values.length) {

      console.log(policyJSONOld.drivers.values, policyJSONNew.drivers.values, "Old")
      return policyJSONOld;
  } else {
      console.log("New")
      return policyJSONNew
  }

  
}