// Copyright (c) 2023, R Surya Prakash and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Member', {
	first_name: function(frm) {
            if(frm.doc.middle_name){
                if(frm.doc.last_name){
                    frm.set_value("full_name",frm.doc.first_name +" "+frm.doc.middle_name +" "+frm.doc.last_name)
                }
                else{
                    frm.set_value("full_name",frm.doc.first_name +" "+frm.doc.middle_name)
                }
            }
            else if(frm.doc.last_name){
                frm.set_value("full_name",frm.doc.first_name +" "+frm.doc.last_name)
            }
            else {
                frm.set_value("full_name",frm.doc.first_name)
            }
	},

	middle_name: function(frm) {
            if(frm.doc.middle_name){
                if(frm.doc.last_name){
                    frm.set_value("full_name",frm.doc.first_name +" "+frm.doc.middle_name +" "+frm.doc.last_name)
                }
                else{
                    frm.set_value("full_name",frm.doc.first_name +" "+frm.doc.middle_name)
                }
            }
            else if(frm.doc.last_name){
                frm.set_value("full_name",frm.doc.first_name +" "+frm.doc.last_name)
            }
            else {
                frm.set_value("full_name",frm.doc.first_name)
            }
	},

	last_name: function(frm) {
            if(frm.doc.middle_name){
                if(frm.doc.last_name){
                    frm.set_value("full_name",frm.doc.first_name +" "+frm.doc.middle_name +" "+frm.doc.last_name)
                }
                else{
                    frm.set_value("full_name",frm.doc.first_name +" "+frm.doc.middle_name)
                }
            }
            else if(frm.doc.last_name){
                frm.set_value("full_name",frm.doc.first_name +" "+frm.doc.last_name)
            }
            else {
                frm.set_value("full_name",frm.doc.first_name)
            }
	},
    
    membership_type: function(frm) {
        if (frm.doc.membership_plan) {

            var today = frappe.datetime.get_today();
            frm.set_value("membership_start_date", today);

            var start_date = frm.doc.membership_start_date;
            var end_date = frm.doc.membership_start_date;
            
            if (frm.doc.membership_type === "Monthly Plan") {
                end_date = frappe.datetime.add_months(start_date, 1);
            } else if (frm.doc.membership_type === "Quarterly Plan") {
                end_date = frappe.datetime.add_months(start_date, 3);
            } else if (frm.doc.membership_type === "Half-yearly Plan") {
                end_date = frappe.datetime.add_months(start_date, 6);
            } else if (frm.doc.membership_type === "Yearly Plan") {
                end_date = frappe.datetime.add_months(start_date, 12);
            } else {
                frappe.throw("Invalid membership type");
            }
            
            frm.set_value("membership_end_date", end_date);

            frm.set_value("payment_due_date", end_date);
            
        }
        else {
            frm.set_value("membership_start_date", "");
            frm.set_value("membership_end_date", "");
            frm.set_value("valid_number_of_days", "");
            frm.set_value("payment_due_date", "");
            frm.set_value("membership_status", "");
        }


        if (frm.doc.membership_start_date && frm.doc.membership_end_date) {
            var today = frappe.datetime.get_today();
            var valid_number_of_days = frappe.datetime.get_diff(frm.doc.membership_end_date , today );
            
            frm.set_value("valid_number_of_days", valid_number_of_days);

            if (valid_number_of_days < 0) {
                frm.set_value("valid_number_of_days", 0);
            }
        }

        if (frm.doc.__islocal) {
            frm.save();
        }
        else {
            frm.toggle_reqd('gym_trainer_subscription_plan', true);
            // frm.toggle_reqd('gym_workout_plan', true);
        }
    },
    
    refresh: function(frm) {
        if (frm.doc.membership_start_date && frm.doc.membership_end_date) {
            var today = frappe.datetime.get_today();
            var valid_number_of_days = frappe.datetime.get_diff(frm.doc.membership_end_date , today );
            
            frm.set_value("valid_number_of_days", valid_number_of_days);

            if (valid_number_of_days < 0) {
                frm.set_value("valid_number_of_days", 0);
            }
        }


        
        if (frm.doc.membership_plan) {

            var today = frappe.datetime.get_today();
            frm.set_value("membership_start_date", today);

            var start_date = frm.doc.membership_start_date;
            var end_date = frm.doc.membership_start_date;
            
            if (frm.doc.membership_type === "Monthly Plan") {
                end_date = frappe.datetime.add_months(start_date, 1);
            } else if (frm.doc.membership_type === "Quarterly Plan") {
                end_date = frappe.datetime.add_months(start_date, 3);
            } else if (frm.doc.membership_type === "Half-yearly Plan") {
                end_date = frappe.datetime.add_months(start_date, 6);
            } else if (frm.doc.membership_type === "Yearly Plan") {
                end_date = frappe.datetime.add_months(start_date, 12);
            } else {
                frappe.throw("Invalid membership type");
            }
            
            frm.set_value("membership_end_date", end_date);

            frm.set_value("payment_due_date", end_date);
            
        }
        else {
            frm.set_value("membership_start_date", "");
            frm.set_value("membership_end_date", "");
            frm.set_value("valid_number_of_days", "");
            frm.set_value("payment_due_date", "");
            frm.set_value("membership_status", "");
        }







        var child_table = frm.fields_dict.gym_trainer_rating.grid;
		child_table.wrapper.find(".grid-add-row").addClass("hide");
        


        if (frm.doc.__islocal) {
            frm.toggle_reqd('gym_trainer_subscription_plan', false);
        }
        else {
            frm.toggle_reqd('gym_trainer_subscription_plan', true);
        }
        

        frm.set_query('membership_plan', function() {
            return {
                filters: [
                    ['Gym Membership', 'membership_status', '=', 'Active']
                ]
            };
        });

        frm.set_query('gym_trainer_subscription_plan', function() {
            return {
                filters: [
                    ['Gym Trainer Subscription', 'subscription_status', '=', 'Active']
                ]
            };
        });


    },


    gym_trainer_subscription_plan: function(frm) {
        frappe.call({
            method: "gym_management_system.gym_management_system.doctype.gym_member.gym_member.get_gym_trainer_rating",
            args: {
                gym_member_name: frm.doc.name 
            },
            callback: function(response) {
                if (response && response.message) {
                    var gym_trainer_rating = response.message;
    
                    frm.set_value("gym_trainer_rating", gym_trainer_rating);
                }
            }
        });


    },


    subscription_type: function(frm) {
        if (frm.doc.membership_plan) {

            var today = frappe.datetime.get_today();
            frm.set_value("trainer_subscription_start_date", today);

            var start_date = frm.doc.trainer_subscription_start_date;
            var end_date = frm.doc.trainer_subscription_start_date;
            
            if (frm.doc.subscription_type === "Monthly") {
                end_date = frappe.datetime.add_months(start_date, 1);
            } else if (frm.doc.subscription_type === "Quarterly") {
                end_date = frappe.datetime.add_months(start_date, 3);
            }
            
            frm.set_value("trainer_subscription_end_date", end_date);
        }
        else {
            frm.set_value("trainer_subscription_start_date", "");
            frm.set_value("trainer_subscription_end_date", "");
        }

    },

	subscription_amount: function(frm) {
        if (frm.doc.subscription_type && frm.doc.subscription_amount) {
            var discount ;

            if (frm.doc.subscription_type === "Monthly") {
                discount = (frm.doc.subscription_amount / 100) * 5;
            } else if (frm.doc.subscription_type === "Quarterly") {
                discount = (frm.doc.subscription_amount / 100) * 10;
            } else {
                frappe.throw("Invalid Subscription Plan");
            }
            
            frm.set_value("discount", discount);
			frm.set_value("total_subscription_amount", frm.doc.subscription_amount - discount);
        }
        else {
            frm.set_value("discount", "");
			frm.set_value("total_subscription_amount", "");
        }
    },

    weight_in_kg: function(frm) {
		var weight_in_kg = frm.doc.weight_in_kg;
		var weight_in_lbs = weight_in_kg * 2.20462;

		frm.set_value("weight_in_lbs", weight_in_lbs);
	},
	
	weight_in_lbs: function(frm) {
		var weight_in_lbs = frm.doc.weight_in_lbs;
		var weight_in_kg = weight_in_lbs / 2.20462;
		
		frm.set_value("weight_in_kg", weight_in_kg);
	},
	
	height_in_cm: function(frm) {
		var height_in_cm = frm.doc.height_in_cm;
		var height_in_inches = height_in_cm * 0.393701;
		
		frm.set_value("height_in_inches", height_in_inches);
	},
	
	height_in_inches: function(frm) {
		var height_in_inches = frm.doc.height_in_inches;
		var height_in_cm = height_in_inches / 0.393701;
		
		frm.set_value("height_in_cm", height_in_cm);
	}


});
