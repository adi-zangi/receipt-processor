/**
 * Utility functions for calculating receipt points
 * 
 * 1 point for every alphanumeric character in the retailer name.
 * 50 points if the total is a round dollar amount with no cents.
 * 25 points if the total is a multiple of 0.25.
 * 5 points for every two items on the receipt.
 * If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2
 * and round up to the nearest integer. The result is the number of points earned.
 * 6 points if the day in the purchase date is odd.
 * 10 points if the time of purchase is after 2:00pm and before 4:00pm.
 */

import moment from "moment"

const timeFormat = "HH:mm"
const dateFormat = "YYYY-MM-DD"

/**
 * Returns the points awarded for the retailer
 * @param {String} retailer 
 */
function getRetailerPoints(retailer) {
   return retailer.replace(/[^A-Z0-9]/gi, "").length
}

/**
 * Returns the points awarded for the total
 * @param {String} total 
 */
function getTotalPoints(total) {
   let points = 0
   const totalNum = Number(total)
   if (isNaN(totalNum)) {
      return points
   }
   if (totalNum % 1 == 0) {
      points += 50
   }
   if (totalNum % 0.25 == 0) {
      points += 25
   }
   return points
}

/**
 * Returns the points awarded for the items
 * @param {Array} items
 */
function getItemsPoints(items) {
   const numItems = items.length
   return Math.floor(numItems / 2) * 5
}

/**
 * Returns the points awarded for the item short descriptions
 * @param {Array} items
 */
function getDescriptionPoints(items) {
   let points = 0
   for (const item of items) {
      const desc = item["shortDescription"]
      const price = Number(item["price"])
      if (!isNaN(price) && (desc.trim().length % 3 == 0)) {
         points += Math.ceil(price * 0.2)
      }
   }
   return points
}

/**
 * Returns the points awarded for the purchase date
 * @param {Array} items
 */
function getPurchaseDatePoints(purchaseDate) {
   const dateMoment = moment(purchaseDate,dateFormat)
   const day = dateMoment.date()
   if (day % 2 == 1) {
      return 6
   }
   return 0
}

/**
 * Returns the points awarded for the purchase time
 * @param {Strimg} purchaseTime
 */
function getPurchaseTimePoints(purchaseTime) {
   const time = moment(purchaseTime,timeFormat)
   if (time.isAfter(moment("14:00",timeFormat)) && time.isBefore(moment("16:00",timeFormat))) {
      return 10
   }
   return 0
}

export {getRetailerPoints, getTotalPoints, getItemsPoints, getDescriptionPoints,
         getPurchaseDatePoints, getPurchaseTimePoints}