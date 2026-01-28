JSON -- It is a lightweight data- interchange format used to store and exchange data between client and Server
though there are different other sources too -- xml , csv ,mysql

format of json   :   "key":"stringvalue"  or    "key":numbervalue

JSON.parse(jsonString) -- converts json string to js object -- mainly we use when receiving the data from a server
JSON.stringify(obj) -- converts js object to json string -- mainly used when sending data to a server.



Asynchronous / Synchronous Based:

Sysnchronous --  when one execution will get completed then the other execution will take place --- Blocker 
               line by line , if there is any blocker then in that case the rest of the code will not work  

			   it is slow in process

			   XMLHttpRequest(sync)

Asynchronous -- It's a non-blocker , next code runs immediately 
We can implement asynchronous using
fetch() , using Promise() instead of fetch() , asyn/await , XMLHttpRequest(async)

basically fetch() will return a Promise Object and 
		 .then() will be called on that Promise object when it's fulfilled ( means data is received) 
		 .catch() will run if the Promise is rejected(due to wrong api , network error)