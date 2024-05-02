import getAuth from '@/getAuth';
import store from '@/store';
import { Router, useRouter } from 'next/router';
import React from 'react'

const allOrder = () => {
    const state = store.getState(); // Get the current state from the Redux store
    const isLoggedIn = getAuth(state);
    const router = useRouter();
    if (!isLoggedIn) {
        router.push("/login");
    }
  return (
    <div>allOrder page details  </div>
  )
}

export default allOrder