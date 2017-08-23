import uuid from 'uuid/v4';

const KEY = 'linerUserId';

export const createUserId = () => {
    localStorage.setItem(KEY, uuid());
}

export const getUserId = () => {
   return localStorage.getItem(KEY)
}