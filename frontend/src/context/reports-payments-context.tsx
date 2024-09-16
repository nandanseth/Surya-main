import {
    agent,
    classificationMap,
    coverageTerm,
    entityType,
    lineOfBusiness,
    policyCategory,
    policyLineItem,
    states,
    statesOptions,
    underwritingCode,
} from '../utils/policies'
import { auto } from '../utils/coverage/getAutoSymbolEntry'
import {
    bodyPerAccident,
    bodyPerPerson,
    limits,
    propertyDamage,
} from '../utils/coverage/getLimit'
import {
    bussinessUseClasses,
    classCodes,
    radius,
    secondaryCategory,
} from '../utils/policies/getCommercial'
import { createContext, useState } from 'react'
import { reinsurer } from '../utils/reinsurance/getReinsurer'
import fuelTypeOptions from '../utils/vehicle/fuelType'
import getWeightSelects from '../utils/vehicle/getWeightSelects'
import vehicleCategoryOptions, {
    optionsMap,
} from '../utils/vehicle/getVehicleCategory'
import vehicleTypes from '../utils/vehicle/getVehicleType'

export const yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
]

export const policyPAYState = {
    name: true,
    policyNum: true,
    states: true,
    classification: false,
    lineOfBusiness: false,
    policyLineItem: false,
    coverageTerm: false,
    policyCategory: false,
    underwritingCode: false,
    agent: false,
    effectiveDate: true,
    expirationDate: true,
    radius: false,
    classCode: false,
    businessUseClass: false,
    secondaryCategory: false,
}

export const insuredPAYState = {
    agent: true,
    entity: true,
    firstName: true,
    lastName: true,
    middleName: true,
    dob: null,
    suffix: null,
    gender: 'Male',
    ssn: null,
    address1: true,
    address2: null,
    city: false,
    state: false,
    zipCode: false,
    email: null,
    phoneNumber: null,
    licenseState: states[0],
    licenseNumber: null,
    licenseEff: false,
    licenseExp: null,
    contactName: null,
    contactNumber: null,
    contactEmail: null,
    corporationName: null,
    taxIdNumber: null,
    additionalInsured: {
        values: [
            {
            insName: "None",
            address: null,
            city: null,
            zipCode: null,
            state: "TX",
            isWaiver: false,
            isAddPremium: false
            },
        ],
    },
}

export const driversPAYState = {
    driverFirstName: false,
    driverMiddleName: false,
    driverLastName: false,
    states: false,
    licenseNumber: false,
    licenseEffDate: false,
    licenseExpDate: false,
    driverEffDate: false,
    driverExpDate: false,
    driverBirthDate: false
}



export interface Driver {
    driverLastName: string
    driverFirstName: string
    driverMiddleName: string
    states: string
    licenseNumber: string
    licenseEffDate: string
    licenseExpDate: string
    driverEffDate: string
    driverExpDate: string
    driverBirthDate: string

}

export const lossHistoryState = {
    accidentDate: false,
    reportedDate: false,
    claimNumber: false,
    claimType: false,
    subClaimNumber: false,
    totalIncurred: false,
    liabilityPaid: false,
    openReserve: false,
    status: false,
    previousPolicyNumber: false,
    priorCarrierName: false,
    originalInceptionDate: false,
    expirationDate: false,
    isExperienceMode: false,
    isPolicyTransferred: false,
}

export const underwritingPAYState = {
    creditsDebits: false,
    remarks: false,
    isCamera: false
}
export const coveragePAYState = {
    overall: false,
    deductable: false,
    deductableAmount: false,
    deductableAutoEntry: false,
    combinedSectionLimit: false,
    combinedSectionEntry: false,
    splitSectionBodyPerPerson: false,
    splitSectionBodyPerAccidentOptions: false,
    splitSectionPropertyDamageOptions: false,
    splitSectionAutoEntryOptions: false,
    pIProtectionSingleLimit: false,
    pIProtectionSingleEntry: false,
    pIProtectionSplitBodyPerPerson: false,
    pIProtectionSplitBodyPerAccident: false,
    pIProtectionSplitPropertyDamage: false,
    pIProtectionSplitAutoEntry: false,
    pedPipSingleLimit: false,
    medicalSingleLimit: false,
    medicalSingleEntry: false,
    medicalSplitBodyPerPerson: false,
    medicalSplitBodyPerAccident: false,
    medicalSplitPropertyDamage: false,
    medicalSplitAutoEntry: false,
    underinsuredMotoristSingleLimit: false,
    underinsuredMotoristSingleAutoEntry: false,
    underMotoristBodyPerPerson: false,
    underMotoristBodyPerAccident: false,
    underMotoristProperty: false,
    underMotoristAuto: false,
    cslSingleLimit: false,
    cslBodyPerAccident: false,
    cslBodyPerPerson: false,
    cslSingleAuto: false,
    cslProperty: false,
    cslSplitAuto:false,
    nonCslBodyPerAccident: false,
    nonCslBodyPerPerson: false,
    nonCslProperty: false,
    nonCslSingleAuto: false,
    nonCslSingleLimit: false,
    nonCslSplitAuto: false,
    unMotoristAuto: false,
    unMotoristBodyPerAccident: false,
    unMotoristBodyPerPerson: false,
    unMotoristProperty: false,
    uninsuredMotoristSingleAutoEntry: false,
    uninsuredMotoristSingleLimit: false,
    personalInjury: false,
    medicalPayments: false,
    underinsuredMotorist: false,
    uninsuredMotorist: false,
    csl: false,
    nonOwnedCSL: false,

    overallPremium: false,
    personalInjuryProtectionPremium: false,
    pedPipProtectionPremium: false,
    medicalPaymentsPremium: false,
    underinsuredMotoristPremium: false,
    uninsuredMotoristPremium: false,
    hiredCSLPremium: false,
    nonOwnedCSLPremium: false,
}

