import CoverageSection from './InfoSections/Coverage'
import DocumentsSection from '../../components/RenderDocuments/RenderDocuments'
import DriversSection from './InfoSections/Drivers'
import InsuredSection from './InfoSections/Insured'
import LossHistorySection from './InfoSections/LossHistory'
import PolicySection from './InfoSections/Policy'
import styled from 'styled-components'
import VehiclesSection from './InfoSections/Vehicles'

export const Flex = styled.div`
    flex-flow: row wrap;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 6px auto;
    align-items: flex-start;
`

export const Section = styled.div`
    margin-top: 12px;
    margin-bottom: 12px;
    width: 100%;
`

export const Title = styled.div`
    font-size: 20px;
    color: #000000;
    margin-right: auto;
    font-weight: 600;
`

export const Tile = styled.div`
    padding: 12px 8px;
    border-radius: 8px;
    background: #eceeee;
    display: flex;
    flex-direction: column;
    margin: 8px;
    margin-left: 0px;
    min-width: 100px;
    min-height: 64px;
    align-items: center;
`

export const TitleTitle = styled.h3`
    color: black;
    font-weight: 500;
    font-size: 12px;
    margin-bottom: 6px;
`

export const TitleInfo = styled.p`
    color: black;
    font-weight: 600;
    font-size: 16px;
    opacity: 0.9;
`

export const SubSection = styled.div`
    padding: 8px;
    border: 1px solid #cccccc47;
    border-radius: 8px;
    margin-top: 12px;
    background: #00000003;
`

export const Nav = styled.nav`
    width: 50%;
    display: flex;
    z-index: 2;
    justify-content: space-evenly;
    align-content: left;
    flex: 1 1 auto;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    top: 10px;
    padding: 10px 20px;
    align-items: left;
    background: white;
    box-sizing: border-box;
    box-shadow: 2px 2px 2px 2px grey;
`

export const NavItem = styled.div`
    cursor: pointer;
    padding: 10px;

    padding: 5px;
    &:hover {
        box-sizing: border-box;
        box-shadow: 2px 2px 2px 2px #00000008;
        font-weight: bold;
    }
`

export const Accordion = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    padding-top: 50px;
    box-shadow: 0 1px 8px rgba(#000, 0.25);
`

export const AccordionContent = styled.div`
    overflow: hidden;
    height: 0px;
    position: relative;
    padding: 0 1.5em;
    box-shadow: inset 4px 0 0 0 $highlight-color,
        inset 0 3px 6px rgba(#000, 0.75);
    background: $dark-grey;
    background: linear-gradient(
        to bottom,
        rgba(68, 68, 68, 1) 0%,
        rgba(34, 34, 34, 1) 100%
    );
    color: $light-grey;
    transition: height $timing $ease;

    &:not(:last-of-type) {
        box-shadow: inset 0 -2px 2px rgba(#000, 0.25),
            inset 4px 0 0 0 $highlight-color, inset 0 3px 6px rgba(#000, 0.75);
    }
`

export const AccordionHeader = styled.div`
    padding: 1em 0;
`

export const AccordionBody = styled.div`
    line-height: 1.4em;
`

export const Label = styled.div`
    position: relative;
    display: block;
    padding: 1em;
    background: linear-gradient(
        to bottom,
        rgba(254, 254, 254, 1) 0%,
        rgba(209, 209, 209, 1) 50%,
        rgba(219, 219, 219, 1) 55%,
        rgba(226, 226, 226, 1) 100%
    );
    border-top: 1px solid #fff;
    border-bottom: 1px solid rgba(#000, 0.15);
    box-shadow: inset 0 2px 0 #fff;
    font-size: 1.5em;
    text-shadow: 0 1px 0 rgba(#fff, 0.75);
    color: $med-grey;
    cursor: pointer;
    transition: all $timing $ease;

    &:after {
        content: '+';
        position: absolute;
        right: 1em;
        width: 1em;
        height: 1em;
        color: $light-grey;
        text-align: center;
        border-radius: 50%;
        background: grey;
        box-shadow: inset 0 1px 6px rgba(#000, 0.5), 0 1px 0 #fff;
        text-shadow: 0 1px 0 rgba(#000, 0.75);
    }

    &:hover {
        color: green;
    }
`

export const TileItem = ({ title, value }) => {
    return (
        <Tile>
            <TitleTitle>{title}</TitleTitle>
            <TitleInfo>{value}</TitleInfo>
        </Tile>
    )
}

export const policySectionMenu = [
    // home,
    { name: 'Policy', to: '#policy', component: PolicySection },
    { name: 'Coverage', to: '#coverage', component: CoverageSection },
    { name: 'Insured', to: '#insured', component: InsuredSection },
    { name: 'Vehicles', to: '#vehicles', component: VehiclesSection },
    { name: 'Loss History', to: '#losshistory', component: LossHistorySection },
    { name: 'Drivers', to: '#drivers', component: DriversSection },
    { name: 'Documents', to: '#documents', component: DocumentsSection },
]

export const Row = styled.div`
    display: flex;
    align-items: center;
`

export const OverlayWrapper = styled(Row)`
    width: 100%;
    height: 100vh;
    padding: 24px;
    background: #0000003d;
    justify-content: center;
    overflow-y: scroll;
`
