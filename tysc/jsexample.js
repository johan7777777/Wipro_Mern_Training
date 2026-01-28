var userData = {
    id: 101,
    name: "Niti",
    salary: 54545,
    display: function () {
        return this.salary * 0.1;
    }
};
console.log("the id is :", userData.id);
console.log("the name is :", userData.name);
console.log("the updated bonus is :", userData.display());
console.log("the id is :", userData.id);
