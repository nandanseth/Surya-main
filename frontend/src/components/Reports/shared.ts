import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import styled from 'styled-components'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: 24,
            fontWeight: 300,
        },
    })
)

export const Container = styled.div`
    padding: 8px 4px;
`
