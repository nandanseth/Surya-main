import styled from 'styled-components'

const PolicyTitle = ({ id }) => (
    <Container>
        <H1> Policy: </H1>
        <Span>{id}</Span>
    </Container>
)

const Container = styled.div`
    z-index: 1;
    width: auto;
    position: relative;

    :after {
        z-index: -1;
        top: -10px;
        background: rgba(89, 195, 179, 0.26);
        width: 104%;
        content: ' ';
        display: block;
        height: 9px;
        border-radius: 3px;
        position: relative;
    }
`

const H1 = styled.h1`
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
    margin-right: 8px;
    display: inline-block;
`

const Span = styled.span`
    font-style: italic;
    font-weight: 300;
    font-size: 17px;
    line-height: 21px;
    color: #000000;
`

export default PolicyTitle
