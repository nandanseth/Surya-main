import React from 'react';
import { useMoralis } from 'react-moralis';
import PremiumCharts from './PremiumCharts'; // Import the charts component

const Tables = () => {
    const { user } = useMoralis();

    // Check if the user is authorized to view this component
    const isAuthorizedUser = user && user.get('username') === 'kushdave'; // Replace 'specificRole' with the actual role

    if (!isAuthorizedUser) {
        return <div>You do not have permission to view this page.</div>;
    }

    return (
        <div>
            <h1>Premium Charts</h1>
            <PremiumCharts />
        </div>
    );
};

export default Tables; 