# -*- coding: utf-8 -*-
# Copyright (c) 2021, Unilink Enterprise and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class GymAttendanceTool(Document):
	def mark_attendance(self):
		if frappe.db.exists("Gym Member", {'barcode_no':self.barcode_no}):
			mem = frappe.db.get_value("Gym Member", {'barcode_no':self.barcode_no}, ["name", "member_name"])
			if not frappe.db.exists("Gym Attendance", {"member": mem[0], "attendance_date":frappe.utils.nowdate()}):
				att = frappe.new_doc("Gym Attendance")
				att.member = mem[0]
				att.attendance_date = frappe.utils.nowdate()
				att.check_in = frappe.utils.now().split(' ')[1]
				att.save()
				return mem[1], frappe.utils.now().split(' ')[1]
			else:
				return mem[1], "1"
