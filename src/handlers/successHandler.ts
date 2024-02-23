import {
  IBaseResponseData,
  IPaginateResponseData,
  IResponseData,
} from "../types/api";
import { IPagination } from "../types/pagination";
import { IQuery } from "../types/query";
import ActionSuccessMessageHandler from "./actionSuccessMessageHandler";
const actionSuccessMessageHandler = new ActionSuccessMessageHandler();

// Method to format pagination
function pagination(query: Partial<IQuery>, total: number) {
  const pageSize = (query.page && query.page.size) || 15;
  const pageNumber = (query.page && query.page.number) || 1;

  const limit = parseInt(`${pageSize}`, 10);
  const totalPages = Math.ceil(total / limit);

  const paginate: IPagination = {
    current_page: parseInt(`${pageNumber}`, 10),
    last_page: totalPages,
    page_size: limit,
    total: total,
  };

  return paginate;
}

class SuccessHandler {
  // Get all data with pagination
  getAllData<T>(data: T): IResponseData<T> {
    return {
      success: true,
      message: actionSuccessMessageHandler.message,
      data: data,
    };
  }

  getAllDataWithPagination<T>(
    data: T,
    query: Partial<IQuery>,
    total: number
  ): IPaginateResponseData<T> {
    return {
      success: true,
      message: actionSuccessMessageHandler.message,
      data: data,
      pagination: pagination(query, total),
    };
  }

  // Get one data
  getOneData<T>(data: T): IResponseData<T> {
    return {
      success: true,
      message: actionSuccessMessageHandler.message,
      data: data,
    };
  }

  // Get data after created
  getCreatedData<T>(data: T, name?: string): IResponseData<T> {
    return {
      success: true,
      message: ActionSuccessMessageHandler.create(name),
      data: data,
    };
  }

  // Get data after updated
  getUpdatedData<T>(data: T, name?: string): IResponseData<T> {
    return {
      success: true,
      message: ActionSuccessMessageHandler.update(name),
      data: data,
    };
  }

  // Get data after deleted
  getDeletedData(name?: string): IBaseResponseData {
    return {
      success: true,
      message: ActionSuccessMessageHandler.delete(name),
    };
  }

  // Get data after assigned
  getAssignedData(name?: string): IBaseResponseData {
    return {
      success: true,
      message: ActionSuccessMessageHandler.assign(name),
    };
  }

  // Get data after blocked
  getBlockedData(name?: string): IBaseResponseData {
    return {
      success: true,
      message: ActionSuccessMessageHandler.block(name),
    };
  }

  // Get data after activated
  getActivatedData(name?: string): IBaseResponseData {
    return {
      success: true,
      message: ActionSuccessMessageHandler.activate(name),
    };
  }

  getLoginData<T>(data: T, name?: string): IResponseData<T> {
    return {
      success: true,
      message: "Login successfully!",
      data: data,
    };
  }

  getRefreshData<T>(data: T, name?: string): IResponseData<T> {
    return {
      success: true,
      message: "Refresh successfully!",
      data: data,
    };
  }
}

export default new SuccessHandler();
