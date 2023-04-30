// Copyright (c) 2023, R Surya Prakash and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Fitness Journey of Gym Member"] = {
	"filters": [
		{
            "fieldname": "gym_member",
            "label": __("Gym Member"),
            "fieldtype": "Link",
            "options": "Gym Member"
        },
	]
};
