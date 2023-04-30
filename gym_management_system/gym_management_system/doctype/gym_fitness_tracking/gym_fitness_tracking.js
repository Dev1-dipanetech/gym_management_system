// Copyright (c) 2023, R Surya Prakash and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Fitness Tracking', {
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
	},

	chest_in_cm: function(frm) {
		var chest_in_cm = frm.doc.chest_in_cm;
		var chest_in_inches = chest_in_cm * 0.393701;
		
		frm.set_value("chest_in_inches", chest_in_inches);
	},
	
	chest_in_inches: function(frm) {
		var chest_in_inches = frm.doc.chest_in_inches;
		var chest_in_cm = chest_in_inches / 0.393701;
		
		frm.set_value("chest_in_cm", chest_in_cm);
	},

	waist_in_cm: function(frm) {
		var waist_in_cm = frm.doc.waist_in_cm;
		var waist_in_inches = waist_in_cm * 0.393701;
		
		frm.set_value("waist_in_inches", waist_in_inches);
	},
	
	waist_in_inches: function(frm) {
		var waist_in_inches = frm.doc.waist_in_inches;
		var waist_in_cm = waist_in_inches / 0.393701;
		
		frm.set_value("waist_in_cm", waist_in_cm);
	},
});
