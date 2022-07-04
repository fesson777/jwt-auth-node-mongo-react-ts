import { AxiosResponse } from 'axios'
import $api from '../http'
import { IUser } from '../models/response/IUser'

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users')
  }
  static async deleteUser(email: string): Promise<AxiosResponse<IUser[]>> {
    return $api.delete('/users')
  }
}
