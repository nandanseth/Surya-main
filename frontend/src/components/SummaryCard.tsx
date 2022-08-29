import { Colors } from '../styles/styles'
import styled from 'styled-components'

const Card = ({ title: summaryTitle, subtitle: subTitle, fields }) => (
    <Container>
        <Title>{summaryTitle}</Title>
        <Info>
            {subTitle && <Subtitle>{subTitle}</Subtitle>}

            <Items>
                {fields?.map(({ subtitle, title }) => (
                    <Field
                        key={subtitle + title}
                        subtitle={subtitle}
                        title={title}
                    />
                ))}
            </Items>
        </Info>
    </Container>
)

const Field = ({ subtitle, title }) => (
    <Item>
        <ItemSub>{subtitle}</ItemSub>
        <ItemText>{title}</ItemText>
    </Item>
)

const Container = styled.div`
    background: #f7f8f9;
    border: 1px solid rgba(151, 151, 151, 0.154229);
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.02);
    padding: 8px 6px;
    margin-top: 12px;
    margin-bottom: 12px;
`

const Title = styled.h2`
    display: block;
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: ${Colors.text};
`

const Info = styled.div`
    border-radius: 5px;
    display: block;
    width: 100%;
    margin-top: 8px;
    background: white;
    padding: 8px 4px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
`

const Subtitle = styled.div`
    text-align: center;
    padding: 4px 8px;
    font-weight: 600;
    font-size: 12px;
    color: rgba(58, 86, 100, 0.38);
    background: rgba(58, 86, 100, 0.07);
    border-radius: 3px;
    display: initial;
`

const Items = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    width: 100%;
    padding: 4px;
    margin-top: 4px;
`

const Item = styled.div`
    width: auto;
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-direction: column;
    min-width: 33%;
    padding: 2px 0;
    margin-top: 12px;
`

const ItemSub = styled.div`
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: ${Colors.text};
    opacity: 0.4;
    margin-bottom: 5px;
`

const ItemText = styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: ${Colors.text};
    align-self: end;
    margin-top: 0px;
    padding-bottom: 2px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`

export default Card
