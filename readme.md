# knex-oracle-bug

Running this normally:

```
> DEBUG=* node index

  knex:tx trx1: Starting top level transaction +0ms
  knex:client acquired connection from pool: __knexUid2 +0ms
Started transaction
Committing
  knex:tx trx1: releasing connection +0ms
Ok
  knex:client releasing connection to pool: __knexUid2 +5s

```

Running when disconnecting from the network during the sleep:

```
> DEBUG=* node index

  knex:tx trx1: Starting top level transaction +0ms
  knex:client acquired connection from pool: __knexUid2 +0ms
Started transaction
Committing
  knex:tx trx1: releasing connection +0ms
Ok
Unhandled rejection Error: ORA-03113: end-of-file on communication channel
Process ID: 84702
Session ID: 2754 Serial number: 4294981384
```
