# Copyright (c) 2023, R Surya Prakash and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase


class TestGymLocker(FrappeTestCase):
	def test_gym_locker1(self):
		test_locker2 = frappe.get_doc({
			"doctype" : "Gym Locker",
			"locker_size": "Small",
   			"locker_fee": 1000
		}).insert()
  
	def test_gym_locker2(self):
		test_locker1 = frappe.get_doc({
			"doctype" : "Gym Locker",
			"locker_size": "Medium",
   			"locker_fee": 1500
		}).insert()

