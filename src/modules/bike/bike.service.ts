import { QueryBuilder } from '../../builder/QueryBuilder';
import { IBike } from './bike.interface';
import { Bike } from './bike.model';

export const createBikeService = async (data: IBike) => {
  const result = await Bike.create(data);
  return result;
};

// Get all Bikes

export const getAllBikesService = async (query: Record<string, unknown>) => {
  const bikequeries = new QueryBuilder(Bike.find(), query);

  const result = await bikequeries.modelQuery;
  return result;
};

// update  Bike Service

export const updateBikeService = async (id: string, data: Partial<IBike>) => {
  const result = await Bike.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const deleteBikeService = async (id: string) => {
  const result = await Bike.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};
