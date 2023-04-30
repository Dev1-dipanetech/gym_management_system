# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GymLocker(Document):
	def validate(self):
		gym_settings = frappe.get_single("Gym Settings")

		limit =  10 # default limit

		if gym_settings:
			if gym_settings.no_of_lockers:
				limit = gym_settings.no_of_lockers
			
			count = frappe.db.count('Gym Locker')
			if count >= limit:
				frappe.throw(f"Cannot create more lockers as the limit of {limit} lockers has been reached.")
				