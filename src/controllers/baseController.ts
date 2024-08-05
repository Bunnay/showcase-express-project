import { Request, Response } from "express";
import { ApiResponse } from "../utils/apiResponseBuilder";
import { RESPONSE_MESSAGES } from "../constants/apiResponseData";
import Validator from "../validation/validator";
import BaseService from "../services/baseService";
import QueryHelper from "../utils/queryHelper";
import { Model } from "sequelize";
import { ErrorApiResponse } from "../models/apiResponse";
const validator = new Validator();

class BaseController<T extends Model> {
  protected service: BaseService<T>;
  protected create_rules = {};
  protected update_rules = {};
  protected allowedQueryFields = {};

  constructor(service: BaseService<T>) {
    this.service = service;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Get all
  public async getAll(req: Request, res: Response) {
    try {
      const { total, data } = await this.service.findAll(
        QueryHelper.processQueryParams(req.query, this.allowedQueryFields)
      );

      const successResponse = new ApiResponse<T[]>()
        .withData(data)
        .withMessage(RESPONSE_MESSAGES.SUCCESS)
        .withPagination(req.query, total)
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }

  // Get by id
  public async getById(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);

      const data = await this.service.findByIdOrFail(
        id,
        QueryHelper.processQueryParams(req.query, this.allowedQueryFields)
      );

      const successResponse = new ApiResponse<T>()
        .withData(data)
        .withMessage(RESPONSE_MESSAGES.SUCCESS)
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }

  // Create
  public async create(req: Request, res: Response) {
    try {
      const createData = await validator.validate(req.body, this.create_rules);

      const data = await this.service.create(createData);

      const successResponse = new ApiResponse<T>()
        .withData(data)
        .withMessage(
          RESPONSE_MESSAGES.CREATED(this.service.getModelDisplayName())
        )
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }

  // Update
  public async update(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);

      const updateData = await validator.validate(
        req.body,
        validator.excludeUniqueIdToRules(this.update_rules, id)
      );

      const data = await this.service.update(id, updateData);

      const successResponse = new ApiResponse<T>()
        .withData(data)
        .withMessage(
          RESPONSE_MESSAGES.UPDATED(this.service.getModelDisplayName())
        )
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }

  // Delete
  public async delete(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);

      await this.service.delete(id);

      const successResponse = new ApiResponse<T>()
        .withMessage(
          RESPONSE_MESSAGES.DELETED(this.service.getModelDisplayName())
        )
        .BuildSuccessResponse();

      res.json(successResponse);
    } catch (error) {
      ErrorApiResponse.handleError(error, res);
    }
  }
}

export default BaseController;
