export type SignInFormik = {
  email: string;
  password: string;
}

export type SignResponse = {
  token: {
    accessToken: string
    apiKey: string,
    expiresIn: string
  },
  user: {
    dob: string,
    phone: string,
    lastName: string,
    firstName: string,
    email: string,
    id: string,
    createdAt: string
  }
  message?: string;
}