// Copyright (c) 2023, R Surya Prakash and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Invoice', {
	"gym_member": function(frm) {
		frappe.call({
			"method": "frappe.client.get",
			"args": {
				"doctype": "Gym Member",
				"name": frm.doc.gym_member
			},
			"callback": function(response) {
				var gym_member_doc = response.message;
				if (gym_member_doc) {
					// set the fetched details in a new instance of Gym Invoice Detail
					var invoice_detail = null;
					var gym_invoice_details = frm.doc.gym_invoice_detail || [];
					for (var i=0; i<gym_invoice_details.length; i++) {
						if (gym_invoice_details[i].document_name == gym_member_doc.membership_plan && 
						    gym_invoice_details[i].document_type == "Gym Membership") {
							invoice_detail = gym_invoice_details[i];
							break;
						}
					}

					if (!invoice_detail) {
						invoice_detail = frappe.model.add_child(frm.doc, "Gym Invoice Detail", "gym_invoice_detail");
					}

					invoice_detail.document_name = gym_member_doc.membership_plan;
					invoice_detail.document_type = "Gym Membership";
					invoice_detail.amount = gym_member_doc.membership_fees;
					invoice_detail.plan_start_date = gym_member_doc.membership_start_date;
					invoice_detail.plan_end_date = gym_member_doc.membership_end_date;

					var invoice_detail_2 = null;
					for (var i=0; i<gym_invoice_details.length; i++) {
						if (gym_invoice_details[i].document_name == gym_member_doc.gym_trainer_subscription_plan && 
						    gym_invoice_details[i].document_type == "Gym Trainer Subscription") {
							invoice_detail_2 = gym_invoice_details[i];
							break;
						}
					}

					if (!invoice_detail_2) {
						invoice_detail_2 = frappe.model.add_child(frm.doc, "Gym Invoice Detail", "gym_invoice_detail");
					}

					invoice_detail_2.document_name = gym_member_doc.gym_trainer_subscription_plan;
					invoice_detail_2.document_type = "Gym Trainer Subscription";
					invoice_detail_2.amount = gym_member_doc.total_subscription_amount;
					invoice_detail_2.plan_start_date = gym_member_doc.trainer_subscription_start_date;
					invoice_detail_2.plan_end_date = gym_member_doc.trainer_subscription_end_date;

					frm.refresh_field("gym_invoice_detail");
				}
			}
		});
	}
});
