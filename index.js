const pg = require('pg');

const Client = pg.Client;

const configObj = {
  user: 'postgres',
  host: 'localhost',
  database: 'spot',
  password: 'postgres',
  port: 5433,
};

const client = new Client(configObj);

client
  .connect()
  .then(() => {
    console.log('db connected');
  })
  .catch((error) => {
    console.log('db connection error:', error);
  });

// BREAD verbs
const verb = process.argv[2];
switch (verb) {
  case 'browse':
    // make this:
    //       client.query('SELECT id,question FROM objectives ORDER BY id;')
    client
      .query('SELECT id,question FROM objectives ORDER BY id;')
      .then((response) => {
        for (let objective of response.rows) {
          console.log(`${objective.id} :: ${objective.question}`);
        }
        client.end();
      })
      .catch((error) => {
        // we can do console.error()
        console.log('BROWSE Error:', error);
        client.end();
      });
    break;
  case 'read':
    const id = process.argv[3];
    client
      // make this:
      //       client.query('SELECT id, question FROM objectives ORDER BY id;')
      .query('SELECT question,answer FROM objectives WHERE id = $1;', [id])
      .then((response) => {
        for (let objective of response.rows) {
          console.log(`${objective.question}`);
          console.log(`###################################`);
          console.log(`${objective.answer}`);
        }
        client.end();
      })
      .catch((error) => {
        // we can do console.error()
        console.log('READ Error:', error);
        client.end();
      });
    break;
  default:
    console.log('wrong verb');
    client.end();
    break;
}
