const anExampleVariable = "Hello World"
console.log(anExampleVariable)
class User {
    username: string;
    password: string;
 // input method
    input(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    // method to display output
    output() {
        console.log("Username:", this.username);
        console.log("Password:", this.password);
    }
}
let u1 = new User();
u1.input("johan", "12345");
u1.output();

