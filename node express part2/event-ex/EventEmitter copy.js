const EventEmitter = require("events");
const emitter = new EventEmitter();
//Listener
emitter.on("userRegistered" , (user)=>{
    console.log(`Welcome eamil sent to ${user}`)
});
emitter.on("paymentSuccess" , (amount)=>{
    console.log(`Payment of Rs. ${amount} is done`)
});
// Emit event
emitter.emit("userRegistered" , "Niti");
emitter.emit("paymentSuccess" , 2500);
/*
Multiple listeners
emitter.on("order placed" ,() => console.log("Email Sent"));
emitter.on("order placed" ,() => console.log("Inventory Updated"));
emitter.on("order placed" ,() => console.log("Logs Created for Auditing"));
*/