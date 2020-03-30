/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
'use strict';
import { config, cache_config } from '../../stocks-api/src/config/hapi-server-config';
import { Stocks } from '../src/app/model/stocks';
import { CONSTANT } from './constant/constant';
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server(config);
  server.method(CONSTANT.FETCH_STOCKS, Stocks.fetchQuotes, cache_config);

  server.route({
    method: CONSTANT.GET_METHOD,
    path: CONSTANT.WELCOME_ROUTE,
    handler: (request, h) => {
      return {
        hello: 'world'
      };
    }
  });

  server.route({
    method: CONSTANT.GET_METHOD,
    path: CONSTANT.FETCH_STOCK_ROUTE,
    handler: async (request, h) => {
      const { symbol, period } = request.params;
      const { value, cached } = await server.methods.fetchStocks(symbol, period);
      const lastModified = cached ? new Date(cached.stored) : new Date();
      return h.response(value).header('Last-modified', lastModified.toUTCString());
    }
  });

  await server.start().then(() => {
    console.log('Server running on %s', server.info.uri);
  }).catch((error) => {
    console.log('Server failed to start', error);
  });
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
