import React from 'react';
import styled from 'styled-components';
import { ButtonHolder, Form } from '../../styles/styles';
import { statesOptions } from '../../utils/policies';
import fuelTypeOptions from '../../utils/vehicle/fuelType';
import vehicleCategoryOptions, {
  optionsMap
} from '../../utils/vehicle/getVehicleCategory';
import vehicleTypes from '../../utils/vehicle/getVehicleType';
import getWeightSelects from '../../utils/vehicle/getWeightSelects';
import { Save } from '../Buttons';
import Input from '../PolicyFormInput';
import SuryaSelect from '../PolicyFormSelect';

const {
  Section, SectionTitle, Flex, InputWrapper,
} = Form;

const title = 'Vehicles';
const vITitle = 'Vehicle Info';

const VehicleSection = ({ store }) => {
  const { vehicles: vehicleStates } = store;
  const  { values, setValues, defaultValue, yesNoValues, yesNoOptions, defaults } = vehicleStates;

  const addFields = () => {
    setValues([...values, { ...defaults }]);
  };

  const removeFields = (i) => {
    if (values.length <= 0) {
      setValues([{ ...defaults }]);
      return;
    }

    const newArray = [...values];
    newArray.splice(i, 1);
    setValues(newArray);
  };

  const vQ = 'Is this vehicle used for something other than the category/classification stated in Policy Info';

  const DefaultFields = ({ num = 0 } : { num?: number }) => {
    const handleInputOnChange = (e) => {
      const copy = [...values];
      copy[num][e.target.name] = e.target.value;
      setValues(copy);
    };

    const handleSelectOnChange = (v, propertyName) => {
      const copy = [ ...values ];
      copy[num][propertyName] = v;
      setValues(copy);
    }

    return (
      <div>
        <Section>
          <SectionTitle>{vQ}</SectionTitle>
          <Flex>
            <RadioGroup
              values={yesNoValues}
              setValue={(s) => {
                handleSelectOnChange(s, 'yesNo')
              }}
              currentValue={values[num].yesNo}
            />
          </Flex>
          <Flex>
            {values[num].yesNo !== defaultValue ? (
              <Section>
                <Flex>
                  <InputWrapper>
                    <SuryaSelect
                      options={vehicleCategoryOptions}
                      placeholder="Category"
                      label="Vehicle Category"
                      value={values[num].category}
                      onChange={(v) => {
                        handleSelectOnChange(v, 'category');
                      }}
                    />
                  </InputWrapper>
                </Flex>
                <Flex>
                  {values[num].category !== null ? (
                    <InputWrapper>
                      <SuryaSelect
                        options={optionsMap[values[num].category?.value]}
                        placeholder="Category"
                        label="Vehicle Category"
                        value={values[num].vehicleCategory}
                        onChange={(v) => {
                          handleSelectOnChange(v, 'vehicleCategory');
                        }}
                      />
                    </InputWrapper>
                  ) : null}
                </Flex>
              </Section>
            ) : null}
          </Flex>
        </Section>
        <Section>
          <SectionTitle>{vITitle}</SectionTitle>
          <Flex>
            <InputWrapper>
              <SuryaSelect
                options={vehicleTypes}
                placeholder="Type"
                label="Vehicle Type"
                value={values[num].vehicleType}
                onChange={(v) => {
                  handleSelectOnChange(v, 'vehicleType')
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="VIN"
                label="Vin"
                value={values[num].vin}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <div>auto gene make, model, etc.</div>
            <InputWrapper>
              <Input
                placeholder="Make"
                label="Vehicle Make"
                value={values[num].make}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Model"
                label="Vehicle Model"
                value={values[num].model}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Year"
                label="Vehicle Model Year"
                value={values[num].modelYear}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="Seating Capacity"
                label="Seating"
                value={values[num].seating}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaSelect
                options={yesNoOptions}
                placeholder="Yes/No"
                label="Wheelchair Accessible?"
                value={values[num].wheelChair}
                onChange={(v) => {
                  handleSelectOnChange(v, 'wheelChair')
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaSelect
                options={getWeightSelects}
                placeholder="Weight"
                label="Vehicle Weight"
                value={values[num].vehicleWeight}
                onChange={(v) => {
                  handleSelectOnChange(v, 'vehicleWeight')
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaSelect
                options={vehicleTypes}
                placeholder="Type"
                label="Vehicle Type"
                value={values[num].vehicleType}
                onChange={(v) => {
                  handleSelectOnChange(v, 'vehicleType')
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name='plateNumber'
                placeholder="Plate Number"
                label="Plate"
                value={values[num].plateNumber}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
  
            <InputWrapper>
              <SuryaSelect
                options={fuelTypeOptions}
                placeholder="Type"
                label="Fuel Type"
                value={values[num].fuelType}
                onChange={(v) => {
                  handleSelectOnChange(v, 'fuelType')
                }}
              />
            </InputWrapper>
          </Flex>
        </Section>
        <Section>
          <SectionTitle>Additional Info</SectionTitle>
          <Flex>
            <InputWrapper>
              <Input
                name="garageZipCode"
                placeholder="XXXXX"
                label="Garage Zip Code (5 Digit)"
                value={values[num].garageZipCode}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="zoneCode"
                placeholder="Zone Code"
                label="Zone Code"
                value={values[num].zoneCode}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaSelect
                options={yesNoOptions}
                placeholder="Yes/No"
                label="Fleet"
                value={values[num].vehicleWeight}
                onChange={(v) => {
                  handleSelectOnChange(v, 'vehicleWeight');
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="rateClassCode"
                placeholder="Code"
                label="Rate Class Code"
                value={values[num].rateClassCode}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
          </Flex>
        </Section>
        <Section>
          <SectionTitle>Base Info</SectionTitle>
          <Flex>
            <InputWrapper>
              <Input
                name="baseName"
                placeholder="Name"
                label="Base Name"
                value={values[num].baseName}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaSelect
                options={[
                  { value: 'Black Car', label: 'Black Car' },
                  { value: 'Livery', label: 'Livery' },
                  { value: 'N/A', label: 'N/A' },
                ]}
                placeholder="type"
                label="Base Type"
                value={values[num].baseType}
                onChange={(v) => {
                  handleSelectOnChange(v, 'baseType')
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="baseNumber"
                placeholder="#"
                label="Base Number"
                value={values[num].baseNumber}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="baseExpDate"
                placeholder="MM/DD/YYYY"
                label="Base Number"
                value={values[num].baseExpDate}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="shl"
                placeholder="SHL"
                label="SHL Permit"
                value={values[num].shl}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
          </Flex>
        </Section>
        <Section>
          <SectionTitle>Garage Information</SectionTitle>
          <Flex>
            <InputWrapper>
              <Input
                name="garageAddress1"
                placeholder="address"
                label="Address Line 1"
                value={values[num].garageAddress1}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name='garageAddress2'
                placeholder="address"
                label="Address Line 2"
                value={values[num].garageAddress2}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name='garageZipCode2'
                placeholder="zip"
                label="Zip Code"
                value={values[num].garageZipCode2}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name='garageCity'
                placeholder="city"
                label="City"
                value={values[num].garageCity}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name='garageCounty'
                placeholder="county"
                label="county"
                value={values[num].garageCounty}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <SuryaSelect
                placeholder="State"
                label="State"
                options={statesOptions}
                value={values[num].garageState}
                onChange={(v) => {
                  handleSelectOnChange(v, 'garageState')
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="garageCountry"
                placeholder="country"
                label="country"
                value={values[num].garageCountry}
                onChange={handleInputOnChange}
              />
            </InputWrapper>
          </Flex>
        </Section>
        <Flex>
          <div style={{ marginLeft: 'auto' }}>
            <StyledCancel onClick={() => {
              removeFields(num);
            }}
            >
              Cancel
            </StyledCancel>
          </div>
        </Flex>
      </div>
    );
  }

  return (
    <Wrapper>
      <Center>
        <StyledTitle>
          {title}
        </StyledTitle>
        <StyledHolder>
          <Add onClick={addFields}>+ Add Vehicle</Add>
        </StyledHolder>
      </Center>
      <div>
      {values.map((key, i) => {
        const toReturn = DefaultFields({ num: i });
        return (
          <React.Fragment key={i}>
            { toReturn }
          </React.Fragment>
        );
      })}

      </div>
    </Wrapper>
  );
};

const RadioGroup = ({
  values,
  setValue,
  currentValue,
}: {
  currentValue?: string
  values: string[]
  setValue: any
}) => (
  <Flex>
    {values.map((item) => (
      <RadioLabel key={item}>
        <Span>{item}</Span>
        <input
          type="radio"
          name={item}
          checked={currentValue === item}
          onChange={() => {
            setValue(item);
          }}
          value={item}
        />
      </RadioLabel>
    ))}
  </Flex>
);


const RadioLabel = styled.label`
  font: inherit;
  font-size: 14px;
  padding: 8px;
  display: flex;
  align-items: center;
`;

const Span = styled.span`
  margin-right: 5px;
  font-size: inherit;
`;

const Wrapper = styled.div`
    padding: 8px;
    width: 100%;
`;

const Add = styled(Save)`
  max-width: 200px;
  width: 100%;
  margin-left: auto;
  font-weight: 500;
  padding: 12px;
  font-size: 14px;
`;

const StyledHolder = styled(ButtonHolder)`
  margin: 0;
  margin-left: auto;
`;

const StyledTitle = styled(SectionTitle)`
  width: auto;
`;

const Center = styled(Flex)`
  align-items: center;
  margin-bottom: 8px;
`;

const StyledCancel = styled(Add)`
  background: #f4f5f6;
  padding: 12px 40px;
  min-width: 200px;
  color: #3a5665;

  &:hover {
    background: rgba(89,195,179,0.125683);
  }
`;

export default VehicleSection;
