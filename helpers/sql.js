const { BadRequestError } = require("../expressError");

/**
 * Generates SQL query components for updating database records with partial data.
 *
 * @param {object} dataToUpdate - An object containing the data to be updated.
 * Keys represent column names, and values represent new data.

 * @param {object} jsToSql - An object mapping JavaScript object keys to their equivalent SQL column names. 
 * This mapping is for handling naming conventions between JavaScript and SQL.

 * @returns {object}  {sqlSetCols, dataToUpdate} An object containing the SQL query components:
 * - setCols: A string representing the SET clause in an UPDATE statement.
 * - values: An array of values extracted from dataToUpdate for use as query paramametors.
 *
 * @throws {BadRequestError} If dataToUpdate is empty.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
