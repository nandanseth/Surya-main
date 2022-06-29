import { Colors, transitionCss } from '../styles/styles'
import searchIcon from '../images/search-icon.png'
import styled from 'styled-components'
import useSearchPolicies from '../hooks/useSearchPolicies'

const Search = ({
    value,
    placeholder,
    style,
}: {
    value?: any
    placeholder?: string
    style?: any
}) => {
    const { onChange, inputValue } = useSearchPolicies(value)
    return (
        <Container style={{ ...style }}>
            <Icon src="search-icon.png" />
            <SearchInput
                onChange={onChange}
                placeholder={placeholder}
                value={inputValue}
            />
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
    max-width: 300px;
    min-width: 270px;
`

const SearchInput = styled.input`
    z-index: 0;
    font: inherit;
    width: 100%;
    font-size: 18px;
    background: ${Colors.paleBlue};
    mix-blend-mode: normal;
    border: 1px solid #97979700;
    box-sizing: border-box;
    border-radius: 8px 8px 0px 0px;
    padding: 8px;
    outline: none;
    padding-left: 26px;
    ${transitionCss}

    :focus {
        color: black;
        background: white;
        border: solid 1px ${Colors.purple};
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
    }

    ::placeholder {
        color: rgba(0, 0, 0, 0.21);
        font-weight: 300;
    }
`

export default Search
