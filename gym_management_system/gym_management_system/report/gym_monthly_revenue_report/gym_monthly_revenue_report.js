// Copyright (c) 2023, R Surya Prakash and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Gym Monthly Revenue Report"] = {
	"filters": [
		{
            "fieldname": "gym_invoice",
            "label": __("Gym Invoice"),
            "fieldtype": "Link",
            "options": "Gym Invoice"
        },
        {
            "fieldname": "gym_member",
            "label": __("Gym Member"),
            "fieldtype": "Link",
            "options": "Gym Member"
        },
		{
			"fieldname": "month",
			"label": __("Month"),
			"fieldtype": "Select",
			"reqd": 1 ,
			"options": [
				{ "value": 1, "label": __("Jan") },
				{ "value": 2, "label": __("Feb") },
				{ "value": 3, "label": __("Mar") },
				{ "value": 4, "label": __("Apr") },
				{ "value": 5, "label": __("May") },
				{ "value": 6, "label": __("June") },
				{ "value": 7, "label": __("July") },
				{ "value": 8, "label": __("Aug") },
				{ "value": 9, "label": __("Sep") },
				{ "value": 10, "label": __("Oct") },
				{ "value": 11, "label": __("Nov") },
				{ "value": 12, "label": __("Dec") },
			],
			"default": frappe.datetime.str_to_obj(frappe.datetime.get_today()).getMonth() + 1
		},
		{
			"fieldname": "year",
			"label": __("Year"),
			"fieldtype": "Select",
			"reqd": 1 ,
			"options": [
				{ "value": "2022" },
				{ "value": "2023" },
				{ "value": "2024" },
				{ "value": "2025" },
				{ "value": "2026" },
				{ "value": "2027" }
			],
			"default": frappe.datetime.str_to_obj(frappe.datetime.get_today()).year,
		},
	]
};
