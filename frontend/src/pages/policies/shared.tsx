import styled from "styled-components";

export const Flex = styled.div`
    flex-flow: row wrap;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 6px auto;
    align-items: flex-start;
`;

export const Section = styled.div`
    margin-top: 12px;
    margin-bottom: 12px;
    width: 100%;
`;

export const Title = styled.div`
    font-size: 20px;
    color: #000000;
    margin-right: auto;
    font-weight: 600;
`;

export const Tile = styled.div`
    padding: 12px 8px;
    border-radius: 8px;
    background: #eceeee;
    display: flex;
    flex-direction: column;
    margin: 8px;
    margin-left: 0px;
    min-width: 120px;
    min-height: 64px;
    align-items: center;
`;

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
    opacity: .9;
`;

export const SubSection = styled.div`
    padding: 8px;
    border: 1px solid #cccccc47;
    border-radius: 8px;
    margin-top: 12px;
    background: #00000003;
`;

export const TileItem = ({ title, value}) => {
    return (<Tile>
    <TitleTitle>{title}</TitleTitle>
        <TitleInfo>{value}</TitleInfo>
    </Tile>);
}