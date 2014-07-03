Reinforcement Learning Presentation
===================================

Interactive presentation to explain reinforcement learning

Setup
-----

### Tools

The project depends on the following tools: [yo][], [grunt][] and
[bower][]. These tools in turn depend on [node][]. To install the
tools first install node, then execute the following command.

```sh
npm install --global yo grunt-cli bower
```

### Generator

[yo][] depends on externally defined generators to scaffold the
project. We are using the [reveal generator][generator-reveal]. It can
be installed with the following command.

```sh
npm install --global generator-reveal
```

### Dependencies

Dependencies are either managed by `npm` or `bower`. Make sure to
update the respective configuration files to keep the dependencies in sync.

#### Project

The projects dependencies are listed in `package.json`. To install
them execute

```sh
npm install
```

#### Presentation

The presentations dependencies are listed in `bower.json`. Install
them with

```sh
bower install
```

Development
-----------

### Starting Server

[grunt][] is able to start a server that serves the presentation with
the following command.

```sh
grunt server
```

This will watch the filesystem for changes and will reload the browser
when they occur.

### Scaffold Slide

[generator-reveal][] can be used to scaffold a new slide. The basic
command to do that is

```sh
yo reveal:slide "Title"
```

See the [documentation][reveal:slide] for an explanation of all the
options.

### Create Distribution

```sh
grunt dist
```

builds a distribution that can be statically hosted.

You can deploy this distribution to the github pages with teh
following command.

```sh
grunt deploy
```

[yo]: http://yeoman.io/
[grunt]: http://gruntjs.com/
[bower]: http://bower.io/
[node]: http://nodejs.org/
[generator-reveal]: https://github.com/slara/generator-reveal
[reveal:slide]: https://github.com/slara/generator-reveal#generators
