import { CustomError } from '../../errors/CustomError';
import { User } from './user.model';

export const getUserService = async (id: string) => {
  if (!id) {
    throw new CustomError(404, 'user Not Found');
  }

  const result = await User.findById(id);
  return result;
};
