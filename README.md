# Reactive MySQL example application

Using [Express](http://expressjs.org), [SockJS](http://sockjs.org), and the [mysql-live-select](https://github.com/numtel/mysql-live-select) NPM Packages as well as the [React Front-End Framework](http://reactjs.org), this example program builds a reactive scoreboard. Click on a player to select and then click on the arrow to increment their score.

![Demo action GIF](docs/reactive-demo.gif)

## Installation

Installation requires configuring a MySQL server to output a binary log. See the [`mysql-live-select` Readme](https://github.com/numtel/mysql-live-select) for more information.

```bash
$ git clone https://github.com/numtel/reactive-mysql-example.git
$ cd reactive-mysql-example
$ npm install
# Update MySQL configuation
$ vim settings.js
# Start server on port 5000
$ node index.js
```

## License

[Unlicense](http://unlicense.org/)

