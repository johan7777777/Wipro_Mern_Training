class Employee {
    constructor(id, name, basicPay, workingDays, bonus = 0) {
        this.id = id;
        this.name = name;
        this.basicPay = basicPay;
        this.workingDays = workingDays;
        this.bonus = bonus;
    }

    calculateSalary(totalWorkingDays = 22) {
        // Earned salary based on working days
        const perDaySalary = this.basicPay / totalWorkingDays;
        const earnedSalary = perDaySalary * this.workingDays;

        // a) Gross Salary
        const grossSalary = earnedSalary + this.bonus;

        // b) Tax Deduction
        let taxRate = grossSalary <= 30000 ? 0.10 : 0.20;
        const taxAmount = grossSalary * taxRate;

        // c) Net Salary
        const netSalary = grossSalary - taxAmount;

        return {
            employeeId: this.id,
            name: this.name,
            earnedSalary: earnedSalary.toFixed(2),
            bonus: this.bonus.toFixed(2),
            grossSalary: grossSalary.toFixed(2),
            taxDeduction: taxAmount.toFixed(2),
            netSalary: netSalary.toFixed(2)
        };
    }
}

// Example usage
const employees = [
    new Employee(1, "Alice", 30000, 20, 2000),
    new Employee(2, "Bob", 25000, 22, 1500),
    new Employee(3, "Charlie", 28000, 18, 1000)
];

employees.forEach(emp => {
    console.log(emp.calculateSalary());
});