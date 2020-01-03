const secret = require('./secret')
const knex = require('knex')({
  client: 'oracledb',
  debug: false,
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
  try {
    await knex.transaction(async trx => {
      await trx('COFFMANJ.TABLE1').insert({COLUMN1: 'hello'})

      // Pull the plug during the sleep to reproduce the issue
      console.log('Sleeping')
      await sleep(5000)
      console.log('Committing')
    })
  } catch (e) {
    console.error('Caught error:', e)
    await knex.destroy()
    return
  }
  console.log('No errors')
  await knex.destroy()
}

main()
