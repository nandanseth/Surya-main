// This is copied over mainly from the PolicyForm Coverage

import { Form } from '../../styles/styles'
import autoEntryOptions from '../../utils/coverage/getAutoSymbolEntry'
import CoverageOptions from '../../utils/coverage/getLimit'
import SuryaInput from '../PolicyForm/PolicyFormInput'
import SuryaSelect from '../PolicyForm/PolicyFormSelect'

const { Section, SectionTitle, Flex, InputWrapper } = Form

const {
    limitOptions,
    autoSymbolOptions,
    bodyPerPersonOptions,
    bodyPerAccidentOptions,
    propertyDamageOptions,
} = CoverageOptions

const deductableOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
]
const overallOptions = [
    { value: 'Combined Single Limit', label: 'Combined Single Limit' },
    { value: 'Split Limit', label: 'Split Limit' },
]

const CoverageSection = ({ coverage, setCoverage }) => {
    const values = coverage
    const setValues = setCoverage

    const {
        overall,
        deductable,
        deductableAmount,
        deductableAutoEntry,
        combinedSectionLimit,
        combinedSectionEntry,
        splitSectionBodyPerPerson,
        splitSectionBodyPerAccidentOptions,
        splitSectionPropertyDamageOptions,
        splitSectionAutoEntryOptions,
        pIProtectionSingleLimit,
        pIProtectionSingleEntry,
        pIProtectionSplitBodyPerPerson,
        pIProtectionSplitBodyPerAccident,
        pIProtectionSplitPropertyDamage,
        pIProtectionSplitAutoEntry,
        medicalSingleLimit,
        medicalSingleEntry,
        medicalSplitBodyPerPerson,
        medicalSplitBodyPerAccident,
        medicalSplitPropertyDamage,
        medicalSplitAutoEntry,
        underinsuredMotoristSingleLimit,
        underinsuredMotoristSingleAutoEntry,
        underMotoristBodyPerPerson,
        underMotoristBodyPerAccident,
        underMotoristProperty,
        underMotoristAuto,
        // cslSingleLimit,
        // cslBodyPerAccident,
        // cslBodyPerPerson,
        // cslSingleAuto,
        // cslProperty,
        // cslSplitAuto,
        // nonCslBodyPerAccident,
        // nonCslBodyPerPerson,
        // nonCslProperty,
        // nonCslSingleAuto,
        // nonCslSingleLimit,
        // nonCslSplitAuto,
        unMotoristAuto,
        unMotoristBodyPerAccident,
        unMotoristBodyPerPerson,
        unMotoristProperty,
        uninsuredMotoristSingleAutoEntry,
        uninsuredMotoristSingleLimit,
        personalInjury,
        medicalPayments,
        underinsuredMotorist,
        uninsuredMotorist,
        csl,
        nonOwnedCSL,
        overallPremium,
        personalInjuryProtectionPremium,
        medicalPaymentsPremium,
        underinsuredMotoristPremium,
        uninsuredMotoristPremium,
        hiredCSLPremium,
        nonOwnedCSLPremium,
    } = values

    const combinedSection = (
        <>
            <Flex>
                <InputWrapper>
                    <SuryaSelect
                        label="Limit"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                combinedSectionLimit: e.target.value,
                            })
                        }}
                        options={limitOptions}
                        placeholder="Choose Limit"
                        value={combinedSectionLimit}
                    />
                </InputWrapper>
                <InputWrapper>
                    <SuryaSelect
                        label="Choose Auto Symbol"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                combinedSectionEntry: e.target.value,
                            })
                        }}
                        options={autoEntryOptions}
                        placeholder="Covered Auto Symbol Entry"
                        value={combinedSectionEntry}
                    />
                </InputWrapper>
            </Flex>
        </>
    )

    const splitSection = (
        <>
            <Flex>
                <InputWrapper>
                    <SuryaSelect
                        label="Body Injury Per Person"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                splitSectionBodyPerPerson: e.target.value,
                            })
                        }}
                        options={bodyPerPersonOptions}
                        placeholder="Choose Amount"
                        value={splitSectionBodyPerPerson}
                    />
                </InputWrapper>
                <InputWrapper>
                    <SuryaSelect
                        label="Body Injury Per Accident"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                splitSectionBodyPerAccidentOptions:
                                    e.target.value,
                            })
                        }}
                        options={bodyPerAccidentOptions}
                        placeholder="Choose Amount"
                        value={splitSectionBodyPerAccidentOptions}
                    />
                </InputWrapper>
                <InputWrapper>
                    <SuryaSelect
                        label="Property Damage"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                splitSectionPropertyDamageOptions:
                                    e.target.value,
                            })
                        }}
                        options={propertyDamageOptions}
                        placeholder="Choose Amount"
                        value={splitSectionPropertyDamageOptions}
                    />
                </InputWrapper>
                <InputWrapper>
                    <SuryaSelect
                        label="Choose Auto Symbol"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                splitSectionAutoEntryOptions: e.target.value,
                            })
                        }}
                        options={autoEntryOptions}
                        placeholder="Covered Auto Symbol Entry"
                        value={splitSectionAutoEntryOptions}
                    />
                </InputWrapper>
            </Flex>
        </>
    )

    const pIProtectionSingle = (
        <>
            <InputWrapper>
                <SuryaSelect
                    label="Limit"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            pIProtectionSingleLimit: e.target.value,
                        })
                    }}
                    options={limitOptions}
                    placeholder="Choose Limit"
                    value={pIProtectionSingleLimit}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Choose Auto Symbol"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            pIProtectionSingleEntry: e.target.value,
                        })
                    }}
                    options={autoEntryOptions}
                    placeholder="Covered Auto Symbol Entry"
                    value={pIProtectionSingleEntry}
                />
            </InputWrapper>
        </>
    )

    const pIProtectionSplit = (
        <>
            <InputWrapper>
                <SuryaSelect
                    label="Body Injury Per Person"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            pIProtectionSplitBodyPerPerson: e.target.value,
                        })
                    }}
                    options={bodyPerPersonOptions}
                    placeholder="Choose Amount"
                    value={pIProtectionSplitBodyPerPerson}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Body Injury Per Accident"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            pIProtectionSplitBodyPerAccident: e.target.value,
                        })
                    }}
                    options={bodyPerAccidentOptions}
                    placeholder="Choose Amount"
                    value={pIProtectionSplitBodyPerAccident}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Property Damage"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            pIProtectionSplitPropertyDamage: e.target.value,
                        })
                    }}
                    options={propertyDamageOptions}
                    placeholder="Choose Amount"
                    value={pIProtectionSplitPropertyDamage}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Choose Auto Symbol"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            pIProtectionSplitAutoEntry: e.target.value,
                        })
                    }}
                    options={autoEntryOptions}
                    placeholder="Covered Auto Symbol Entry"
                    value={pIProtectionSplitAutoEntry}
                />
            </InputWrapper>
        </>
    )

    const medicalSingle = (
        <>
            <InputWrapper>
                <SuryaSelect
                    label="Limit"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            medicalSingleLimit: e.target.value,
                        })
                    }}
                    options={limitOptions}
                    placeholder="Choose Limit"
                    value={medicalSingleLimit}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Choose Auto Symbol"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            medicalSingleEntry: e.target.value,
                        })
                    }}
                    options={autoEntryOptions}
                    placeholder="Covered Auto Symbol Entry"
                    value={medicalSingleEntry}
                />
            </InputWrapper>
        </>
    )

    const medicalSplit = (
        <>
            <InputWrapper>
                <SuryaSelect
                    label="Body Injury Per Person"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            medicalSplitBodyPerPerson: e.target.value,
                        })
                    }}
                    options={bodyPerPersonOptions}
                    placeholder="Choose Amount"
                    value={medicalSplitBodyPerPerson}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Body Injury Per Accident"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            medicalSplitBodyPerAccident: e.target.value,
                        })
                    }}
                    options={bodyPerAccidentOptions}
                    placeholder="Choose Amount"
                    value={medicalSplitBodyPerAccident}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Property Damage"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            medicalSplitPropertyDamage: e.target.value,
                        })
                    }}
                    options={propertyDamageOptions}
                    placeholder="Choose Amount"
                    value={medicalSplitPropertyDamage}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Choose Auto Symbol"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            medicalSplitAutoEntry: e.target.value,
                        })
                    }}
                    options={autoEntryOptions}
                    placeholder="Covered Auto Symbol Entry"
                    value={medicalSplitAutoEntry}
                />
            </InputWrapper>
        </>
    )

    const underinsuredMotoristSingle = (
        <>
            <InputWrapper>
                <SuryaSelect
                    label="Limit"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            underinsuredMotoristSingleLimit: e.target.value,
                        })
                    }}
                    options={limitOptions}
                    placeholder="Choose Limit"
                    value={underinsuredMotoristSingleLimit}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Choose Auto Symbol"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            underinsuredMotoristSingleAutoEntry: e.target.value,
                        })
                    }}
                    options={autoEntryOptions}
                    placeholder="Covered Auto Symbol Entry"
                    value={underinsuredMotoristSingleAutoEntry}
                />
            </InputWrapper>
        </>
    )

    const underinsuredMotoristSplit = (
        <>
            <InputWrapper>
                <SuryaSelect
                    label="Body Injury Per Person"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            underMotoristBodyPerPerson: e.target.value,
                        })
                    }}
                    options={bodyPerPersonOptions}
                    placeholder="Choose Amount"
                    value={underMotoristBodyPerPerson}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Body Injury Per Accident"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            underMotoristBodyPerAccident: e.target.value,
                        })
                    }}
                    options={bodyPerAccidentOptions}
                    placeholder="Choose Amount"
                    value={underMotoristBodyPerAccident}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Property Damage"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            underMotoristProperty: e.target.value,
                        })
                    }}
                    options={propertyDamageOptions}
                    placeholder="Choose Amount"
                    value={underMotoristProperty}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Choose Auto Symbol"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            underMotoristAuto: e.target.value,
                        })
                    }}
                    options={autoEntryOptions}
                    placeholder="Covered Auto Symbol Entry"
                    value={underMotoristAuto}
                />
            </InputWrapper>
        </>
    )

    const uninsuredMotoristSingle = (
        <>
            <InputWrapper>
                <SuryaSelect
                    label="Limit"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            uninsuredMotoristSingleLimit: e.target.value,
                        })
                    }}
                    options={limitOptions}
                    placeholder="Choose Limit"
                    value={uninsuredMotoristSingleLimit}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Choose Auto Symbol"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            uninsuredMotoristSingleAutoEntry: e.target.value,
                        })
                    }}
                    options={autoEntryOptions}
                    placeholder="Covered Auto Symbol Entry"
                    value={uninsuredMotoristSingleAutoEntry}
                />
            </InputWrapper>
        </>
    )

    const uninsuredMotoristSplit = (
        <>
            <InputWrapper>
                <SuryaSelect
                    label="Body Injury Per Person"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            unMotoristBodyPerPerson: e.target.value,
                        })
                    }}
                    options={bodyPerPersonOptions}
                    placeholder="Choose Amount"
                    value={unMotoristBodyPerPerson}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Body Injury Per Accident"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            unMotoristBodyPerAccident: e.target.value,
                        })
                    }}
                    options={bodyPerAccidentOptions}
                    placeholder="Choose Amount"
                    value={unMotoristBodyPerAccident}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Uninsured Property Damage"
                    onChange={(e) => {
                        setValues({
                            ...values,
                            unMotoristProperty: e.target.value,
                        })
                    }}
                    options={propertyDamageOptions}
                    placeholder="Choose Amount"
                    value={unMotoristProperty}
                />
            </InputWrapper>
            <InputWrapper>
                <SuryaSelect
                    label="Choose Auto Symbol"
                    onChange={(e) => {
                        setValues({ ...values, unMotoristAuto: e.target.value })
                    }}
                    options={autoEntryOptions}
                    placeholder="Covered Auto Symbol Entry"
                    value={unMotoristAuto}
                />
            </InputWrapper>
        </>
    )

    return (
        <div>
            <Section>
                <SectionTitle> Overall </SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="Choose Overall Coverage"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    overall: e.target.value,
                                })
                            }}
                            options={overallOptions}
                            placeholder="Choose Overall Coverage"
                            value={overall}
                        />
                    </InputWrapper>
                </Flex>

                {overall === 'Combined Single Limit'
                    ? combinedSection
                    : splitSection}
                <Flex>
                    <SuryaInput
                        label="Overall Premium"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                overallPremium: e.target.value,
                            })
                        }}
                        placeholder="Overall Premium"
                        type="number"
                        value={overallPremium}
                    />
                </Flex>
            </Section>
            <Section>
                <SectionTitle>Personal Injury Protection</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="Overall"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    personalInjury: e.target.value,
                                })
                            }}
                            options={overallOptions}
                            placeholder="Choose Personal Injury Protection Coverage"
                            value={personalInjury}
                        />
                    </InputWrapper>
                </Flex>
                <Flex>
                    {personalInjury === 'Combined Single Limit'
                        ? pIProtectionSingle
                        : pIProtectionSplit}
                </Flex>

                <Flex>
                    <SuryaInput
                        label="Personal Injury Protection Premium"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                personalInjuryProtectionPremium: e.target.value,
                            })
                        }}
                        placeholder="Personal Injury Protection Premium"
                        type="number"
                        value={personalInjuryProtectionPremium}
                    />
                </Flex>
            </Section>
            <Section>
                <SectionTitle>Medical Payments</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="Overall"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    medicalPayments: e.target.value,
                                })
                            }}
                            options={overallOptions}
                            placeholder="Choose Personal Injury Protection Coverage"
                            value={medicalPayments}
                        />
                    </InputWrapper>
                </Flex>
                <Flex>
                    {medicalPayments === 'Combined Single Limit'
                        ? medicalSingle
                        : medicalSplit}
                </Flex>
                <Flex>
                    <SuryaInput
                        label="Medical Payments Premium"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                medicalPaymentsPremium: e.target.value,
                            })
                        }}
                        placeholder="Medical Payments Premium"
                        type="number"
                        value={medicalPaymentsPremium}
                    />
                </Flex>
            </Section>

            <Section>
                <SectionTitle>Underinsured Motorist</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="Choose Underinsured Motorist Coverage"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    underinsuredMotorist: e.target.value,
                                })
                            }}
                            options={overallOptions}
                            placeholder="Choose Underinsured Motorist Coverage"
                            value={underinsuredMotorist}
                        />
                    </InputWrapper>
                </Flex>
                <Flex>
                    {underinsuredMotorist === 'Combined Single Limit'
                        ? underinsuredMotoristSingle
                        : underinsuredMotoristSplit}
                </Flex>

                <Flex>
                    <SuryaInput
                        label="Underinsured Motorist Premium"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                underinsuredMotoristPremium: e.target.value,
                            })
                        }}
                        placeholder="Underinsured Motorist Premium"
                        type="number"
                        value={underinsuredMotoristPremium}
                    />
                </Flex>
            </Section>

            <Section>
                <SectionTitle>Uninsured Motorist</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="Overall"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    uninsuredMotorist: e.target.value,
                                })
                            }}
                            options={overallOptions}
                            placeholder="Choose Underinsured Motorist Coverage"
                            value={uninsuredMotorist}
                        />
                    </InputWrapper>
                </Flex>
                <Flex>
                    {uninsuredMotorist === 'Combined Single Limit'
                        ? uninsuredMotoristSingle
                        : uninsuredMotoristSplit}
                </Flex>

                <Flex>
                    <SuryaInput
                        label="Uninsured Motorist Premium"
                        onChange={(e) => {
                            setValues({
                                ...values,
                                uninsuredMotoristPremium: e.target.value,
                            })
                        }}
                        placeholder="Uninsured Motorist Premium}"
                        type="number"
                        value={uninsuredMotoristPremium}
                    />
                </Flex>
            </Section>

            <Section>
                <SectionTitle>Hired CSL</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="Choose CSL Coverage"
                            onChange={(e) => {
                                setValues({ ...values, csl: e.target.value })
                            }}
                            options={[
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' },
                            ]}
                            placeholder=""
                            value={csl}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Hired CSL Premium"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    hiredCSLPremium: e.target.value,
                                })
                            }}
                            placeholder=""
                            value={hiredCSLPremium}
                        />
                    </InputWrapper>
                </Flex>
            </Section>
            <Section>
                <SectionTitle>Non-Owned CSL</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="Overall"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    nonOwnedCSL: e.target.value,
                                })
                            }}
                            options={[
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' },
                            ]}
                            placeholder="Choose Non Owned CSL Coverage"
                            value={nonOwnedCSL}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <SuryaInput
                            label="Non Owned CSL Premium"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    nonOwnedCSLPremium: e.target.value,
                                })
                            }}
                            placeholder=""
                            value={nonOwnedCSLPremium}
                        />
                    </InputWrapper>
                </Flex>
            </Section>

            <Section>
                <SectionTitle>Deductable</SectionTitle>
                <Flex>
                    <InputWrapper>
                        <SuryaSelect
                            label="Deductable"
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    deductable: e.target.value,
                                })
                            }}
                            options={deductableOptions}
                            placeholder="Yes/No"
                            value={deductable}
                        />
                    </InputWrapper>
                    {deductable &&
                        (deductable === 'Yes' ? (
                            <>
                                <InputWrapper>
                                    <SuryaSelect
                                        label="Amount"
                                        onChange={(e) => {
                                            setValues({
                                                ...values,
                                                deductableAmount:
                                                    e.target.value,
                                            })
                                        }}
                                        options={autoSymbolOptions}
                                        placeholder="$$"
                                        value={deductableAmount}
                                    />
                                </InputWrapper>
                                <InputWrapper>
                                    <SuryaSelect
                                        label="Covered Auto Symbol Entry"
                                        onChange={(e) => {
                                            setValues({
                                                ...values,
                                                deductableAutoEntry:
                                                    e.target.value,
                                            })
                                        }}
                                        options={autoEntryOptions}
                                        placeholder="$$"
                                        value={deductableAutoEntry}
                                    />
                                </InputWrapper>
                            </>
                        ) : null)}
                </Flex>
            </Section>
        </div>
    )
}

export default CoverageSection
