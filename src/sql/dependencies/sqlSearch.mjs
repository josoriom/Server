import { runQuery } from './runQuery.mjs';

export const sqlSearch = async (table, options = {}) => {
  let {
    parametro = 'id',
    valor = 'all',
    operator = '=',
    orderBy = '',
    columns = [],
  } = options;
  if (orderBy != '') orderBy = `ORDER BY ${orderBy}`;
  if (!columns.length) {
    if (valor === 'all') {
      const result = await runQuery(`SELECT * FROM ${table} ${orderBy}`);
      return result;
    } else {
      const result = await runQuery(
        `SELECT * FROM ${table} WHERE ${parametro} ${operator} ${valor} ${orderBy}`,
      );
      return result;
    }
  } else {
    let cols = '';
    for (const col of columns) {
      cols += `${col},`;
    }
    cols = cols.substring(0, cols.length - 1);
    if (valor === 'all') {
      const result = await runQuery(`SELECT ${cols} FROM ${table} ${orderBy}`);
      return result;
    } else {
      const result = await runQuery(
        `SELECT ${cols} FROM ${table} WHERE ${parametro} ${operator} ${valor} ${orderBy}`,
      );
      return result;
    }
  }
};
