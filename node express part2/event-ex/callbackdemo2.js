function login(cb){
    setTimeout(()=>{
        console.log("Login success");
        cb();
    },2000)
}
function fetchProfile(cb){
    setTimeout(()=>{
        console.log("Profile fetched");
        cb();
    },2000)
}
function fetchOrders(cb){
    setTimeout(()=>{
        console.log("Orders Fetched");
        cb();
    },2000)
}
login(()=>{
    
fetchProfile(()=>{
 fetchOrders(()=>{
 console.log("All done")
 });
});


});

//Instead of this we can use Promise  promise has 3 states :
/*
Pending
Fulfilled
rejected
 */
const login =()=> new Promise(resolve=>{
    setTimeout(()=>{
        console.log("Login success");
        resolve();
    },2000)
});