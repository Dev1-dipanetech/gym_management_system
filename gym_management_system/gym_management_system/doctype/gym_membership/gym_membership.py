# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import today, flt
from frappe import get_single

class GymMembership(Document):
    def validate(self):
        gym_settings = get_single("Gym Settings")

        if gym_settings:
            if self.membership_plan == "Basic Membership":
                if gym_settings.basic_membership_fees:
                    self.membership_fee = flt(gym_settings.basic_membership_fees)
                else:
                    self.membership_fee = 500
                
                self.membership_type = "Monthly Plan"
                
            if self.membership_plan == "Premium Membership":
                if gym_settings.premium_membership_fees:
                    self.membership_fee = flt(gym_settings.premium_membership_fees)
                else:
                    self.membership_fee = 800
                
            if self.membership_plan == "VIP Membership":
                if gym_settings.vip_membership_fees:
                    self.membership_fee = flt(gym_settings.vip_membership_fees)
                else:
                    self.membership_fee = 1000

            if self.membership_type == "Monthly Plan":
                self.membership_fee *= 1
            elif self.membership_type == "Quarterly Plan":
                self.membership_fee *= 3
            elif self.membership_type == "Half-yearly Plan":
                self.membership_fee *= 6
            elif self.membership_type == "Yearly Plan":
                self.membership_fee *= 12