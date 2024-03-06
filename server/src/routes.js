/**
 * Routes for processing requests for receipt information
 */

import express from "express"
import * as Receipt from "./receipt.js"

const router = express.Router()

/**
 * Responds to POST requests to /receipts/process
 * Gets a JSON receipt and returns the receipt ID
 */
router.post('/receipts/process', (req, res) => {
   const receiptJSON = req.body
   if (!Receipt.isValidReceipt(receiptJSON)) {
      res.status(400).send("The receipt is invalid")
   } else {
      const receiptId = Receipt.newReceiptId(receiptJSON)
      res.status(200).json({"id": receiptId})
   }
})

/**
 * Responds to GET requests to /receipts/:id/points
 * Returns the number of points awarded for a given a receipt ID
 */
router.get('/receipts/:id/points', (req, res) => {
   const receiptId = req.params.id
   const points = Receipt.countPoints(receiptId)
   if (points == null) {
      res.status(404).send("No receipt found for that id")
   } else {
      res.status(200).json({"points": points})
   }
})

export default router