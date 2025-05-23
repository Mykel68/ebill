import { Model } from "sequelize";

export interface UserRegistrationData {
  username: string;
  password: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface UserAttributes {
  user_id?: string;
  username: string;
  password_hash: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}
