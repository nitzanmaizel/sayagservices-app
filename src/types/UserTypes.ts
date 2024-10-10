export interface IUser {
  _id?: string;
  email: string;
  name: string;
  picture?: string;
  isAdmin: boolean;
}

export interface RIUsersType {
  users: IUser[];
  limit: number;
  page: number;
  total: number;
}
