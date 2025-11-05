export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  isNew?: boolean; // Flag to indicate if this is a newly created user
  isInvalid?: boolean; // Flag to indicate if the email is invalid
}

// DummyJSON API response interfaces
export interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
}

export interface DummyJsonResponse {
  users: DummyJsonUser[];
  total: number;
  skip: number;
  limit: number;
}
