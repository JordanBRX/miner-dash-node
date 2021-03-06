/**
 * Created by jdean on 11/24/13.
 */


var globalConfig = require('../../config.js').config;

var actionTypes = exports.actionTypes = {
   USER: 'userstats',
   POOL: 'poolstats',
   BLOCK: 'blockstats'
};

var poolType = exports.poolType = 'eclipsemc';

function getEmcPoolConfig(config) {
   var returnPool = null;
   config.pools.forEach(function (pool) {
      if (pool.type === poolType) {
         returnPool = pool;
      }
   });
   return returnPool;
};

var config = getEmcPoolConfig(globalConfig);

var createUri = exports.createUri = function (options) {

   if (!(options && options.apiKey && options.action)) {
      return new Error ("Missing required options");
   }

   return 'https://eclipsemc.com/api.php?key=' + options.apiKey + '&action=' + options.action;
};

exports.defaultUserUri = function () {
   return createUri({
      apiKey: config.apiKey,
      action: actionTypes.USER
   });
};

exports.defaultPoolUri = function () {
   return createUri({
      apiKey: config.apiKey,
      action: actionTypes.POOL
   });
};