# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GymGroupClassBooking(Document):
	def before_submit(self):
		self.payment_status = "Paid"

	def before_save(doc):
		gym_member = frappe.get_doc("Gym Member", doc.gym_member)
		if not gym_member.gym_trainer_subscription_plan:
			frappe.throw("Please select a trainer subscription plan for this Gym Member {} before creating a Gym Group Class Booking.".format(frappe.utils.get_link_to_form("Gym Member", doc.gym_member)))
   
	def validate(self):
		if self.gym_group_class:
			group_class = frappe.get_doc("Gym Group Class", self.gym_group_class)
			class_fees = group_class.class_fees
			if self.booking_type == "Monthly":
				self.class_fees = class_fees * 1
			elif self.booking_type == "Quarterly":
				self.class_fees = class_fees * 3
    
    
	def on_submit(self):
		gym_invoice = frappe.new_doc("Gym Invoice")
		gym_invoice.gym_member = self.gym_member

		gym_invoice.posting_date = frappe.utils.nowdate()
		gym_invoice.posting_time = frappe.utils.nowtime()
		# set other fields in the Gym Invoice as per your requirement

		invoice_detail = gym_invoice.append("gym_invoice_detail")
		invoice_detail.document_name = self.name
		invoice_detail.document_type = "Gym Group Class Booking"
		invoice_detail.plan_start_date = self.booking_start_date
		invoice_detail.plan_end_date = self.booking_end_date
		invoice_detail.amount = self.class_fees

		gym_invoice.insert()
		gym_invoice.submit()