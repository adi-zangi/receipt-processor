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
      res.status(400).send("Received an invalid receipt: " + JSON.stringify(receiptJSON))
   } else {
      const receiptId = Receipt.getReceiptId(receiptJSON)
      res.status(200).json({"id": receiptId})
   }
})

/**
 * Responds to GET requests to /receipts/:id/points
 * Returns the number of points awarded for a given a receipt ID
 */
router.get('/receipts/:id/points', (req, res) => {
   console.log("Received GET to /receipts/:id/points with params = " + JSON.stringify(req.params))
   res.status(400).send("Not implemented")
})

export default router