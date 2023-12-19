import { AnyObject } from '../types';

/**
 * This method checks if an object's type is `object` and that it's not null.
 *
 * Note that an empty array is a valid object in this regard.
 *
 * @param obj
 */
export const isAnyObject = (obj: unknown): obj is AnyObject => {
  return typeof obj === 'object' && obj !== null;
};
