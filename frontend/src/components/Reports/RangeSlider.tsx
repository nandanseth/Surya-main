import { fonts, StyledDiv } from '../../styles/styles'
import Slider from '@mui/material/Slider'
import styled from 'styled-components'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

const valuetext = (value: number) => {
    return formatter.format(value)
}

const distance = 100

interface Props {
    value: number[]
    label: string
    setValue: (a: number[]) => void
    minDistance?: number
    min: any
    max: any
    step: number
}

export default function MinimumDistanceSlider({
    value,
    setValue,
    minDistance = distance,
    label,
    min,
    max,
    step,
}: Props) {
    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
        }
    }

    return (
        <StyledDiv>
            <Title>{label}</Title>
            <Slider
                disableSwap
                getAriaLabel={() => 'Minimum distance'}
                getAriaValueText={valuetext}
                max={max}
                min={min}
                onChange={handleChange1}
                step={step}
                value={value}
                valueLabelDisplay="auto"
                valueLabelFormat={valuetext}
            />
        </StyledDiv>
    )
}

const Title = styled.div`
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: ${fonts.size.default};
    font-weight: ${fonts.weights.medium};
    width: 100%;
`
