// Copyright (c) 2021, Unilink Enterprise and contributors
// For license information, please see license.txt
cur_frm.disable_save()

frappe.ui.form.on('Gym Attendance Tool', {
	barcode_no(frm) {
		frappe.call({
			method:"mark_attendance", 
			doc:frm.doc,
			callback: function(r){
				var dis = "<h2>No Member found against Barcode No: <strong>"+frm.doc.barcode_no+"</strong>.</h2>";
				if (r.message){
					if(r.message[1] == "1"){
						dis = "<h2><strong>"+r.message[0]+"</strong> already Checked In Earlier.</h2>";
					}
					else{
						dis = "<h2><strong>"+r.message[0]+"</strong> Checked In at <strong>"+r.message[1].split('.')[0]+"</strong>.</h2>";
					}
					
				}
				frm.set_df_property("message", "options", dis);
				frm.refresh_field("message")
			}
		})
		frm.doc.barcode_no = "";
		frm.refresh_field("barcode_no")
	}
});
