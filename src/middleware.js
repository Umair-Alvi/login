import { NextResponse } from 'next/server';
import getAuth from './getAuth';
import store from './store'; // Path to your Redux store

const middleware = async (request) => {
    const state = store.getState(); // Get the current state from the Redux store
    const isLoggedIn = getAuth(state); // Call getAuth with the Redux state

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/allOrder1"
}

export default middleware;
