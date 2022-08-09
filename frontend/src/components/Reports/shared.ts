import { createStyles, makeStyles } from '@mui/styles'
import { fonts } from '../../styles/styles'
import { Theme } from '@mui/material/styles'
import styled from 'styled-components'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: 18,
            fontWeight: 600,
            fontFamily: fonts.reading,
        },
    })
)

export const Container = styled.div`
    padding: 8px 4px;
    display: grid;
    align-items: center;
    grid-template-columns: auto auto auto;
    flex: 1 1 auto;
`
