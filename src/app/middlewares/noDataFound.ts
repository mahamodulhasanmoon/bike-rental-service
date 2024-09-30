import {  Response } from 'express';
import httpStatus from 'http-status';

const noDataFound = <T>(res: Response, data: T[]) => {
  if (!data || data.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }else {
    return false
  }
};

export default noDataFound; 
