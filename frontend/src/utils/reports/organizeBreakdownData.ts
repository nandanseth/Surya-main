export const organizeBreakdownData = (data, startDate, endDate) => {
    for (const i in data) {

        const dataCopy = { ...data[i] }
        const dataCancelled = { ...data[i] }

        console.log(i, parseInt(i), data[i], 'alslsl')
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        dataCopy['reportStartDate'] = new Date(startDate).toLocaleString('en-US', options)
        data[i]['reportStartDate'] = new Date(startDate).toLocaleString('en-US', options)
        dataCopy['reportEndDate'] = new Date(endDate).toLocaleString('en-US', options)
        data[i]['reportEndDate'] = new Date(endDate).toLocaleString('en-US', options)
        dataCopy['cancellationDate'] = data[i]['cancellationDate']
        dataCopy['isCancelled'] = data[i]['isCancelled']
        dataCancelled['cancellationDate'] = data[i]['cancellationDate']
        dataCancelled['isCancelled'] = data[i]['isCancelled']
        if (new Date(data[i]['effectiveDate']) < new Date(data[i]['baseEffDate'])) {

            data[i]['endorsement'] = 'Endorsement'
            data[i]['endorsementEffectiveDate'] = data[i]['baseEffDate']
            
        } else {
            data[i]['endorsement'] = 'Policy'
            data[i]['endorsementEffectiveDate'] = data[i]['effectiveDate']
        }

        if (new Date(data[i]['expirationDate']) > new Date(data[i]['baseExpDate'])) {

            

        
            
            console.log(dataCopy, 'slla')

            dataCopy['endorsementEffectiveDate'] = dataCopy['baseExpDate']
            dataCopy['endorsement'] = 'Endorsement'

            const premiumsList = ['overallPremium', 'pedPipProtectionPremium', 'personalInjuryProtectionPremium', 'underinsuredMotoristPremium', 'uninsuredMotoristPremium', 'totalPremium', 'earnedPremium']

            for (const j in premiumsList) {

                const daysBetween = Math.floor(new Date(data[i]['baseExpDate']).getTime() - new Date(data[i]['baseEffDate']).getTime()) / (1000 * 60 * 60 * 24)

                const daysBetweenPolicyExp = Math.floor(new Date(data[i]['expirationDate']).getTime() - new Date(data[i]['baseEffDate']).getTime()) / (1000 * 60 * 60 * 24)
                


                const daysBetweenTransactionExp = Math.floor(Math.min(new Date(endDate).getTime(), new Date(data[i]['baseExpDate']).getTime()) - new Date(data[i]['baseEffDate']).getTime()) / (1000 * 60 * 60 * 24)
                const premium = parseFloat(dataCopy[premiumsList[j]])

                const premiumPerDay = premium/daysBetween


                const premiumFullExp = premiumPerDay*daysBetweenPolicyExp

                const returnPremium = premium - premiumFullExp


                const earnedPremium = Math.max(premiumPerDay*daysBetweenTransactionExp, premium*0.25)


                
                console.log(returnPremium, premium, daysBetween, premiumFullExp, daysBetweenPolicyExp, data[i]['policyNum'], 'slalla')

                dataCopy[premiumsList[j]] = returnPremium
                data[i][premiumsList[j]] = premiumFullExp

                if (premiumsList[j] === 'earnedPremium') {
                    dataCopy[premiumsList[j]] = 0
                    data[i][premiumsList[j]] = earnedPremium


                }
                
            }

            data.push(dataCopy)

            
        }

        if (data[i].isCancelled === "Yes") {
            if (new Date(data[i].baseExpDate) > new Date(data[i].cancellationDate)) {
                console.log(data[i], 'kls')
                dataCancelled['endorsementEffectiveDate'] = dataCancelled['cancellationDate']
                dataCancelled['endorsement'] = 'Cancellation'

                const premiumsList = ['overallPremium', 'pedPipProtectionPremium', 'personalInjuryProtectionPremium', 'underinsuredMotoristPremium', 'uninsuredMotoristPremium', 'totalPremium', 'earnedPremium']

                for (const j in premiumsList) {

                    const daysBetween = Math.floor(new Date(data[i]['cancellationDate']).getTime() - new Date(data[i]['baseEffDate']).getTime()) / (1000 * 60 * 60 * 24)

                    const daysBetweenPolicyExp = Math.floor(new Date(data[i]['expirationDate']).getTime() - new Date(data[i]['baseEffDate']).getTime()) / (1000 * 60 * 60 * 24)
                    


                    const daysBetweenTransactionExp = Math.floor(new Date(data[i]['cancellationDate']).getTime()) - new Date(data[i]['baseEffDate']).getTime() / (1000 * 60 * 60 * 24)
                    const premium = parseFloat(dataCopy[premiumsList[j]])

                    const premiumPerDay = premium/daysBetweenPolicyExp


                    const premiumFullExp = premiumPerDay*daysBetween

                    const returnPremium = premiumFullExp - premium


                    const earnedPremium = Math.max(premiumPerDay*daysBetween, premium*0.25)


                
                    dataCancelled[premiumsList[j]] = returnPremium
                    // data[i][premiumsList[j]] = premiumFullExp

                    // if (premiumsList[j] === 'earnedPremium') {
                    //     dataCancelled[premiumsList[j]] = 0
                    //     data[i][premiumsList[j]] = earnedPremium


                    // }
                    
                }

                data.push(dataCancelled)

                }
        }

    }

    return data
}