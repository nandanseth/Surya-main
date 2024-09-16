import React, { useEffect } from 'react';
import { Add } from '../../../components/Buttons'
import styled from 'styled-components';
import Papa from 'papaparse';
import DriverItem from '../../../components/PolicyFormSections/DriverItem';
import { ButtonHolder, Form } from '../../../styles/styles';

const { SectionTitle, Flex } = Form;

const RejectedDriversModal = ({ store, values, setValues, onClose, onSubmit  }) => {
    const policy = store;

    const defaults = {
        driverFirstName: null,
        driverMiddleName: null,
        driverLastName: null,
        states: 'OR',
        licenseNumber: null,
        licenseEffDate: null,
        licenseExpDate: null,
        driverEffDate: null,
        driverExpDate: null,
        driverBirthDate: null,
    };

    useEffect(() => {
        if (values !== undefined) {
            if (values[0]?.driverEffDate !== policy.effectiveDate && values[0] === defaults) {
                setValues([{ ...defaults, driverEffDate: policy.effectiveDate, driverExpDate: policy.expirationDate }]);
            }
        }
    }, [values, policy.effectiveDate, policy.expirationDate, setValues]);

    const addFields = () => {
        setValues(values ? [...values, { ...defaults, driverEffDate: policy.effectiveDate, driverExpDate: policy.expirationDate }] : [{ ...defaults, driverEffDate: policy.effectiveDate, driverExpDate: policy.expirationDate }]);
    };

    const removeFields = (i) => {
        const newArray = [...values];
        if (values.length <= 1) {
            setValues([{ ...defaults, driverEffDate: policy.effectiveDate, driverExpDate: policy.expirationDate }]);
        } else {
            newArray.splice(i, 1);
            setValues(newArray);
        }
    };

    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const copy = results.data.map(item => ({
                    ...defaults,
                    driverLastName: item['Last Name'],
                    driverFirstName: item['First Name'],
                    driverMiddleName: item['Middle Name'],
                    licenseEffDate: item['License Effective Date'],
                    licenseExpDate: item['License Expiration Date'],
                    licenseNumber: item['License Number'],
                    states: item['State'],
                    driverEffDate: policy.values.effectiveDate,
                    driverExpDate: policy.values.expirationDate,
                    driverBirthDate: item['Birth Date'],
                }));
                setValues(copy);
            },
        });
    };

    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    <StyledTitle>{'Rejected Drivers'}</StyledTitle>
                    <StyledHolder>
                        <input type="file" name="file" onChange={changeHandler} />
                        <Add onClick={addFields}>+ Add Driver</Add>
                    </StyledHolder>
                    <div>
                        {values?.map((_, i) => (
                            <DriverItem key={i} num={i} removeFields={() => removeFields(i)} setValues={setValues} values={values} />
                        ))}
                    </div>
                    <ButtonGroup>
                        <CancelButton onClick={onClose}>Cancel</CancelButton>
                        <SubmitButton onClick={(async () => {
        try {
            await onSubmit(values);
            // Handle successful submission, e.g., close the modal
            onClose();
            // Optionally, re-enable the button or update UI to reflect success
        } catch (error) {
            console.error("Failed to submit rejected drivers:", error);
            // Handle errors, e.g., show an error message to the user
            // Optionally, re-enable the button or update UI to reflect failure
        }
    })}>Submit</SubmitButton>
                    </ButtonGroup>
                </ModalContent>
            </ModalWrapper>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalWrapper = styled.div`
    padding: 20px;
    width: 90%; /* You might want to adjust this for larger width */
    max-width: 800px; /* Increase max-width for a larger modal */
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    max-height: 80vh; /* Prevents modal from being taller than the viewport */
    overflow-y: auto; /* Adds scrollbar to modal itself if content overflows */
`;

const ModalContent = styled.div`
    padding: 8px;
    overflow-y: auto; /* Ensures content within can scroll if it exceeds the container's height */
    max-height: 70vh; /* Adjust based on your header/footer size within the modal */
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

const SubmitButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;

const CancelButton = styled.button`
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #d32f2f;
    }
`;


const StyledHolder = styled(ButtonHolder)`
    margin: 0;
    margin-left: auto;
`

const StyledTitle = styled(SectionTitle)`
    width: auto;
`

export default RejectedDriversModal;
