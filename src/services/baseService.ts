import { Model, ModelStatic } from "sequelize";
import { ErrorApiResponse } from "../models/apiResponse";
import { MakeNullishOptional } from "sequelize/types/utils";
import { RESPONSE_MESSAGES } from "../constants/apiResponseData";
var inflection = require("inflection");

class BaseService<T extends Model> {
  private model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  getModelDisplayName() {
    return inflection.transform(this.model.name, [
      "underscore",
      "titleize",
      "capitalize",
    ]);
  }

  getNotFoundMessage() {
    return `${this.getModelDisplayName()} ${RESPONSE_MESSAGES.NOT_FOUND.toLocaleLowerCase()}`;
  }

  // find all
  async findAll(options = {}) {
    const { count: total, rows: data } = await this.model.findAndCountAll(
      options
    );

    return {
      total,
      data,
    };
  }

  // find one by id
  async findById(id: number, options = {}): Promise<T | null> {
    return await this.model.findByPk(id, options);
  }

  // find one by id and if fail throw error
  async findByIdOrFail(id: number, options = {}) {
    const data = await this.findById(id, options);

    if (!data) {
      throw ErrorApiResponse.NotFound(this.getNotFoundMessage());
    }

    return data;
  }

  //   find one by where
  async findOne(where = {}) {
    return await this.model.findOne({
      where,
    });
  }

  // find one by where if fail throw error
  async findOneOrFail(where = {}) {
    const data = await this.findOne(where);

    if (!data) {
      throw ErrorApiResponse.NotFound(this.getNotFoundMessage());
    }

    return data;
  }

  // create
  async create(
    createData: MakeNullishOptional<T["_creationAttributes"]>
  ): Promise<T> {
    const createdData = await this.model.create(createData);

    const data = await this.findByIdOrFail(createdData.get().id);

    return data;
  }

  // update
  async update(
    id: number,
    updateData: MakeNullishOptional<T["_creationAttributes"]>
  ): Promise<T> {
    const data = await this.findByIdOrFail(id);

    await data.update(updateData);
    data.save();

    return data;
  }

  // delete
  async delete(id: number) {
    const data = await this.findByIdOrFail(id);

    await data.destroy();
    data.save();

    return data;
  }
}

export default BaseService;
