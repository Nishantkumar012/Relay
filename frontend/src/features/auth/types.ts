export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};
