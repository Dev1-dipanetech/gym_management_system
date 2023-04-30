# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

import frappe


from frappe import _

def get_data(filters):
    data = []

    # Query data for selected gym_member
    # fitness_data = frappe.db.sql("""
    #     SELECT gym_member, gym_member_name, weight_in_kg, calories_intake, date
    #     FROM `tabGym Fitness Tracking`
    #     WHERE `gym_member` = %(gym_member)s
    #     ORDER BY date ASC
    # """, filters, as_dict=True)
    
    if filters.get("gym_member"):
        # Query data for selected gym_member
        fitness_data = frappe.db.sql("""
            SELECT gym_member, gym_member_name, weight_in_kg, calories_intake, date
            FROM `tabGym Fitness Tracking`
            WHERE `gym_member` = %(gym_member)s
            ORDER BY date ASC
        """, filters, as_dict=True)
    else:
        # Query data for all gym_members
        fitness_data = frappe.db.sql("""
            SELECT gym_member, gym_member_name, weight_in_kg, calories_intake, date
            FROM `tabGym Fitness Tracking`
            ORDER BY date ASC
        """, as_dict=True)

    # Add data to report
    for row in fitness_data:
        data.append({
            "gym_member": row.gym_member,
            "gym_member_name": row.gym_member_name,
            "weight_in_kg": row.weight_in_kg,
            "calories_intake": row.calories_intake,
            "date": row.date
        })

    return data

def execute(filters=None):
    columns = [
        {
            "label": _("Gym Member"),
            "fieldname": "gym_member",
            "fieldtype": "Link",
            "options": "Gym Member",
            "width": 230
        },
        {
            "label": _("Gym Member Name"),
            "fieldname": "gym_member_name",
            "fieldtype": "Data",
            "width": 230
        },
        {
            "label": _("Date"),
            "fieldname": "date",
            "fieldtype": "Date",
            "width": 230
        },
        {
            "label": _("Weight (kg)"),
            "fieldname": "weight_in_kg",
            "fieldtype": "Float",
            "width": 230
        },
        {
            "label": _("Calories Intake"),
            "fieldname": "calories_intake",
            "fieldtype": "Int",
            "width": 230
        }
    ]

    # Get data based on selected filter
    data = get_data(filters)

    # Create chart
    chart_data = {
       "labels": [d["date"].strftime('%d-%m-%Y') for d in data],
        "datasets": [
            {
                "name": _("Weight (kg)"),
                "values": [d["weight_in_kg"] for d in data]
            },
            {
                "name": _("Calories Intake"),
                "values": [d["calories_intake"] for d in data]
            }
        ]
    }

    chart = {
        "data": chart_data,
        "type": "line"
    }

    # Return columns, data, and chart
    return columns, data, None, chart
