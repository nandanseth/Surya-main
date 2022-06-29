import axios from 'axios'
import React, { useEffect, useState } from 'react'

const urls = {
    getAllPoliciesUrl:
        'https://policy-api-dot-delta-pagoda-337917.ue.r.appspot.com/policies/',
    createPoliciesUrl:
        'https://policy-api-dot-delta-pagoda-337917.ue.r.appspot.com/policies/',
}

export const UrlContext = React.createContext(null)

export default function UrlProvider({ children }) {
    const [state, setState] = useState(urls)
    return <UrlContext.Provider value={state}>{children}</UrlContext.Provider>
}
