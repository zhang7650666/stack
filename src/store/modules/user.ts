interface UserDataProps {
  username?: string;
  id?: string;
  phoneNumber?: string;
  nickName?: string;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
  iat?: number;
  exp?: number;
  picture?: string;
  gender?: string;
}

interface UserProps {
  isLogin: boolean;
  token: string;
  data: UserDataProps;
}

export { UserProps, UserDataProps };

export default {
  state: {
    module: "user",
  },
};
