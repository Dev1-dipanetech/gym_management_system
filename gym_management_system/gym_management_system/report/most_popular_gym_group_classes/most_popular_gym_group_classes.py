# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

import frappe
from frappe import _

def execute(filters=None):
	columns = [
		{
			"label": _("Gym Group Class"),
			"fieldname": "gym_group_class",
			"fieldtype": "Link",
			"options": "Gym Group Class",
			"width": 280,
			"align": "center"
		},
		{
			"label": _("Most Booked Class"),
			"fieldname": "count_bookings",
			"fieldtype": "Data",
			"width": 280,
			"align": "center"
		},
		{
			"label": _("Most Popular"),
			"fieldname": "percentage_bookings",
			"fieldtype": "Data",
			"width": 280,
			"align": "center"	
		},
	]

	data = []

	total_bookings = frappe.db.count("Gym Group Class Booking", filters={"docstatus": 1})
	if total_bookings == 0:
		return columns, data

	bookings_data = frappe.db.sql("""
		SELECT gym_group_class,
		       COUNT(gym_member) AS count_bookings,
		       CAST(ROUND(COUNT(gym_member) * 100.0 / %s) AS INT) AS percentage_bookings
		FROM `tabGym Group Class Booking`
		WHERE `docstatus` = 1
  		{0}
		GROUP BY gym_group_class
		ORDER BY count_bookings DESC
	""".format(get_filters_codition(filters)), (total_bookings), as_dict=True)

	for row in bookings_data:
		row.update({"percentage_bookings": str(row["percentage_bookings"]) + "%"})
		data.append(row)

	return columns, data

def get_filters_codition(filters):
	conditions = []
	if filters.get("gym_group_class"):
		conditions.append("AND `gym_group_class` = '{0}'".format(filters["gym_group_class"]))
	return " ".join(conditions)