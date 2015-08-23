// Libs
import { model, Joi } from './lib/model';
// Adapters
import { nedb } from './adapters/nedb/index';

/*
 * Copyright (c) 2015 TechnologyAdvice
 */

/**
 * Entry point for the module, exports methods of the libs
 */
export default {
  model, Joi, nedb
};
