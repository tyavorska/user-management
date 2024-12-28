const API_BASE_URL = 'https://reqres.in/api';

const fetchData = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    return data;
  }

  return null;
};

export const registerUser = async (data: any) =>
  fetchData(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const loginUser = async (data: any) =>
  fetchData(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const getUsers = async (page: number) =>
  fetchData(`${API_BASE_URL}/users?page=${page}`);

export const createUser = async (data: any) =>
  fetchData(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const updateUser = async (id: number, data: any) =>
  fetchData(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const deleteUser = async (id: number) =>
  fetchData(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
