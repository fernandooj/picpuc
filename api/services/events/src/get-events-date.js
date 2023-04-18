const {poolConection} = require('../../../lib/connection-pg.js')
const DatabaseError  = require('../../../lib/errors/database-error')

module.exports.main = async (event) => {
  
  const {order = 'asc'} = event.pathParameters
  const selectEvents = `SELECT * FROM events WHERE active=true ORDER BY event_date ${order}`;
  
  console.log(order)
  try {
    const client = await poolConection.connect();
    client.query('BEGIN');

    const { rows } = await client.query(selectEvents);

    client.query('COMMIT');

    return rows;
  } catch (error) {
    throw new DatabaseError(error);
  }
};
