import getAuth from '@/getAuth';
import store from '@/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'; // Import useEffect for side effects

const AllOrder = () => {
    const router = useRouter();
    
    // Using useEffect to perform the redirection when the component mounts
    useEffect(() => {
        const state = store.getState(); // Get the current state from the Redux store
        const isLoggedIn = getAuth(state);
        
        if (!isLoggedIn) {
            router.push("/login");
        }
    }, []); // Empty dependency array to ensure the effect runs only once on component mount

    return (
        <div>allOrder page details</div>
    );
}

export default AllOrder;
