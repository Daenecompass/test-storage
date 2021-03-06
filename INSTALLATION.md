Installation
======

## Dependencies
- mongodb
- node.js

## Pre-installation

* install node.js
* install mongodb

__note:__ `mongo` and `mongod` should be accessible via command line interface

## Installation

clone repo then install packages

```
$ cd test-storage
```

```bash
$ npm install
```

1. run db-init.js script (script connects to test-storage db and create default user for authentication and default user for application)

```bash
$ mongo test-storage install/db-init.js
```

__note:__ to change database user/password for application check config/production.json file

2. run mongo db with authentication

```bash
$ mongod --auth
```

## Start
1. build test-storage

```bash
$ npm run build
```
2. Start test-storage
```bash
$ npm start
```

3. you can access application on `localhost`

## Start using Docker
1. build test-storage image

```bash
$ docker-compose build
```
2. run containters

```bash
$ docker-compose up
```

3. you can access application on `localhost`
