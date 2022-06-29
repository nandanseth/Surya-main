import styled from 'styled-components'

const FormHeader = ({ number, title }) => (
    <SectionHeader>
        <SectionHeaderNum>{number}</SectionHeaderNum>
        <SectionHeaderTitle>{title}</SectionHeaderTitle>
    </SectionHeader>
)

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
`

const SectionHeaderNum = styled.div`
    padding: 6px 12px;
    text-align: center;
    background: rgba(58, 86, 100, 0.0984484);
    border-radius: 27px;
    margin-right: 15px;
    font-size: 12px;
`

const SectionHeaderTitle = styled.h1`
    font-weight: 600;
    font-size: 18px;
    letter-spacing: -1px;
    color: #000000;
`

export default FormHeader
