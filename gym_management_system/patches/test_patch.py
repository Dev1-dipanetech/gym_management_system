import frappe

def execute():
    ls = frappe.get_list(doctype = 'Gym Workout Plan')
    
    for data in ls:
        doc = frappe.get_doc('Gym Workout Plan', data.name)
        doc.description = "hello testing patches"
        doc.save()