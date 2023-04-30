# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils.data import today
from frappe.utils import get_url

class GymMember(Document):
	def validate(self):
        # Check if membership is expired based on membership end date
		if self.membership_end_date and self.membership_end_date < today():
			self.membership_status = "Expired"
		else:
			self.membership_status = "Active"
   

	def after_insert(doc):
		# Create a new document in Gym Fitness Tracking doctype
		gym_fitness_tracking = frappe.new_doc("Gym Fitness Tracking")
		gym_fitness_tracking.gym_member = doc.name
		gym_fitness_tracking.date = frappe.utils.nowdate()
		gym_fitness_tracking.time = frappe.utils.nowtime()
		gym_fitness_tracking.height_in_cm = doc.height_in_cm
		gym_fitness_tracking.weight_in_kg = doc.weight_in_kg
		gym_fitness_tracking.height_in_inches = doc.height_in_inches
		gym_fitness_tracking.weight_in_lbs = doc.weight_in_lbs

		gym_fitness_tracking.insert(ignore_permissions=True)
		gym_fitness_tracking.submit()
     
     
     
     
		"""Create Frappe user when Gym Member is created"""
  
		# Generate a random password for the user
		password = frappe.generate_hash(length=10)

		# Create a new Frappe user with the same email address as the Gym Member
		user = frappe.get_doc({
			"doctype": "User",
			"email": doc.email_id,
			"first_name": doc.first_name,
			"middle_name": doc.middle_name,
			"last_name": doc.last_name,
			"username": doc.name,
			"user_type": "Website User",
            "new_password": password,
            "roles": [{
						"role": "Gym Member"
					}]
		})
		user.insert(ignore_permissions=True)

		# Set the password in the Gym Member record
		doc.set("password", password)
		doc.save()
  

		# Notify the Gym Member about the login credentials
		# login_url = get_url("/login")
		# message = f"Hello {doc.first_name},\n\nYour account has been created on our website.\n\nPlease use the following login credentials to access your account:\n\nEmail: {doc.email}\nPassword: {password}\n\nLogin here: {login_url}\n\nThank you,\nThe Gym Team"
		# frappe.sendmail(recipients=doc.email, subject="Your Gym Member Account", message=message)

	def after_delete(doc):
		"""Delete Frappe user when Gym Member is deleted"""

		# Find the corresponding User document and delete it
		user = frappe.get_doc("User", doc.email_id)
		user.delete()
	

	# def before_save(doc):
	# 	if doc.gym_trainer_subscription_plan:
	# 		gym_trainers = frappe.get_all("Gym Trainer",
	# 			filters={"parent": doc.gym_trainer_subscription_plan},
	# 			fields=["trainer", "trainer_name"]
	# 		)

	# 		if gym_trainers:
	# 			doc.gym_trainer_rating = []

	# 			for trainer in gym_trainers:
	# 				doc.append("gym_trainer_rating", {
	# 					"trainer": trainer.trainer,
	# 					"trainer_name": trainer.trainer_name,
	# 					"rating": 0
	# 				})

@frappe.whitelist()
def get_gym_trainer_rating(gym_member_name):
    gym_member = frappe.get_doc('Gym Member', gym_member_name)
    gym_trainer_subscription_plan = gym_member.gym_trainer_subscription_plan
    gym_trainer = frappe.get_all('Gym Trainer',
        filters={'parent': gym_trainer_subscription_plan},
        fields=['trainer', 'trainer_name'],ignore_permissions=False)
    return gym_trainer





