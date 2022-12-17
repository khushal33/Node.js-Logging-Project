let products = require('./products') 
let commonFun = require('../core/commonFun')
let lfs = require('../core/log-file-system')

const getProducts = (req) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            resolve(products)
        }catch(err){
            reject(err)
        }
    })
}

const storeProducts = (req) =>{
    return new Promise(async (resolve,reject)=>{
        try{
             products.push(req.body)
            let username = "Khushal Patil"
            let msg = {status:true,message:"product store successfully"}
             lfs.logs(req,username,"Query",msg,commonFun.getIp(req),function(err,data){
                if(err){
                    console.log("log error : ",err);
                }else{
                    console.log("log data : ",data);
                }
            });
            resolve({status:true,message:"product store successfully"})
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {getProducts,storeProducts}