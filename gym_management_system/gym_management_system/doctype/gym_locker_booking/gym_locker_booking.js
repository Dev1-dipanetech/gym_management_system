// Copyright (c) 2023, R Surya Prakash and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Locker Booking', {
    locker_number: function(frm) {
        if (frm.doc.locker_number && frm.doc.booking_type) {

            var today = frappe.datetime.get_today();
            frm.set_value("booking_start_date", today);

            var start_date = frm.doc.booking_start_date;
            var end_date = frm.doc.booking_start_date;
            
            if (frm.doc.booking_type === "Monthly") {
                end_date = frappe.datetime.add_months(start_date, 1);
            } else if (frm.doc.booking_type === "Quarterly") {
                end_date = frappe.datetime.add_months(start_date, 3);
            } else {
                frappe.throw("Invalid membership type");
            }
            
            frm.set_value("booking_end_date", end_date);
        }
        else {
            frm.set_value("booking_start_date", "");
            frm.set_value("booking_end_date", "");
        }

    },

    booking_type: function(frm) {
        if (frm.doc.locker_number && frm.doc.booking_type) {

            var today = frappe.datetime.get_today();
            frm.set_value("booking_start_date", today);

            var start_date = frm.doc.booking_start_date;
            var end_date = frm.doc.booking_start_date;
            
            if (frm.doc.booking_type === "Monthly") {
                end_date = frappe.datetime.add_months(start_date, 1);
            } else if (frm.doc.booking_type === "Quarterly") {
                end_date = frappe.datetime.add_months(start_date, 3);
            } else {
                frappe.throw("Invalid membership type");
            }
            
            frm.set_value("booking_end_date", end_date);
        }
        else {
            frm.set_value("booking_start_date", "");
            frm.set_value("booking_end_date", "");
        }

    },

    // refresh: function(frm) {
    //     frm.set_query('locker_number', function() {
    //         return {
    //             filters: [
    //                 ['Gym Locker', 'availability_status', '=', 'Available']
    //             ]
    //         };
    //     });

	// 	frm.set_query('gym_member', function() {
    //         return {
    //             filters: [
	// 				['Gym Member', 'membership_plan', 'is', 'set'],
    //                 ['Gym Member', 'gym_trainer_subscription_plan', 'is', 'set'],
	// 				['Gym Member', 'status', '=', 'Active'],
    //             ]
    //         };
    //     });
    // }
});
