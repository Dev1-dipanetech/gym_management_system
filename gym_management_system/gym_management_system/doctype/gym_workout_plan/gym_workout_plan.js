// Copyright (c) 2023, R Surya Prakash and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Workout Plan', {
	refresh: function(frm) {
		if (!frm.doc.__islocal) {
            frm.set_df_property('plan_type', 'read_only', 1);
        } else {
            frm.set_df_property('plan_type', 'read_only', 0);
        }
	}
});
