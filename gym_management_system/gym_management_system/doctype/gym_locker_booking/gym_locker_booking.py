# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.data import flt

class GymLockerBooking(Document):
	def before_submit(self):
		self.payment_status = "Paid"
  
		locker = self.locker_number
		member = self.gym_member

		# Set the availability status and occupied by fields of the locker
		locker_doc = frappe.get_doc("Gym Locker", locker)
		locker_doc.availability_status = "Occupied"
		locker_doc.occupied_by = member
		locker_doc.save()

	def validate(self):
		if self.locker_number:
			locker = frappe.get_doc("Gym Locker", self.locker_number)
			locker_fees = locker.locker_fee
			if self.booking_type == "Monthly":
				self.locker_fees = locker_fees * 1
			elif self.booking_type == "Quarterly":
				self.locker_fees = locker_fees * 3
    
	def on_submit(self):
		gym_invoice = frappe.new_doc("Gym Invoice")
		gym_invoice.gym_member = self.gym_member

		gym_invoice.posting_date = frappe.utils.nowdate()
		gym_invoice.posting_time = frappe.utils.nowtime()
		# set other fields in the Gym Invoice as per your requirement

		invoice_detail = gym_invoice.append("gym_invoice_detail")
		invoice_detail.document_name = self.name
		invoice_detail.document_type = "Gym Locker Booking"
		invoice_detail.plan_start_date = self.booking_start_date
		invoice_detail.plan_end_date = self.booking_end_date
		invoice_detail.amount = self.locker_fees

		gym_invoice.insert()
		gym_invoice.submit()