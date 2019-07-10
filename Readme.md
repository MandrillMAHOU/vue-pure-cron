# Vue Pure Cron
## Introduction
Vue pure cron is a vue component designed to generate commonly used cron expression.

## Install via npm
```
npm install vue-pure-cron --save
```

## Quick Start
```
import Vue from 'vue';
import PureCron from 'vue-pure-cron';

Vue.use(PureCron);
```

## Attributes
| Attribute name |Description|Type|Default|Attention
|-|-|-|-|-|
|width|width of the component|string, number|100%|Component has a min-width of 420px|

## Events
| Event name |Description| Parameters|
|-|-|-|
|generate|triggers when confirm btn is clicked|exp(generated cron expression)|
