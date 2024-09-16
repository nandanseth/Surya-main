const getFirstDayEarnedPremium = (vehicle, policy, premiumName) => {

        const firstDay = new Date(policy.policy.effectiveDate);
        const vehicleEffDate = new Date(vehicle.baseEffDate);
        if (vehicleEffDate.getTime() === firstDay.getTime()) {
            let payment;
            if (policy.payments.paymentType) {
                payment = policy.payments.paymentType;
            } else {
                payment = policy.payments.payment;
            }
            if (payment === "FULLPAY_POL") {
                return Number(vehicle[premiumName]);
            } else {

                const depositPercentage = Number(payment.match(/^\d+/)[0]);
                console.log(depositPercentage, 'depositPer')
                const depositPremium = vehicle[premiumName] * (depositPercentage / 100);
                return depositPremium;
            }
        }
        return 0;
    
    }

const policyDuration = (policy) => {
    const effDate = new Date(policy.policy.effectiveDate);
    const expDate = new Date(policy.policy.expirationDate);
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((effDate.getTime() - expDate.getTime()) / oneDay));
}

function fixDeletedVehiclePremiums(changes, policy) {
    const fixedPolicy = JSON.parse(JSON.stringify(policy)); // make a deep copy of policy JSON
    const coverage = fixedPolicy.coverage;

    const premiumNames = ['overallPremium', 'medicalPaymentsPremium', 'personalInjuryProtectionPremium', 'uninsuredMotoristPremium', 'uninsuredMotoristPremium', 'pedPipProtectionPremium']
  
    


    Object.keys(changes).forEach(key => {
        if (key.endsWith("baseExpDate")) {
            const vehicleIndex = Number(key.match(/\d+/)[0]); // extract the vehicle index
            console.log(vehicleIndex, 'vehicleIndex')
            const vehicle = fixedPolicy.vehicles.values[vehicleIndex];
            const newExpDate = changes[key].values[0].newValue;

            if (new Date(newExpDate) < new Date(fixedPolicy.policy.expirationDate)) {
                // calculate the days before policy expiration date the new vehicle expiration date is
                const daysAfterEff = Math.floor((new Date(newExpDate).getTime() - new Date(vehicle.baseEffDate).getTime()) / (1000 * 60 * 60 * 24));
                console.log(daysAfterEff, 'freedom')
                // calculate the premium for a vehicle that is effective for the full policy period
                // find out how much premium is earned on the first day of the policy

                for (const i in premiumNames) {
                    // const firstDayEarnedPremium = getFirstDayEarnedPremium(vehicle, fixedPolicy, premiumNames[i]);

                    // subtract the first day earned premium from the total premium values
                    // const residualEarnedPremium = coverage[premiumNames[i]] - firstDayEarnedPremium;
                    // console.log(firstDayEarnedPremium, premiumNames, residualEarnedPremium, 'sceedom')
                    const premiumPerDay = vehicle[premiumNames[i]] / policyDuration(fixedPolicy);
                    const vehiclePremium = premiumPerDay * daysAfterEff
                    // update the vehicle premium values
                    vehicle[premiumNames[i]] = vehiclePremium.toFixed(2)
                    console.log(vehicle[premiumNames[i]], 'sdosm')

                }

                fixedPolicy.vehicles.values[vehicleIndex] = vehicle
            } 
        }
        })
    return fixedPolicy
}

export default fixDeletedVehiclePremiums