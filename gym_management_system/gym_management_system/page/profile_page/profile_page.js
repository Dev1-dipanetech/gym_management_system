frappe.pages['profile-page'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Profile Page',
		single_column: true
	});


	page.set_title('User Profile')

	$(frappe.render_template("profile_page", {})).appendTo(page.body);
}