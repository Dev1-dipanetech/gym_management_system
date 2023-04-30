# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class GymInvoice(Document):
	def before_save(doc):
		gym_invoice_detail = doc.get("gym_invoice_detail")

		# Calculate the total amount
		total_amount = sum(item.amount for item in gym_invoice_detail)

		# Update the total field
		doc.total = total_amount
