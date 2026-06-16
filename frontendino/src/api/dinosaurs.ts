import type { Dinosaur, DinosaurInput } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ApiError('Dinosaurus nebyl nalezen.', response.status);
    }

    throw new ApiError('API požadavek se nepodařilo dokončit.', response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function isNotFoundError(error: unknown) {
  return error instanceof ApiError && error.status === 404;
}

export function listDinosaurs() {
  return request<Dinosaur[]>('/dinosaurs');
}

export function getDinosaur(id: number) {
  return request<Dinosaur>(`/dinosaurs/${id}`);
}

export function createDinosaur(dinosaur: DinosaurInput) {
  return request<number>('/dinosaurs', {
    method: 'POST',
    body: JSON.stringify(dinosaur),
  });
}

export function updateDinosaur(id: number, dinosaur: DinosaurInput) {
  return request<void>(`/dinosaurs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dinosaur),
  });
}

export function deleteDinosaur(id: number) {
  return request<void>(`/dinosaurs/${id}`, {
    method: 'DELETE',
  });
}
