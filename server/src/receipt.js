/**
 * Functions for handling receipts
 */

import * as utils from "./receiptUtils.js"

const receipts = {}

/**
 * Validates the given receipt
 * @param {Object} receipt - an object containing a receipt
 * @returns True if the given receipt is valid, false otherwise
 */
function isValidReceipt(receipt) {
   if (receipt == null) {
      return false
   }
   if (typeof(receipt) !== "object") {
      return false
   }
   if (!utils.isValidRetailer(receipt["retailer"])) {
      return false
   }
   if (!utils.isValidPurchaseDate(receipt["purchaseDate"])) {
      return false
   }
   if (!utils.isValidPurchaseTime(receipt["purchaseTime"])) {
      return false
   }
   if (!utils.isValidTotal(receipt["total"])) {
      return false
   }
   if (!utils.isItemsArrayValid(receipt["items"])) {
      return false
   }
   for (const item of receipt["items"]) {
      if (!utils.isValidShortDescription(item["shortDescription"])) {
         return false
      }
      if (!utils.isValidPrice(item["price"])) {
         return false
      }
   }
   return true
}

/**
 * Assigns a new id for the given receipt
 * @param {Object} receipt - an object containing a receipt
 * @returns A string id
 */
function newReceiptId(receipt) {
   const id = utils.randId()
   while (receipts[id]) {
      id = utils.randId()
   }
   receipts[id] = receipt
   return id
}

export {isValidReceipt, newReceiptId}