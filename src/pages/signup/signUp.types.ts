export type FormikSignUp = {
    firstName: string;
    lastName: string;
    dob: Date;
    phone: string;
    email: string;
    password: string;
}

export type SignUpRequest = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    dob: Date,
    phone: string
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