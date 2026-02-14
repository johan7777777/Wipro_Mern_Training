const login = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Login success");
            resolve();
        }, 2000);
    });
};

const fetchProfile = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Profile fetched");
            resolve();
        }, 2000);
    });
};

const fetchOrders = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Orders fetched");
            resolve();
        }, 2000);
    });
};
  
login()
    .then(() => fetchProfile())
    .then(() => fetchOrders())
    .then(() => {
        console.log("All done");
    })
    .catch(err => {
        console.log("Error:", err);
    });