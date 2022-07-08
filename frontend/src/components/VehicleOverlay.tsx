import { Close } from './Buttons'
import { Colors } from '../styles/styles'
import carIcon from '../images/car icon.png'
import OverlayWrapper from './Overlay'
import styled from 'styled-components'

const items = [
    { title: 'title', info: 'Info Here' },
    { title: 'title', info: 'Info Here' },
    { title: 'title', info: 'Info Here' },
    { title: 'title', info: 'Info Here' },
    { title: 'title', info: 'Info Here' },
]

const cartitle = 'LINCOLN- TOWN CAR'

const vinText = '1LNHM83W14Y685313'
const year = '2004'

const VehicleOverlay = ({
    options = {},
    vehicle,
    // mainInfo = '',
    // subInfo = '',
    // sideInfo = '',
    close,
    show,
}) => (
    // <OverlayWrapper show={show}>
    //     <Overlay>
    //         <Container>
    //             <Sidebar>
    //                 <SideInfo text="INFO HERE" type="type" />
    //                 <SideInfo text="INFO HERE" type="type" />
    //                 <SideInfo text="INFO HERE" type="type" />
    //                 <SideInfo text="INFO HERE" type="type" />
    //                 <SideInfo text="INFO HERE" type="type" />
    //                 <SideInfo text="INFO HERE" type="type" />
    //                 <SideInfo text="INFO HERE" type="type" />
    //                 <SideInfo text="INFO HERE" type="type" />
    //                 <SideInfo text="INFO HERE" type="type" />
    //             </Sidebar>
    //             <Main>
    //                 <HeaderContainer>
    //                     <Frame>
    //                         <FrameImg src={carIcon} />
    //                     </Frame>

    //                     <HeaderInfo>
    //                         <CarTitle>{cartitle}</CarTitle>
    //                         <CarVin>{vinText}</CarVin>
    //                         <CarYear>{year}</CarYear>
    //                     </HeaderInfo>
    //                 </HeaderContainer>

    //                 <StyledDiv>
    //                     <BasicInformation>Basic Information</BasicInformation>
    //                     <Items>
    //                         {items.map(({ title, info }, i) => (
    //                             <VehicleInfo
    //                                 info={info}
    //                                 key={`${title} + ${i}`}
    //                                 title={title}
    //                             />
    //                         ))}
    //                     </Items>
    //                 </StyledDiv>
    //                 <Close
    //                     onClick={close}
    //                     style={{ alignSelf: 'flex-end', marginTop: 'auto' }}
    //                 >
    //                     Close
    //                 </Close>
    //             </Main>
    //         </Container>
    //     </Overlay>
    // </OverlayWrapper>

    <OverlayWrapper show={show}>
        <Overlay>
            <Container>
                <Sidebar>
                    <SideInfo text={vehicle.category} type="Category" />
                    <SideInfo text={vehicle.state} type="State" />
                    <SideInfo text={vehicle.classification} type="Classification" />
                    <SideInfo text={vehicle.seating} type="Seating" />
                    <SideInfo text={vehicle.plateNumber} type="Plate Number" />
                    <SideInfo text={vehicle.garageAddress1} type="Address" />
                    <SideInfo text={vehicle.fuelType} type="Fuel Type" />
                    <SideInfo text={vehicle.zoneCode} type="Zone Code" />
                    <SideInfo text={vehicle.rateClassCode} type="Class Code" />
                </Sidebar>
                <Main>
                    <HeaderContainer>
                        <Frame>
                            <FrameImg src={carIcon} />
                        </Frame>

                        <HeaderInfo>
                            <CarTitle>{vehicle.make} {vehicle.model}</CarTitle>
                            <CarVin>{vehicle.vin}</CarVin>
                            <CarYear>{vehicle.modelYear}</CarYear>
                        </HeaderInfo>
                    </HeaderContainer>

                    <StyledDiv>
                        <BasicInformation>Basic Information</BasicInformation>
                        <Items>
                            <VehicleInfo
                                info={vehicle.fleet}
                                title="Fleet"
                            />
                            <VehicleInfo
                                info={vehicle.fleet}
                                title="Fleet"
                            />
                            <VehicleInfo
                                info={vehicle.fleet}
                                title="Fleet"
                            />
                            <VehicleInfo
                                info={vehicle.fleet}
                                title="Fleet"
                            />
                            <VehicleInfo
                                info={vehicle.fleet}
                                title="Fleet"
                            />
                        </Items>
                    </StyledDiv>
                    <Close
                        onClick={close}
                        style={{ alignSelf: 'flex-end', marginTop: 'auto' }}
                    >
                        Close
                    </Close>
                </Main>
            </Container>
        </Overlay>
    </OverlayWrapper>
)

const StyledDiv = styled.div`
    padding: 4px;
`

const SideInfo = ({ type, text }) => (
    <Flex>
        <SideBarInfoType>{type}</SideBarInfoType>
        <SideBarInfoText>{text}</SideBarInfoText>
    </Flex>
)

const VehicleInfo = ({ title, info }) => (
    <Info>
        <InfoType>{title}</InfoType>
        <InfoText>{info}</InfoText>
    </Info>
)

const Overlay = styled.div`
    z-index: 5;
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.560561);
    display: flex;
    justify-content: center;
    overflow-y; scroll;
`

const Container = styled.div`
    max-width: 1200px;
    padding: 14px;
    box-sizing: border-box;
    display: flex;
    width: 70%;
    margin: auto;
    background-color: white;
    z-index: 4;
    border: solid 1px #00000012;
    box-shadow: 2px 2px 0px #ffffff6b;
`

const Sidebar = styled.div`
    background: #f8fdff;
    border-radius: 3px;
    height: 100%;
    min-width: 284px;
    max-width: 284px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: flex-start;
    padding: 20px;
    padding-top: 40px;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    flex: 1 1 auto;
`

const Items = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    width: 100%;
    padding: 4px;
    margin-top: 4px;
`

const SideBarInfoType = styled.div`
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: ${Colors.text};
`

const SideBarInfoText = styled.div`
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #000000;
    margin-bottom: 12px;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-bottom: 10px;
    width: 33.33%;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2px;
`

const InfoType = styled.div`
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: ${Colors.text};
    padding: 1px;
    background: rgba(58, 86, 100, 0.17);
    mix-blend-mode: normal;
    border-radius: 1px;
    align-self: flex-start;
    margin-bottom: 5px;
`

const InfoText = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */
    color: #000000;
`

const BasicInformation = styled.h2`
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
`

// The header

const HeaderContainer = styled.div`
    padding: 4px;
    display: flex;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`

// The image of the header
const Frame = styled.div`
    background: #fbfbfb;
    border-radius: 3px;
    padding: 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const FrameImg = styled.img`
    width: 100px;
    height: auto;
    object-fit: contain;
    opacity: 0.9;
    display: block;
`

const HeaderInfo = styled.div`
    display: flex;
    flex: 1 1 auto;
    padding: 12px 20px;
    flex-direction: column;
`

const CarTitle = styled.h1`
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
    color: #000000;
    margin-bottom: 8px;
`

const CarVin = styled.h2`
    font-weight: 500;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.22);
    margin-bottom: 8px;
`

const CarYear = styled.h3`
    font-weight: 400;
    font-size: 14px;
    color: #10b6eb;
`

export default VehicleOverlay
