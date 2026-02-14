const EventEmitter = require("events");
const emitter = new EventEmitter();
//Listener
// emitter.on("Order Placed" , (orderId)=>{
//     console.log(`Order ${orderId} processed`)
// });
// emitter.on("Order Placed" , (orderId)=>{
//     console.log(`Email sent for order ${orderId}`)
// });
// emitter.on("Order Placed" , (orderId)=>{
//     console.log(`Inventory updated for order ${orderId}`)
// });
const orderPlaced = async () => {
  return new Promise(resolve => setTimeout(resolve, 500));
};

const sendEmail = async () => {
  return new Promise(resolve => setTimeout(resolve, 300));
};

const updateInventory = async () => {
  return new Promise(resolve => setTimeout(resolve, 200));
};
//listener
emitter.on("Order Placed" , (data)=>{
    console.log("Listener1 started");
    console.log(`Order ${data.orderId} processed`)
});
emitter.on("Order Placed" , (data)=>{
     console.log("Listener2 started");
    console.log(`Email sent for order ${data.user}`)
});
emitter.on("Order Placed" , (data)=>{
     console.log("Listener3 started");
    console.log(`Inventory updated for order ${data.orderId}`)
});

//Asynchronous call
emitter.on("Order Placed" , async (data)=>{
    await orderPlaced();
    console.log("Listener1 started");
    console.log(`Order ${data.orderId} processed`)
});
emitter.on("Order Placed" , async (data)=>{
    await sendEmail();
     console.log("Listener2 started");
    console.log(`Email sent for order ${data.user}`)
});
emitter.on("Order Placed" , async (data)=>{
    await updateInventory();
     console.log("Listener3 started");
    console.log(`Inventory updated for order ${data.orderId}`)
});
// Emit event
// emitter.emit("Order Placed" , 101);
console.log("Before Emit");
emitter.emit("Order Placed" ,{
    user:"Niti Dwivedi",
    orderId: 101
});
console.log("After Emit");
/*
Multiple listeners
emitter.on("order placed" ,() => console.log("Email Sent"));
emitter.on("order placed" ,() => console.log("Inventory Updated"));
emitter.on("order placed" ,() => console.log("Logs Created for Auditing"));
*/