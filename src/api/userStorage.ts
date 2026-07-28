import type { User } from '../types/user';

const USER_KEY = 'user';
const SIMULATED_DELAY_MS = 400;

const emptyUser: User = { name: '', email: '', description: '', image: '' };

const readUser = (): User | null => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
};

const saveUser = (user: User) => localStorage.setItem(USER_KEY, JSON.stringify(user));

const delay = <T>(value: T): Promise<T> => new Promise((resolve) => {
  setTimeout(() => resolve(value), SIMULATED_DELAY_MS);
});

export const getUser = (): Promise<User | null> => delay(readUser());

export const createUser = (user: Partial<User>): Promise<User> => {
  const newUser = { ...emptyUser, ...user };
  saveUser(newUser);
  return delay(newUser);
};

export const updateUser = (user: User): Promise<User> => {
  saveUser(user);
  return delay(user);
};

export const clearUser = () => localStorage.removeItem(USER_KEY);
