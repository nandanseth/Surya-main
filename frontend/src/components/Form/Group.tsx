import { NewSelect } from './Select'
import { StyledInput } from './Input'
import { transitionCss } from '../../styles/styles'
import Label from './Label'
import styled from 'styled-components'

/**
 * A wrapper component around an `Input`/`Label` pair that causes the label to transition between being on top of the
 * input and above the input based on focus state and value existence.
 *
 * Usage:
 * ```
 * <FloatingLabelGroup>
 *   <Input id="my-id" placeholder="placeholder" />
 *   <Label htmlFor="my-id">My Label</Label> // 'htmlFor' is required
 * </FloatingLabelGroup>
 * ```
 *
 * Note:
 * - The `<Input>` must come before the `<Label>`
 * - `id` and `placeholder` are required on the `<Input>`
 *   - If no placeholder is desired, set its value to `none` and it will remain hidden
 * - `htmlFor` is required on the `<Label>`
 */
function FloatingLabelGroup({ children }) {
    return <Group>{children}</Group>
}

const Group = styled.div`
    display: flex;
    flex-flow: column-reverse;
    min-width: 0;
    position: relative;

    ${Label} {
        overflow: hidden;
        text-overflow: ellipsis;
        transform-origin: left bottom;
        transform: translateY(1.5rem);
        ${transitionCss}
        white-space: nowrap;
    }

    ${StyledInput} {
        &:placeholder-shown ~ ${Label} {
            cursor: text;
        }

        &::placeholder {
            opacity: 0;
            transition: opacity 0.15s ease-in;
        }

        &:not([placeholder='none']):focus::placeholder {
            opacity: 1;
        }

        &:focus ~ ${Label}, &:not(:placeholder-shown) ~ ${Label} {
            cursor: auto;
            font-size: 0.75rem;
            transform: translateY(0.25rem);
        }
    }

    ${NewSelect} {
        & + ${Label} {
            cursor: pointer;
            pointer-events: none;
        }

        &::placeholder {
            opacity: 0;
            transition: opacity 0.15s ease-in;
        }

        &:focus::placeholder {
            opacity: 1;
        }

        &:focus + ${Label}, &:not([data-value='none']) + ${Label} {
            cursor: auto;
            font-size: 0.75rem;
            transform: translateY(0.25rem);
        }
    }
`

export default FloatingLabelGroup
