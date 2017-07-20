# Show and tell
A Cucumber BDD tool to demo scenarios to stakeholders

## Installation

```
$ yarn add show-and-tell
```

## Usage

Add the following arguments to your cucumber command
```
$ cucumber.js --require node_modules/show-and-tell/index.js --format node_modules/show-and-tell/formatter.js
```

Press any key to progress through scenario steps. Hit Ctrl-c to exit.

### Protractor

Check out the [Protractor example](example)

```
...
cucumberOpts: {
    require: ['features/**/*.js', require.resolve('show-and-tell')],
    format: 'node_modules/show-and-tell/formatter.js'
}
...
```

## Screenshots

<img src="https://media.giphy.com/media/l3JDxaFXRVFhfUJXO/giphy.gif" alt="BDD Demo">

## Author

* Created by [Adem Gaygusuz](https://adem.io)
* Email address: <adem@ardweb.co.uk>
* [@ademuk](https://www.twitter.com/ademuk) on Twitter

## License

Features is licensed under the MIT License. (See LICENSE)