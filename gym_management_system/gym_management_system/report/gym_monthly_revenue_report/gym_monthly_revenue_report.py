# Copyright (c) 2023, R Surya Prakash and contributors
# For license information, please see license.txt

# from __future__ import unicode_literals
import frappe
from frappe import _


# def execute(filters=None):
#     columns = [
#         {
#             "label": _("Name"),
#             "fieldname": "name",
#             "fieldtype": "Link",
#             "options": "Gym Invoice",
#             "width": 120
#         },
#         {
#             "label": _("Gym Member"),
#             "fieldname": "gym_member",
#             "fieldtype": "Link",
#             "options": "Gym Member",
#             "width": 120
#         },
#         {
#             "label": _("Posting Date"),
#             "fieldname": "posting_date",
#             "fieldtype": "Date",
#             "width": 120
#         },
#         {
#             "label": _("Total"),
#             "fieldname": "total",
#             "fieldtype": "Currency",
#             "width": 120
#         }
#     ]

#     data = frappe.db.sql("""
#         SELECT name, gym_member, posting_date, total
#         FROM `tabGym Invoice`
#         """, as_dict=True)

#     return columns, data



def execute(filters=None):
    columns = [
        {
            "label": _("Invoice No"),
            "fieldname": "name",
            "fieldtype": "Link",
            "options": "Gym Invoice",
            "width": 180
        },
        {
            "label": _("Date"),
            "fieldname": "posting_date",
            "fieldtype": "Date",
            "width": 150
        },
        {
            "label": _("Gym Member"),
            "fieldname": "gym_member",
            "fieldtype": "Link",
            "options": "Gym Member",
            "width": 150
        },
        {
            "label": _("Member Name"),
            "fieldname": "member_name",
            "fieldtype": "Data",
            "width": 180
        },
        {
            "label": _("Mobile No"),
            "fieldname": "mobile_no",
            "fieldtype": "Data",
            "width": 150
        },
        {
            "label": _("Email ID"),
            "fieldname": "email_id",
            "fieldtype": "Data",
            "width": 150
        },
        {
            "label": _("Total"),
            "fieldname": "total",
            "fieldtype": "Currency",
            "width": 150
        }
    ]

    conditions = ""
    values = {}

    if filters:
        if filters.get("gym_invoice"):
            conditions += " AND gi.name = %(gym_invoice)s "
            values["gym_invoice"] = filters["gym_invoice"]

        if filters.get("gym_member"):
            conditions += " AND gi.gym_member = %(gym_member)s "
            values["gym_member"] = filters["gym_member"]

        if filters.get("month"):
            conditions += " AND MONTH(gi.posting_date) = %(month)s "
            values["month"] = filters["month"]

        if filters.get("year"):
            conditions += " AND YEAR(gi.posting_date) = %(year)s "
            values["year"] = filters["year"]

    data = frappe.db.sql(f"""
        SELECT gi.name, gi.gym_member, gi.member_name, gi.mobile_no, gi.email_id, gi.posting_date, gi.total
        FROM `tabGym Invoice` gi
        WHERE 1 = 1 {conditions} AND gi.docstatus = 1
        """, values, as_dict=True)

    return columns, data
