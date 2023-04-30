// Copyright (c) 2023, R Surya Prakash and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Most Popular Gym Group Classes"] = {
	"filters": [
		{
			"fieldname": "gym_group_class",
			"label": __("Gym Group Class"),
			"fieldtype": "Link",
			"options": "Gym Group Class"
		},
	],

	"formatter": function (value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);

		if (column.fieldname == "percentage_bookings") {
			value = "<span style='color:green'>" + value + "</span>";
		}

		return value;
	}
};
