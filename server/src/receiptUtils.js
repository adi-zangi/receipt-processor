/**
 * Utility functions for receipts
 */

import RandExp from "randexp"
import moment from "moment"

// Object that generates a new receipt id
const randIdGen = new RandExp(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/)

// Regular expressions for the receipt items
const retailerExp = new RegExp(/^[\w\s\-\&]+$/)
const totalExp = new RegExp(/^\d+\.\d{2}$/)
const shortDescExp = new RegExp(/^[\w\s\-]+$/)
const priceExp = new RegExp(/^\d+\.\d{2}$/)

const dateFormat = "YYYY-MM-DD"
const timeFormat = "HH:mm"

/**
 * Generates a random receipt id
 * @returns A string id
 */
function randId() {
   return randIdGen.gen()
}

/**
 * Returns true if the given retailer is valid and false otherwise
 * @param {String} retailer 
 */
function isValidRetailer(retailer) {
   if (typeof(retailer) !== "string") {
      return false
   }
   return retailerExp.test(retailer)
}

/**
 * Returns true if the given purchase date is valid and false otherwise
 * @param {String} purchaseDate 
 */
function isValidPurchaseDate(purchaseDate) {
   if (typeof(purchaseDate) !== "string") {
      return false
   }
   return moment(purchaseDate,dateFormat,true).isValid()
}

/**
 * Returns true if the given purchase time is valid and false otherwise
 * @param {String} purchaseTime 
 */
function isValidPurchaseTime(purchaseTime) {
   if (typeof(purchaseTime) !== "string") {
      return false
   }
   return moment(purchaseTime,timeFormat,true).isValid()
}

/**
 * Returns true if the given total is valid and false otherwise
 * @param {String} total 
 */
function isValidTotal(total) {
   if (typeof(total) !== "string") {
      return false
   }
   return totalExp.test(total)
}

/**
 * Returns true if the given items array is valid and false otherwise
 * Does not validate the contents of the array
 * @param {Array} items 
 */
function isItemsArrayValid(items) {
   if (!items || !isArray(items)) {
      return false
   }
   if (items.length < 1) {
      return false
   }
   return true
}

/**
 * Returns true if the given short description is valid and false otherwise
 * @param {String} shortDescription 
 */
function isValidShortDescription(shortDescription) {
   if (typeof(shortDescription) !== "string") {
      return false
   }
   return shortDescExp.test(shortDescription)
}

/**
 * Returns true if the given price is valid and false otherwise
 * @param {String} price 
 */
function isValidPrice(price) {
   if (typeof(price) !== "string") {
      return false
   }
   return priceExp.test(price)
}

/**
 * Returns true if the given object is an array and false otherwise
 * @param {any} obj
 */
function isArray(obj) {
   if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(obj) === '[object Array]';
   } else {
      return Array.isArray(obj)
   }
}

function isTotalSumOfItems(totalArray,total) {
   let sum = 0
   for (const totalItem of totalArray) {
      sum += Number(totalItem["price"])
   }
   return sum == total
}

export {randId, isValidRetailer, isValidPurchaseDate, isValidPurchaseTime, isValidTotal,
         isItemsArrayValid, isValidShortDescription, isValidPrice, isTotalSumOfItems}