const defaultValue = 'No'
const yesNoValues = ['Yes', defaultValue]

export const vehiclePAYState = {
    yesNo: false,
    category: false,
    classification: false,
    vehicleCategory: false,
    vehicleType: false,
    state: false,
    vehicleState: false,
    vehicleWeight: false,
    fuelType: false,
    fleet: false,
    vin: false,
    make: false,
    model: false,
    modelYear: false,
    seating: false,
    wheelChair: false,
    plateNumber: false,
    garageZipCode: false,
    zoneCode: false,
    rateClassCode: false,
    baseName: false,
    baseType: false,
    baseNumber: false,
    baseEffDate: false,
    baseExpDate: false,
    shl: false,
    garageAddress1: false,
    garageAddress2: false,
    garageZipCode2: false,
    garageCity: false,
    garageCounty: false,
    garageState: false,
    garageCountry: false,
    overallPremium: false,
    personalInjuryProtectionPremium: false,
    pedPipProtectionPremium: false,
    medicalPaymentsPremium: false,
    underinsuredMotoristPremium: false,
    uninsuredMotoristPremium: false,
    hiredCSLPremium: false,
    nonOwnedCSLPremium: false,
    totalPremium: false,
    earnedPremium: false,
    endorsement: false,
    endorsementEffectiveDate: false,
    commissionPercentage: false,
    commissionAmount: false
}

export const reinsuranceNAICState = {
    reinsuranceType: reinsurer[0],
    resInsAmount: null,
}

export const paymentPAYState = {
    paymentType: true,
    installmentNo: true,
    totalPremium: true,
    subscriptionFee: true,
    taxFee: true,
    totalPremiumPaid: true,
    subscriptionFeePaid: true,
    taxFeePaid: true,
    installmentFeePaid: true,
    totalPremiumDue: true,
    subscriptionFeeDue: true,
    taxFeeDue: true
}


export const FormContext = createContext(null)

export const FormContextProvider = ({ children }) => {
    const [policyValues, setPolicyValues] = useState(policyPAYState)
    const [insuredValues, setInsuredValues] = useState(insuredPAYstate)
    //const [additionalInsuredValues, setAdditionalInsuredValues] = useState([{ ...additionalInsuredNAICState }])
    const [isAddActive, setAddActive] = useState(false)
    const [driverValues, setDriverValues] = useState([
        { ...driversPAYState },
    ])
    const [lossValues, setLossValues] = useState([{ ...lossHistoryState }])
    const [coverageValues, setCoverageValues] = useState(coveragePAYState)
    const [coverageErrors, setCoverageErrors] = useState([])
    const [document, setDocument] = useState(undefined)
    const [vehicleValues, setVehicleValues] = useState([{ ...vehiclePAYState }])
    const [reinsuranceValues, setReinsuranceValues] = useState(reinsuranceNAICState)
    const [paymentValues, setPaymentValues] = useState(paymentPAYState)
    const [underwritingValues, setUnderwritingValues] = useState(underwritingPAYState)

    const store = {
        policy: { values: policyValues, setValues: setPolicyValues },
        coverage: {
            values: coverageValues,
            setValues: setCoverageValues,
            errors: coverageErrors,
            setErrors: setCoverageErrors,
        },
        insured: {
            values: insuredValues,
            setValues: setInsuredValues,
            isAddActive,
            setAddActive
        },
        drivers: {
            values: driverValues,
            setValues: setDriverValues,
            defaults: driversPAYState,
        },
        lossHistory: {
            values: lossValues,
            setValues: setLossValues,
            defaults: lossHistoryState,
        },
        documents: { values: document, setValues: setDocument },
        vehicles: {
            values: vehicleValues,
            setValues: setVehicleValues,
            defaultValue,
            yesNoValues,
            yesNoOptions,
            defaults: vehiclePAYState,
        },
        payments: { values: paymentValues, setValues: setPaymentValues },
        reinsurance: {
            values: reinsuranceValues,
            setValues: setReinsuranceValues,
        },
        underwriting: {
            values: underwritingValues,
            setValues: setUnderwritingValues
        },
        reset: () => {
            setPolicyValues(policyPAYState)
            setInsuredValues(insuredPAYState)
            setAddActive(false)
            setDriverValues([{ ...driversPAYState }])
            setLossValues([{ ...lossHistoryState }])
            setCoverageValues(coveragePAYState)
            setCoverageErrors([])
            setDocument(undefined)
            setVehicleValues([{ ...vehiclePAYState }])
            setReinsuranceValues(reinsuranceNAICState)
            setPaymentValues(paymentPAYState)
            setUnderwritingValues(underwritingPAYState)
            return
        },
    }

    return <FormContext.Provider value={store}>{children}</FormContext.Provider>
}
