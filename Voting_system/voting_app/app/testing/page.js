"use client";

import React, { useState, useEffect } from "react";
import { getContract } from "@/setup/contractSetup";
import TestString from "@/components/TestString";
import AdminSection from "@/components/AdminSection";
import UserSection from "@/components/UserSection";

export default function App() {
	return (
		<div>
			<TestString />
			<AdminSection />
			<UserSection />
		</div>
	);
}
