# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

import frappe
from frappe import  _, get_single
from frappe.model.document import Document
from frappe.utils.data import flt

class GymTrainerSubscription(Document):
	def before_save(self):
		child_table = self.gym_trainer
		child_table_rows = len(child_table)

		if self.subscription_plan == 'Basic Trainer Plan' and child_table_rows > 1:
			frappe.throw(_("You can only assign one trainer for 'Basic Trainer Plan'"))
	
 
	def validate(self):
		gym_settings = get_single("Gym Settings")

		if gym_settings:
			if self.subscription_plan == "Professional Trainer Plan":
				if gym_settings.professional_trainer_plan_fees:
					self.subscription_fee = flt(gym_settings.professional_trainer_plan_fees)
				else:
					self.subscription_fee = 800
			else:
					self.subscription_fee = 0
					self.subscription_type = ""
					self.timing_for_cardio_machine = ""
     
			if self.subscription_type == "Monthly":
				self.subscription_fee *= 1
			elif self.subscription_type == "Quarterly":
				self.subscription_fee *= 3