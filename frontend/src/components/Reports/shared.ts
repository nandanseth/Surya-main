import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import styled from 'styled-components'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    })
)

export const Container = styled.div`
    padding: 8px 4px;
`
