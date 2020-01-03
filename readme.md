# knex-oracle-bug

Running this normally:

```
> DEBUG=* node index

  knex:tx trx1: Starting top level transaction +0ms
  knex:client acquired connection from pool: __knexUid2 +0ms
  knex:query insert into "COFFMANJ"."TABLE1" ("COLUMN1") values (?) trx1 +0ms
  knex:bindings [ 'hello' ] trx1 +0ms
Sleeping
Committing
  knex:tx trx1: releasing connection +0ms
No errors
  knex:client releasing connection to pool: __knexUid2 +5s
```

Running when disconnecting from the network during the sleep:

```
> DEBUG=* node index

  knex:tx trx1: Starting top level transaction +0ms
  knex:client acquired connection from pool: __knexUid2 +0ms
  knex:query insert into "COFFMANJ"."TABLE1" ("COLUMN1") values (?) trx1 +0ms
  knex:bindings [ 'hello' ] trx1 +0ms
Sleeping
Committing
  knex:tx trx1: releasing connection +0ms
No errors
Unhandled rejection Error: ORA-03113: end-of-file on communication channel
Process ID: 37950
Session ID: 1858 Serial number: 4295027021
```
