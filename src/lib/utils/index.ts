import { createHash } from 'crypto';

/**
 * Creates an MD5 hash (hexadecimal) of the provided string
 * @param str - String to hash
 */
export const md5Hash = (str: string): string => createHash('md5').update(str).digest('hex');

/**
 * Randomly selects one element from a given array
 * @param arr - Array from which to select the element
 */
export const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
