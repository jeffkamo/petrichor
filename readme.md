# FF: Train Wreck

A Final Fantasy inspired text adventure novel developed by Jeffrey Kamo and co-written with Roman Kovacic.

![fother_34c68a_5509038](https://cloud.githubusercontent.com/assets/734535/14518964/85224aea-01d0-11e6-846f-d43522b4876d.gif)


## Installation

* **Note: requires a node version >= 4 and an npm version >= 3.**
* **If you have installation or compilation issues with this project, please see [the debugging guide](https://github.com/chentsulin/electron-react-boilerplate/issues/400)** (indeed, this app uses [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)!)

First, clone the repo via git:

```
$ git clone https://github.com/jeffkamo/fftrainwreck.git
```

And then install dependencies. ProTip: Install with yarn for faster and safer installation

```
$ npm install
```

## Run

```
$ npm run dev
```

## Folder Structure

The folder structure is a modification of [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate), with tweaks to suit the needs of this game. Points of interest in the folder structure are (more for future reference):

| Directory | Description |
| ------ | ----------- |
| `/app` | The game's front-end logic, built with React. |
| `/bin` | Standalone NPM scripts. Used for things like one-off, automated tasks. |
| `/engine` | _Deprecated_ |
| `/scripts` | Modules for use elsewhere in the application. In particular, these are not necessarily used by themselves. |
| `/test` | Test directory. Leftover from the boilerplate (not if I'll use it...) |

## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

#### DevTools extension

This boilerplate is included following DevTools extensions:

* [Devtron](https://github.com/electron/devtron) - Install via [electron-debug](https://github.com/sindresorhus/electron-debug).
* [React Developer Tools](https://github.com/facebook/react-devtools) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).

You can find the tabs on Chrome DevTools.

If you want to update extensions version, please set `UPGRADE_EXTENSIONS` env, just run:

```bash
$ UPGRADE_EXTENSIONS=1 npm run dev

# For Windows
$ set UPGRADE_EXTENSIONS=1 && npm run dev
```


## Package

```bash
$ npm run package
```

To package apps for all platforms:

```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

#### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

Use `electron-packager` to pack your app with `--all` options for darwin (osx), linux and win32 (windows) platform. After build, you will find them in `release` folder. Otherwise, you will only find one for your os.

`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.

#### Default Ignore modules

We add some module's `peerDependencies` to ignore option as default for application size reduction.

- `babel-core` is required by `babel-loader` and its size is ~19 MB
- `node-libs-browser` is required by `webpack` and its size is ~3MB.

> **Note:** If you want to use any above modules in runtime, for example: `require('babel/register')`, you should move them from `devDependencies` to `dependencies`.


## Static Type Checking
This project comes with Flow support out of the box! You can annotate your code with types, [get Flow errors as ESLint errors](https://github.com/amilajack/eslint-plugin-flowtype-errors), and get [type errors during runtime](https://github.com/gcanti/babel-plugin-tcomb-boilerplate) during development. Types are completely optional.


## Dispatching redux actions from main process

see discusses in [#118](https://github.com/chentsulin/electron-react-boilerplate/issues/118) and [#108](https://github.com/chentsulin/electron-react-boilerplate/issues/108)


## Credits

- Final Fantasy is owned by Square Enix
- Inspiration for the text adventure platform started with [cli-adventure-games](https://github.com/arvindr21/cli-adventure-games/)
- Props to the folks at [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) for their fantastic work on a great way to kickoff an Electron + React + Webkit boilerplate!


## Licenses

### The Game Code

The MIT License (MIT)

Copyright (c) 2015-2016 Jeffrey Kamo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


### The Game Story

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" rel="dct:type">work</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
