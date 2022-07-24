import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { IUser } from '../types';

import { BASE_URL } from "../utils";

const authStore = (set: any) => ({
    allUsers: [],
    userProfile: null,

    addUser: (user: IUser) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),

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