/**
 * Functions for handling receipts
 */

import * as utils from "./receiptUtils.js"
import * as awards from "./awardPointsUtils.js"

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
   if (!utils.isTotalSumOfItems(receipt["items"],receipt["total"])) {
      return false
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

/**
 * Gets the number of points to award to the receipt with the given id
 * @param {String} receiptId - a string id
 * @returns If the id exists, returns the number of points to award. Otherwise, returns null.
 */
function countPoints(receiptId) {
   const receipt = receipts[receiptId]
   if (!receipt) {
      return null
   }
   let points = 0
   points += awards.getRetailerPoints(receipt["retailer"])
   points += awards.getTotalPoints(receipt["total"])
   points += awards.getItemsPoints(receipt["items"])
   points += awards.getDescriptionPoints(receipt["items"])
   points += awards.getPurchaseDatePoints(receipt["purchaseDate"])
   points += awards.getPurchaseTimePoints(receipt["purchaseTime"])
   return points
}

export {isValidReceipt, newReceiptId, countPoints}
