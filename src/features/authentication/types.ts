export interface LoginProps {
  email: string;
  password: string;
}
export interface SignupProps extends LoginProps {
  fullName: string;
}

export interface SignupFormProps extends SignupProps {
  passwordConfirm: string;
}

export interface UpdateUser {
  password?: string;
  data?: {
    fullName?: string;
    avatar?: File | null;
  };
}
