import { Op } from "sequelize";
import { IInclude } from "../types/query";
import models from "./../models/index";
var inflection = require("inflection");

function isPlural(str: string): boolean {
  return str === inflection.pluralize(str) ? true : false;
}

function mapInclude(str: string): IInclude | undefined {
  if (!str) return undefined;

  const [modelName, ...rest] = str.split(".");
  const toModelNameSingular = inflection.transform(modelName, [
    "singularize",
    "classify",
  ]);

  const model = models[toModelNameSingular].model;

  const res: IInclude = {
    model: model,
    as: modelName || undefined,
    through: isPlural(modelName) ? { attributes: [] } : undefined,
    required: false,
  };

  const restInclude = mapInclude(rest.join("."));

  if (restInclude) {
    res.include = [restInclude];
  }

  return res;
}

class QueryHelper {
  // Process query filter
  private processQueryFilter(obj: any, allowed: any): any {
    if (!obj || typeof obj !== "object" || allowed.size === 0) return {};

    const cloned: any = {};

    Object.entries(obj).forEach(([key, value]) => {
      if (allowed.has(key)) {
        cloned[key] =
          value === "true" ? true : value === "false" ? false : value;
      }
    });

    return cloned;
  }

  // Process query sort
  private processQuerySort(sortByCol: any, allowed: Set<string>): any {
    if (!sortByCol || typeof sortByCol !== "string" || allowed.size === 0)
      return undefined;

    let col = sortByCol.trim(),
      dir = "ASC";

    if (allowed.has(col)) {
      return [[col, dir]];
    }

    if (col.startsWith("-") && allowed.has(col.slice(1))) {
      return [[col.slice(1), "DESC"]];
    }

    return undefined;
  }

  // Process query search
  private processQuerySearch(searchTerm: string, allowed: Set<string>): any {
    if (!searchTerm || typeof searchTerm !== "string" || allowed.size === 0)
      return {};

    const where: any = {};
    [...allowed].forEach((col) => {
      where[col] = { [Op.like]: `%${searchTerm.toLowerCase()}%` };
    });

    return { [Op.or]: where };
  }

  // Process query include
  private processQueryInclude(
    includes: string[] | undefined,
    allowed: Set<string>
  ): IInclude[] {
    if (!includes || !Array.isArray(includes) || includes.length === 0)
      return [];

    return includes
      .filter((modelName) => allowed.has(modelName))
      .map((modelName) => mapInclude(modelName))
      .filter((include) => !!include) as IInclude[];
  }

  // Process query params
  processQueryParams(query: any, allowed: any = {}) {
    const pageSize = (query.page && query.page.size) || 15;
    const pageNumber = (query.page && query.page.number) || 1;

    const limit = parseInt(`${pageSize}`, 10);
    const offset = (parseInt(`${pageNumber}`, 10) - 1) * limit;

    return {
      where: {
        ...this.processQueryFilter(query.filter, new Set(allowed.filter || [])),
        ...this.processQuerySearch(query.search, new Set(allowed.search || [])),
      },
      order: this.processQuerySort(query.sort, new Set(allowed.sort || [])),
      include: this.processQueryInclude(
        query.include && query.include.split(","),
        new Set(allowed.include || [])
      ),
      limit,
      offset,
    };
  }
}

export default new QueryHelper();
