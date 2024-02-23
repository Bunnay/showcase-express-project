import { Op } from "sequelize";
import { Include, SQLQuery } from "../types/query";

function processQueryFilter(obj: any, allowed: any): any {
  if (!obj || typeof obj !== "object" || allowed.size === 0) return {};

  const cloned: any = { ...obj };

  for (const [k, v] of Object.entries(cloned)) {
    if (!allowed.has(k)) {
      delete cloned[k];
      continue;
    }

    if (v === "true") {
      cloned[k] = true;
    }

    if (v === "false") {
      cloned[k] = false;
    }
  }

  return cloned;
}

function processQuerySort(sortByCol: any, allowed: any): any {
  if (!sortByCol || typeof sortByCol !== "string" || allowed.size === 0)
    return undefined;

  let col = sortByCol.trim(),
    dir = "ASC";

  if (allowed.has(col)) {
    return [[col, dir]];
  }

  if (col[0] === "-") {
    dir = "DESC";
    col = col.slice(1);

    if (col && allowed.has(col)) {
      return [[col, dir]];
    }
  }

  return undefined;
}

function processQuerySearch(searchTerm: string, allowed: any): any {
  if (!searchTerm || typeof searchTerm !== "string" || allowed.size === 0)
    return {};

  searchTerm = searchTerm.trim().toLowerCase();

  const where: any = {};

  for (const col of [...allowed]) {
    where[col] = {
      [Op.like]: `%${searchTerm}%`,
    };
  }

  return {
    [Op.or]: where,
  };
}

function mapInclude(str: string): Include | undefined {
  if (!str) return undefined;

  const [modelName, ...rest] = str.split(".");

  const res: Include = {
    model: customModel[modelName],
    as: modelName ? modelName : undefined,
    through: associationHandler(modelName),
  };

  const restInclude = mapInclude(rest.join("."));

  if (restInclude) {
    res.include = [restInclude];
  }

  return res;
}

function processQueryInclude(
  includes: string[] | undefined,
  allowed: any
): Include[] {
  if (!includes || !(includes instanceof Array) || includes.length === 0)
    return [];

  const res: Include[] = [];

  for (const modelName of includes) {
    if (!allowed.has(modelName)) continue;
    const include = mapInclude(modelName);
    if (include) {
      res.push(include);
    }
  }

  return res;
}

export function processQueryParams(query: any, allowed: any = {}): SQLQuery {
  const pageSize = (query.page && query.page.size) || 15;
  const pageNumber = (query.page && query.page.number) || 1;

  const limit = parseInt(`${pageSize}`, 10);
  const offset = (parseInt(`${pageNumber}`, 10) - 1) * limit;

  const res: SQLQuery = {
    where: {
      ...processQueryFilter(query.filter, new Set(allowed.filter || [])),
      ...processQuerySearch(query.search, new Set(allowed.search || [])),
    },
    order: processQuerySort(query.sort, new Set(allowed.sort || [])),
    include: processQueryInclude(
      query.include && query.include.split(","),
      new Set(allowed.include || [])
    ),
    limit,
    offset,
  };

  return res;
}
