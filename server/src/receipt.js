/**
 * Functions for handling receipts
 */

import {randId, isValidRetailer, isValidPurchaseDate, isValidPurchaseTime, isItemsArrayValid,
         isValidTotal, isValidShortDescription, isValidPrice} from "./receiptUtils.js"

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
   if (!receipt["retailer"] || !isValidRetailer(receipt["retailer"])) {
      return false
   }
   if (!receipt["purchaseDate"] || !isValidPurchaseDate(receipt["purchaseDate"])) {
      return false
   }
   if (!receipt["purchaseTime"] || !isValidPurchaseTime(receipt["purchaseTime"])) {
      return false
   }
   if (!receipt["total"] || !isValidTotal(receipt["total"])) {
      return false
   }
   if (!receipt["items"] || !isItemsArrayValid(receipt["items"])) {
      return false
   }
   for (const item of receipt["items"]) {
      if (!item["shortDescription"] || !isValidShortDescription(item["shortDescription"])) {
         return false
      }
      if (!item["price"] || !isValidPrice(item["price"])) {
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
function getReceiptId(receipt) {
   const id = randId()
   while (receipts[id]) {
      id = randId()
   }
   receipts[id] = receipt
   return id
}

export {isValidReceipt, getReceiptId}