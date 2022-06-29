import { useState } from 'react'

const useSearchPolicies = (val = '') => {
    const v = val
    const [state, setState] = useState({ inputValue: v, active: v === '' })
    const onChange = (e) => {
        const v2 = e.target.value
        setState({ active: v2 === '', inputValue: v2 })
    }

    const setActive = (a: boolean) => {
        setState({ ...state, active: a })
    }

    return { ...state, onChange, setActive }
}

export default useSearchPolicies
