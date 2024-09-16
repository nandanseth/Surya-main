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

export const policyNAICState = {
    name: true,
    policyNum: true,
    states: true,
    classification: false,
    lineOfBusiness: true,
    policyLineItem: false,
    coverageTerm: false,
    policyCategory: false,
    underwritingCode: false,
    agent: true,
    effectiveDate: true,
    expirationDate: true,
    radius: false,
    classCode: false,
    businessUseClass: false,
    secondaryCategory: true,
}

export const insuredNAICState = {
    agent: false,
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
    city: true,
    state: true,
    zipCode: true,
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

export const driversNAICState = {
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

export const underwritingNAICState = {
    creditsDebits: false,
    remarks: false,
    isCamera: false
}
export const coverageNAICState = {
    overall: true,
    deductable: true,
    deductableAmount: true,
    deductableAutoEntry: true,
    combinedSectionLimit: true,
    combinedSectionEntry: true,
    splitSectionBodyPerPerson: true,
    splitSectionBodyPerAccidentOptions: true,
    splitSectionPropertyDamageOptions: true,
    splitSectionAutoEntryOptions: false,
    pIProtectionSingleLimit: true,
    pIProtectionSingleEntry: true,
    pIProtectionSplitBodyPerPerson: true,
    pIProtectionSplitBodyPerAccident: true,
    pIProtectionSplitPropertyDamage: true,
    pIProtectionSplitAutoEntry: false,
    pedPipSingleLimit: true,
    medicalSingleLimit: false,
    medicalSingleEntry: false,
    medicalSplitBodyPerPerson: false,
    medicalSplitBodyPerAccident: false,
    medicalSplitPropertyDamage: false,
    medicalSplitAutoEntry: false,
    underinsuredMotoristSingleLimit: true,
    underinsuredMotoristSingleAutoEntry: false,
    underMotoristBodyPerPerson: true,
    underMotoristBodyPerAccident: true,
    underMotoristProperty: true,
    underMotoristAuto: true,
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
    unMotoristAuto: true,
    unMotoristBodyPerAccident: true,
    unMotoristBodyPerPerson: true,
    unMotoristProperty: true,
    uninsuredMotoristSingleAutoEntry: false,
    uninsuredMotoristSingleLimit: true,
    personalInjury: false,
    medicalPayments: false,
    underinsuredMotorist: false,
    uninsuredMotorist: false,
    csl: true,
    nonOwnedCSL: true,

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

export const vehicleNAICState = {
    yesNo: false,
    category: false,
    classification: true,
    vehicleCategory: true,
    vehicleType: false,
    state: true,
    vehicleState: false,
    vehicleWeight: true,
    fuelType: false,
    fleet: true,
    vin: true,
    make: true,
    model: true,
    modelYear: true,
    seating: true,
    wheelChair: false,
    plateNumber: false,
    garageZipCode: true,
    zoneCode: false,
    rateClassCode: true,
    baseName: false,
    baseType: false,
    baseNumber: false,
    baseEffDate: true,
    baseExpDate: true,
    shl: false,
    garageAddress1: false,
    garageAddress2: false,
    garageZipCode2: false,
    garageCity: false,
    garageCounty: false,
    garageState: false,
    garageCountry: false,
    overallPremium: true,
    personalInjuryProtectionPremium: true,
    pedPipProtectionPremium: true,
    medicalPaymentsPremium: true,
    underinsuredMotoristPremium: true,
    uninsuredMotoristPremium: true,
    hiredCSLPremium: false,
    nonOwnedCSLPremium: false,
    totalPremium: true,
    earnedPremium: true,
    endorsement: true,
    endorsementEffectiveDate: true,
    commissionPercentage: true,
    commissionAmount: true,
    cancellationDate: true,
    isCancelled: true
}

export const reinsuranceNAICState = {
    reinsuranceType: reinsurer[0],
    resInsAmount: null,
}

export const paymentNAICState = {
    paymentType: '100% DEPOSIT',
}


export const FormContext = createContext(null)

export const FormContextProvider = ({ children }) => {
    const [policyValues, setPolicyValues] = useState(policyNAICState)
    const [insuredValues, setInsuredValues] = useState(insuredNAICState)
    //const [additionalInsuredValues, setAdditionalInsuredValues] = useState([{ ...additionalInsuredNAICState }])
    const [isAddActive, setAddActive] = useState(false)
    const [driverValues, setDriverValues] = useState([
        { ...driversNAICState },
    ])
    const [lossValues, setLossValues] = useState([{ ...lossHistoryState }])
    const [coverageValues, setCoverageValues] = useState(coverageNAICState)
    const [coverageErrors, setCoverageErrors] = useState([])
    const [document, setDocument] = useState(undefined)
    const [vehicleValues, setVehicleValues] = useState([{ ...vehicleNAICState }])
    const [reinsuranceValues, setReinsuranceValues] = useState(reinsuranceNAICState)
    const [paymentValues, setPaymentValues] = useState(paymentNAICState)
    const [underwritingValues, setUnderwritingValues] = useState(underwritingNAICState)

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
            defaults: driversNAICState,
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
            defaults: vehicleNAICState,
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
            setPolicyValues(policyNAICState)
            setInsuredValues(insuredNAICState)
            setAddActive(false)
            setDriverValues([{ ...driversNAICState }])
            setLossValues([{ ...lossHistoryState }])
            setCoverageValues(coverageNAICState)
            setCoverageErrors([])
            setDocument(undefined)
            setVehicleValues([{ ...vehicleNAICState }])
            setReinsuranceValues(reinsuranceNAICState)
            setPaymentValues(paymentNAICState)
            setUnderwritingValues(underwritingNAICState)
            return
        },
    }

    return <FormContext.Provider value={store}>{children}</FormContext.Provider>
}
