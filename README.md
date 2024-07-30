# identicon-cli

![NPM Version](https://img.shields.io/npm/v/identicon-cli)
![Node Current](https://img.shields.io/node/v/identicon-cli)
![NPM License](https://img.shields.io/npm/l/identicon-cli)

A simple CLI Tool to run [`identicon.js`][identicon.js] on Node.js.

![icon_1.png](/icons/icon_1.png)
![icon_2.png](/icons/icon_2.png)
![icon_3.png](/icons/icon_3.png)

## Instration

### Running on-demand:

Using npx you can run the script without installing it first:

```sh
npx identicon-cli [options] <identifer>
```

### Globally via npm

```sh
npm install -g identicon-cli
```

and

```
identicon-cli [options] <identifer>
```

## Usage

```
Usage: identicon-cli [options] <identifer>

Options:
  -s --size <number>  icon size (default: 64)
  -o --output <path>  output path
  --foreground <hex>  foreground color
  --background <hex>  background color
  --svg               use SVG instead of PNG
  -v --version        output the version number
  -h, --help          display help for command
```

[identicon.js]: https://www.npmjs.com/package/identicon.js
