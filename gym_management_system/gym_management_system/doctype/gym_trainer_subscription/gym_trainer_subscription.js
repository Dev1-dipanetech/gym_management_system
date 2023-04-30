// Copyright (c) 2023, R Surya Prakash and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Trainer Subscription', {
    subscription_plan: function(frm) {
		var child_table = frm.fields_dict.gym_trainer.grid;
		var child_table_rows = child_table.grid_rows.length;

		if (frm.doc.subscription_plan === "Basic Trainer Plan") {
			// Disable child table "Add Row" button if one row is already created, else enable it
			if (child_table_rows > 0) {
				child_table.wrapper.find(".grid-add-row").addClass("hide");
			} else {
				child_table.wrapper.find(".grid-add-row").removeClass("hide");
			}
		} else {
			// Enable child table "Add Row" button
			child_table.wrapper.find(".grid-add-row").removeClass("hide");
		}



        
        if (frm.doc.subscription_plan == "Basic Trainer Plan") {
            // Hide the "subscription_type" field
            frm.set_value("subscription_type", "");
        } 

	},
    
    refresh: function(frm) {
		var child_table = frm.fields_dict.gym_trainer.grid;
		var child_table_rows = child_table.grid_rows.length;

		if (frm.doc.subscription_plan === "Basic Trainer Plan") {
			// Disable child table "Add Row" button if one row is already created, else enable it
			if (child_table_rows > 0) {
				child_table.wrapper.find(".grid-add-row").addClass("hide");
			} else {
				child_table.wrapper.find(".grid-add-row").removeClass("hide");
			}
		} else {
			// Enable child table "Add Row" button
			child_table.wrapper.find(".grid-add-row").removeClass("hide");
		}



        if (!frm.doc.__islocal) {
            frm.set_df_property('subscription_plan', 'read_only', 1);
        } else {
            frm.set_df_property('subscription_plan', 'read_only', 0);
        }
	},


});
