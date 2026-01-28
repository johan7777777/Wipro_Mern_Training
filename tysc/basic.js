var anExampleVariable = "Hello World";
console.log(anExampleVariable);
var User = /** @class */ (function () {
    function User() {
    }
    // input method
    User.prototype.input = function (username, password) {
        this.username = username;
        this.password = password;
    };
    // method to display output
    User.prototype.output = function () {
        console.log("Username:", this.username);
        console.log("Password:", this.password);
    };
    return User;
}());
var u1 = new User();
u1.input("johan", "12345");
u1.output();
