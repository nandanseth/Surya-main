import { Colors, transitionCss } from '../styles/styles'
import searchIcon from '../images/search-icon.png'
import styled from 'styled-components'

const Search = ({
    value,
    placeholder,
    style,
    onChange,
    clear,
}: {
    value?: any
    placeholder?: string
    style?: any
    onChange: any
    clear: any
}) => {
    const isActive = value.length >= 1
    return (
        <Container style={{ ...style }}>
            <Icon src={searchIcon} />
            <SearchInput
                onChange={onChange}
                placeholder={placeholder}
                value={value}
            />
            {isActive && <Exit onClick={clear}>X</Exit>}
        </Container>
    )
}

export const GenericSearch = ({
    value,
    placeholder,
    style,
    onChange,
}: {
    value?: any
    placeholder?: string
    style?: any
    onChange?: any
}) => (
    <Container style={{ ...style }}>
        <Icon src={searchIcon} />
        <SearchInput
            onChange={onChange}
            placeholder={placeholder}
            value={value}
        />
    </Container>
)

const Icon = styled.img`
    z-index: 1;
    width: 14px;
    height: 16px;
    object-fit: contain;
    top: 12px;
    left: 8px;
    position: absolute;
`

const Container = styled.div`
    position: relative;
    width: auto;
    margin-left: auto;
`

const SearchInput = styled.input`
    z-index: 0;
    font: inherit;
    width: 100%;
    font-size: 18px;
    background: #f7f7f7;
    mix-blend-mode: normal;
    border: 2px solid #97979700;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 8px;
    padding-right: 40px;
    outline: none;
    padding-left: 26px;

    border: solid 2px #0000000d;
    color: ${Colors.black};
    font-weight: 500;

    ${transitionCss}

    &:focus {
        ${Colors.electricBlue};
        background: white;
        border: solid 2px ${Colors.electricBlue};
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
    }

    ::placeholder {
        color: rgba(0, 0, 0, 0.31);
        font-weight: 400;
    }
`

const Exit = styled.div`
    position: absolute;
    top: 10px;
    right: 6px;
    height: 24px;
    width: 24px;
    border-radius: 32px;
    background: #0000001c;
    color: #00000052;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
`

export default Search
