
import express, { Request, Response } from 'express';
import { handleFilterdata, Items,insertdata } from './logic';
import {connection} from './postgres/postgres';
connection();
const app=express();
app.use(express.json())

app.post('/data',(req,res)=>{
    const data:Items[]=req.body.items;
    const result=handleFilterdata(data)
    result.forEach(orderId => {
        insertdata(orderId);
      });
    res.status(200).json({
        status:"success",
        data:{
            result:result
        }
    })
})
app.listen(8000,()=>console.log('server started'))