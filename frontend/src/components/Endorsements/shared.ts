import { Add } from '../Buttons'
import { Colors, fonts } from '../../styles/styles'
import { DarkSubmit } from '../Buttons'
import styled from 'styled-components'

export const Item = styled.div`
    border-radius: 8px;
    background: ${Colors.blueGrey};
    flex: 1 1 auto;
    padding: 12px;
    margin: 4px 0;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
`

export const Col = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 8px 12px;
`

export const Title = styled.h4`
    font-size: ${fonts.size.xs};
    color: black;
    margin-bottom: 6px;
`

export const Info = styled.p`
    font-size: ${fonts.size.default};
    color: black;
`

export const Delete = styled(DarkSubmit)`
    margin-right: 24px;
    font-weight: 400;
    min-width: unset;
    background: #00000012;
    color: black;
    line-height: 12px;
    font-size: 12px;
    padding: 0;
    height: 24px;
    width: 24px;
    :hover {
        background: ${Colors.red};
        opacity: 0.9;
    }
`

export const AddButton = styled(Add)`
    margin: auto;
    align-self: center;
    display: block;
    max-width: unset;
    border-radius: 8px;
`
