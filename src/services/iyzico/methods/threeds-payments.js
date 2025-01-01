import iyzipay from "../connection/iyzipay"; 

export const initializePayment = (data) =>{
    return new Promise ((resolve,reject) =>{
        iyzipay.threedsInitialize.create(data,(err,result)=>{
            if(err){
                reject(err);
            }else{
                reject(result);
            }
        })
    })
}

export const completePayment = (data)=>{
    return new Promise ((resolve,reject) =>{
        iyzipay.completePayment.create(data,(err,result)=>{
            if(err){
                reject(err);
            }else{
                reject(result);
            }
        })
    })
}