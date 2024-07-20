import userTypeEnum from '@/enums/userTypeEnum';
import { keys, storage } from './storageService';
import backendApiService from './backendApiService';
import axios from 'axios';

const AUTH_USER_KEY = keys.AUTH_USER;
const EXPIRES_AFTER = 1000 * 60 * 60; // 1 hour

const saveAuthData = ({ authUser }) => {
    const { id, name, surname, username, type, profile_picture_key, status } = authUser;

    storage.set(
        AUTH_USER_KEY,
        JSON.stringify({
            id,
            name,
            surname,
            username,
            type,
            profile_picture_key,
            status,
            expires: Date.now() + EXPIRES_AFTER,
        })
    );
};

export const deleteAuthData = () => storage.delete(AUTH_USER_KEY);

/**
 * @returns {{id:string, name:string, surname:string, username:string, type:string, profile_picture_key:string, expires:number}}
 */
export const getAuthData = () => JSON.parse(storage.get(AUTH_USER_KEY));

export const isAuthUserDemos = () => getAuthData().type === userTypeEnum.DEMOS;
export const isAuthUserAdmin = () => getAuthData().username === 'admin';

export const fetchAuthData = async () =>
    await backendApiService.post({ url: '/auth/me' });

/**
 * @param {Object} credentials
 * @param {string} credentials.username
 * @param {string} credentials.password
 */


export const loginWithGoogle = async (code) => {
    try {
        const response = await axios.post(
            process.env.VUE_APP_API_URL + '/google/auth',
            null,
            {
                headers: {
                    Authorization: code,
                },
                withCredentials: true,
            }
        );
        saveAuthData(response.data.data);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const login = async ({ username, password }) => {
    const res = await fetch(`${process.env.VUE_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });

    const resObj = await res.json();
    if (!res.ok) {
        throw new Error(resObj.message);
    }

    saveAuthData(resObj.data);
    return true;
};

export const logout = async () => {
    const res = await backendApiService.post({ url: '/auth/logout' });

    if (!res.ok) {
        return false;
    }
    deleteAuthData();

    return true;
};

export const userStatus = async (id) => {
    if (!id) {
        return false;
    }
    const res = await fetch(`${process.env.VUE_APP_API_URL}/auth/status/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
        return false;
    }

    const resObj = await res.json();
    return resObj?.data[0]?.status;
};