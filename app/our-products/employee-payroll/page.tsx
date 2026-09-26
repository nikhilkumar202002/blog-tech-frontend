import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";
import EmployeePayrollIntro from "@/app/components/sections/our-products/employee-payroll/EmployeePayrollIntro";
import EmployeePayrollFeatures from "@/app/components/sections/our-products/employee-payroll/EmployeePayrollFeatures";

export default function EmployeePayrollPage() {
  return (
    <main className="w-full flex flex-col flex-shrink-0">
      <ProductBanner
        bgImage="/products/enroll-payroll/payroll-management-desktop.webp"
        mobileBgImage="/products/enroll-payroll/payroll-management-mobile.webp"
        titlePrefix={"Manage Your People.\n"}
        titleHighlight="Simplify Your Payroll."
        subtitle="People Management System"
        description="Manage employee information, attendance, leave, payroll, salary records and employee documentation from one centralized system."
        buttonText="Book Employee & Payroll Demo"
        buttonLink="/contact-us?product=employee-payroll"
      />
      <EmployeePayrollIntro />
      <EmployeePayrollFeatures />
    </main>
  );
}
