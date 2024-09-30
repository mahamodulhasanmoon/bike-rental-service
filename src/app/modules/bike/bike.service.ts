import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';

import QueryBuilder from '../../builder/QueryBuilder';
import Bike from './bike.model';

// insert bike information data into database using mongoose
const createBikeIntoDB = async (payload: TBike) => {
  console.log(payload);
  const result = await Bike.create(payload);

  return result;
};

// get all bikes form database
const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(Bike.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;

  const meta = await bikeQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleBikeFromDB = async (id: string) => {
  const findBike = await Bike.findById(id);

  if (!findBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  return findBike;
};

// update bike from database
const updateBikeIntoDB = async (payload: Partial<TBike>, id: string) => {
  // check the requested update bike are available
  const findBike = await Bike.findById(id);

  if (!findBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  const result = await Bike.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

// delete bike from database
const deleteBikeFromDB = async (id: string) => {
  // check the requested delete bike are available
  const findBike = await Bike.findById(id);

  if (!findBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
  }

  const result = await Bike.findByIdAndDelete(id, { new: true });

  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
  getSingleBikeFromDB,
};
