import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { IUser } from '../types';

import { BASE_URL } from "../utils";

const authStore = (set: any, get: any) => ({
    allUsers: [],
    userProfile: {
        _ref: '',
        _id: '',
        _type: '',
        userName: '',
        image: '',
    },
    isLoggedIn: false,

    addUser: (user: IUser) => {
        set({ userProfile: user })
        get().fetchAllUsers()
        set({ isLoggedIn: true })
    },

    removeUser: () => {
        set({ userProfile: {
            _ref: '',
            _id: '',
            _type: '',
            userName: '',
            image: '',
        } })
        set({ isLoggedIn: false })
    },

    fetchAllUsers: async () => {
        const { data } = await axios.get(`${BASE_URL}/api/users`);
        set({ allUsers: data });
    }
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth',
    })
);

export default useAuthStore;