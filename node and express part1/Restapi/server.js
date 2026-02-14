
   const express = require('express');
        const app = express();

const {body, validationResult} = require("express-validator")
         app.use(express.json()); 

let products =[{id:1, name:"laptop",email:"abc@gmail.com"}];
         //rest endpoint / api
           app.get("/health"  ,(req,res)=>{
            // its giving the json response and it is stateless
            res.json({status:"UP"});
        });

         app.post("/postproduct"  ,(req,res)=>{
            products.push(req.body);
            res.status (201).send("Product inserted");
        })
        app.get("/getproduct", (req,res)=>{

            res.json(products);
        })
        app.put("/product/:id" , (req,res)=>{

         const products =  products.find(p=> p.id == req.params.id)
              products.name =  req.body.name;
            res.send("Product  updated");
        })

           app.delete("/product/:id" , (req,res)=>{
           const id =  req.params.id;
           console.log(id);
          products =  products.filter(p=> p &&  p.id != id)
             
            res.send("Product  deleted");
        })

app.post("/postproduct" , body("email").isEmail() ,(req,res)=>{
    const errors  = validationResult(req);https://insight.adsrvr.org/track/clk?imp=e7310376-c56b-4306-a330-58ee0ba941bd&ag=rht3w0k&sfe=1bbe7ec9&sig=xnQeLxch3PLhymoXUfXTDRc5zLrEn7RnugAzRP0jHpE.&crid=0qvmvz8b&cf=10081081&fq=0&t=1&td_s=codeshare.io&rcats=&mste=&mfld=4&mssi=&mfsi=&sv=buysellads&uhow=158&agsa=&wp=0.036829017&rgz=631001&dt=PC&osf=Windows&os=Windows10&br=Chrome&svpid=1440&rlangs=en&mlang=&did=&rcxt=Other&tmpc=30.08000000000004&vrtd=&osi=&osv=&daid=&dnr=0&vpb=&crrelr=&npt=&cc=2~KLUv_WMdqREMHQLVDgBDk0pREdSmIrzA5RTdcoqicoJwubao3JqoHNstxyWBFe5l9ADrqhESK6qXEIOXC85TFRA2B1M-BBVhgvCTPzDBjlBhk8zrrrjq3rorHphqc0jSDQciPEe0NImU5otL6gkCjxf4iUseUGEM0DTCiCU0JrRKBoCgQo5pP6P1h7_v8Xnffd_O9Tyvafz3cRrX6dyOrwhQg4nOlYYTcwjloNHkhRi0WyffdXXPANb1hQYmg_l9tBei0owkaug8ItRhixEPNlzbr8xmqyyS4NhiXL7-SWybOW6GWPJhtSCOnzo02mzq1N2NCNaONJrSdpyLfWITLeni1eAHDiLCJpydrUpqFS_MrgkDSGUwkrdHhaaZKJbC7jHs_2-HIJcspzT6L-FlVYUPSK6q_fa6L1gQM_yACwje1MdJKYyYebvVH4lmkxVWRhep-0HXPDaxpBCatQEUH8dH1mavxbtbSqtwe5hQE2xpvRXZ8065L2Jx18W25TbvqNgiuBVMCf2La68Pp6-JWbkTTefyg6wj8PNvELLI7M9iGBtbiS4uQ0-5wglM4IYAsId-OR2Qk6XxijvSevStkrIE2AOziCHsL2x4HPOpfZC-bLEQQd3sUf7IIMxx7fMMJK56DnhmzQY.&dur=1~KLUv_WMFoCgk1ABtBgBDSiU2Oqhgh08EF1Bh-3vHc2_v7Yb28gz7vxRmvTHkPudK8WdJCRywQoDOERuSjsH8k5GSUwa9qUkAk5zxFsDRbl5tiT6eALiuqSoKE46Y5AmAexm5Yr7rpiYQ6UHMawLJu4AJPxYR5F1gBBFK5PCe2MCHHS8AHKwrUQzrNE1URvRQQwsvAG68J5zOEVuR0lR-olOZpppkTBH8290tBD-awHSvBG0bXCGCdZ_A8cktu0jV-tlIYFdXKRrwA34Q-axIWK2K6pxIOh-HJl8E&durs=MHwgRO&bdc=14&testid=iavc1%20&fpa=123&pcm=3&ict=CellularNetwork4G&said=1615fe994a848e93&auct=1&tail=1&r=https://servedby.flashtalking.com/click/7/296954;10188547;5298711;210;0/?gdpr=0&ft_partnerimpid=e7310376-c56b-4306-a330-58ee0ba941bd&ft_impID=8D217C21-4821-DBD7-2C5F-CAC8AA43E368&ft_section=adv=vgfu281|cam=rrswwhf|adg=rht3w0k|imp=e7310376-c56b-4306-a330-58ee0ba941bd|tdid=f84599ec-8ba9-47fd-9c76-b6eebb38ddf6|os=2|dma=|adf=300x250&ft_custom=imp=e7310376-c56b-4306-a330-58ee0ba941bd|tdid=f84599ec-8ba9-47fd-9c76-b6eebb38ddf6|adg=rht3w0k|site=codeshare.io|sv=buysellads|dma=|adf=300x250&g=62659B9C29A7D9&random=466909.96561337553&ft_width=300&ft_height=250&url=https://www.adobe.com/in/acrobat/free-trial-download.html?sdid=X6FJHM6D&mv=display&mv2=display
    if(!errors.isEmpty())
    {return res.status(400).json(errors.array());
    }
        else
        {
            products.push(req.body);
            res.status (201).send("Product inserted");
    }
        })

        app.use((err,req,res,next)=>{
                res.status(500).json({message: "Internal server error"})
        })

        fetch("http://localhost:3000/products")
        .then(res=>res.json())
        .then(data=>console.log(data));

        app.listen(3000);
        console.log("app started");