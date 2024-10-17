import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/getApi';
import Card from '../components/specific/Home/Card';

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setProfile(response.user);
                console.log('response',response);
                
            } catch (err) {
                setError(err.message || 'Failed to fetch profile'); // Handle error
            } finally {
                setLoading(false); // Set loading to false regardless of success or error
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    return (
        <Card profile={profile} />
    );
};

export default Home;
