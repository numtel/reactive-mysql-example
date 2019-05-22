# Reactive MySQL example application

A reactive scoreboard built using the following Javascript components:

* [mysql-live-select](https://github.com/numtel/mysql-live-select) - Provide events on `SELECT` statement result set updates
* [Express](http://expressjs.com) - Web framework
* [SockJS](http://sockjs.org) - WebSocket emulation
* [React](http://reactjs.org) - User interface library

Click on a player to select and then click on the arrow to increment their score.

![Demo action GIF](docs/reactive-demo.gif)

Insert, increment and delete operations are latency-compensated.

## Installation

Installation requires configuring a MySQL server to output a binary log. See the [`mysql-live-select` Readme](https://github.com/numtel/mysql-live-select) for more information.

```bash
$ git clone https://github.com/numtel/reactive-mysql-example.git
$ cd reactive-mysql-example
$ npm install
# Update MySQL configuration
$ vim settings.js
# Add example data to MySQL server
$ mysql < example.sql
# Start server on port 5000
$ node index.js
```

## License

[Unlicense](http://unlicense.org/)

