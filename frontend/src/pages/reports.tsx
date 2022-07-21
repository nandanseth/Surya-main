import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react'
import Sidebar from '../components/Sidebar'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    })
)

// const policyInitialState = {
//     name: '',
//     policyNum: null,
//     states: states[0],
//     classification: classificationMap[policyCategory[0]].value,
//     lineOfBusiness: lineOfBusiness[0],
//     policyLineItem: policyLineItem[0],
//     coverageTerm: coverageTerm[0],
//     policyCategory: policyCategory[0],
//     underwritingCode: underwritingCode[0],
//     agent: agent[0],
//     effectiveDate: null,
//     expirationDate: null,
//     radius: radius[0],
//     classCode: classCodes[0],
//     businessUseClass: bussinessUseClasses[0],
//     sizeClass: sizeClasses[0],
// }

const Home = () => {
    const classes = useStyles()

    return (
        <Main>
            <Flex>
                <Sidebar />
                <Content>
                    return (
                    <div className={classes.root}>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                expandIcon={<ExpandMoreIcon />}
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>
                                    Accordion 1
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel2a-content"
                                expandIcon={<ExpandMoreIcon />}
                                id="panel2a-header"
                            >
                                <Typography className={classes.heading}>
                                    Accordion 2
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion disabled>
                            <AccordionSummary
                                aria-controls="panel3a-content"
                                expandIcon={<ExpandMoreIcon />}
                                id="panel3a-header"
                            >
                                <Typography className={classes.heading}>
                                    Disabled Accordion
                                </Typography>
                            </AccordionSummary>
                        </Accordion>
                    </div>
                    );
                </Content>
            </Flex>
        </Main>
    )
}

const Main = styled.main`
    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: block;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const Content = styled.div`
    height: 100%;
    min-height: 100vh;
    background: white;
    flex: 1 1 auto;
`

export default Home
