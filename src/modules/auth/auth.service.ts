import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

export const createUserService = async(payload:IUser)=>{
    const result = await User.create(payload)
    return result
}