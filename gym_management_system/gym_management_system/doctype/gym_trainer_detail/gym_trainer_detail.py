# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GymTrainerDetail(Document):
	def after_insert(doc):
		"""Create Frappe user when Gym Trainer is created"""
  
		# Generate a random password for the user
		password = frappe.generate_hash(length=10)

		# Create a new Frappe user with the same email address as the Gym Trainer
		user = frappe.get_doc({
			"doctype": "User",
			"email": doc.email,
			"first_name": doc.trainer_name,
			"username": doc.name,
			"user_type": "System User",
            "new_password": password,
            "roles": [{
						"role": "Gym Trainer"
					}]
		})
		user.insert(ignore_permissions=True)

		# Set the password in the Gym Trainer record
		doc.set("password", password)
		doc.save()
  

		# Notify the Gym Trainer about the login credentials
		# login_url = get_url("/login")
		# message = f"Hello {doc.first_name},\n\nYour account has been created on our website.\n\nPlease use the following login credentials to access your account:\n\nEmail: {doc.email}\nPassword: {password}\n\nLogin here: {login_url}\n\nThank you,\nThe Gym Team"
		# frappe.sendmail(recipients=doc.email, subject="Your Gym Trainer Account", message=message)

	def after_delete(doc):
		"""Delete Frappe user when Gym Trainer is deleted"""

		# Find the corresponding User document and delete it
		user = frappe.get_doc("User", doc.email)
		user.delete()
