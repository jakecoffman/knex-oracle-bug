const secret = require('./secret')
const knex = require('knex')({
  client: 'oracledb',
  debug: true,
  asyncStackTraces: true,
  connection: {
    host: secret.host,
    user: secret.user,
    password: secret.password,
    database: secret.database
  },
  fetchAsString: ['clob'],
  pool: {
    min: 0,
    max: 5
  },
  acquireConnectionTimeout: 11000
})

process.once('SIGINT', () => {
  knex.destroy()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const trx = await knex.transaction()

  console.log("Started transaction")

  await sleep(5000)

  console.log("Committing")

  try {
    await trx.commit()
  } catch (e) {
    console.log("Error committing:", e)
    await knex.destroy()
    return
  }

  console.log("Ok")

  await knex.destroy()
}

main()
