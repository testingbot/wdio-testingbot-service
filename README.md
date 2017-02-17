[![Greenkeeper badge](https://badges.greenkeeper.io/testingbot/wdio-testingbot-service.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/wdio-testingbot-service.svg?maxAge=2592000)](https://www.npmjs.com/package/wdio-testingbot-service)
[![dependencies Status](https://david-dm.org/testingbot/wdio-testingbot-service/status.svg)](https://david-dm.org/testingbot/wdio-testingbot-service)
[![devDependencies Status](https://david-dm.org/testingbot/wdio-testingbot-service/dev-status.svg)](https://david-dm.org/testingbot/wdio-testingbot-service?type=dev)
[![CircleCI](https://circleci.com/gh/testingbot/wdio-testingbot-service.svg?style=shield)](https://circleci.com/gh/testingbot/wdio-testingbot-service)

WDIO TestingBot Service
==========

> A WebdriverIO service. It updates the job metadata ('name', 'passed', 'tags', 'public', 'build', 'extra') and runs TestingBot Tunnel if desired.

## Installation

The easiest way is to keep `wdio-testingbot-service` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "wdio-testingbot-service": "~0.1"
  }
}
```

You can simple do it by:

```bash
npm install wdio-testingbot-service --save-dev
```

Instructions on how to install `WebdriverIO` can be found [here.](http://webdriver.io/guide/getstarted/install.html)

## Configuration

In order to use the service you need to set `user` and `key` in your `wdio.conf.js` file, and set the `host` option to 'hub.testingbot.com'. If you want to use [TestingBot Tunnel](https://testingbot.com/support/other/tunnel)
you just need to set `tbTunnel: true`.

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['testingbot'],
  user: process.env.TB_KEY,
  key: process.env.TB_SECRET,
  tbTunnel: true,
  // ...
};
```

## Options

### user
Your TestingBot API KEY.

Type: `String`

### key
Your TestingBot API SECRET.

Type: `String`

### tbTunnel
If true it runs the TestingBot Tunnel and opens a secure connection between a TestingBot Virtual Machine running your browser tests.

Type: `Boolean`<br>
Default: `false`

### tbTunnelOpts
Apply TestingBot Tunnel options (e.g. to change port number or logFile settings). See [this list](https://github.com/testingbot/testingbot-tunnel-launcher) for more information.

Type: `Object`<br>
Default: `{}`

----

For more information on WebdriverIO see the [homepage](http://webdriver.io).
