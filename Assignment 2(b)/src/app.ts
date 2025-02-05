import express,{Request,Response} from 'express';
import {Employee, filterdata,finddata,flatMapdata,getUniqueHobbies,groupByHobbies,includdata,mapdata,Person,reducedata, shiftHobbies, sortByAge} from "./logic";
const app=express();
app.use(express.json());

app.post("/filter",async(req:Request,res:Response)=>{
    const emp=req.body;
    let result=filterdata(emp)
    res.json(result)
})

app.post("/mapdata",async(req:Request,res:Response)=>{
    const emp=req.body;
    let result=mapdata(emp)
    res.json(result)
})

app.post("/reducedata",async(req:Request,res:Response)=>{
    const emp=req.body;
    let result=reducedata(emp)
    res.json(result)
})



app.post("/finddata",async(req:Request,res:Response)=>{
    const emp=req.body;
    let result=finddata(emp)
    console.log(result)
    res.json(result)
})


app.post("/includdata",async(req:Request,res:Response)=>{
    const emp=req.body;
    let result=includdata(emp)
    res.json(result)
})




app.post("/mapdata1",async(req:Request,res:Response)=>{
    console.log(req.body);
    const person:Person[]=req.body;
    let result=flatMapdata(person)
    console.log(result)
    res.json(result)
})


app.post("/groupbyhobbies", async (req: Request, res: Response) => {
    const persons: Person[] = req.body;
    let result = groupByHobbies(persons);
    res.json(result);
  });

  app.post("/sortByAge", async (req: Request, res: Response) => {
    const employee: Employee[] = req.body;
    let result = sortByAge(employee);
    res.json(result);
  });

  app.post("/gethobbies", async (req: Request, res: Response) => {
    const persons: Person[] = req.body;
    let result = getUniqueHobbies(persons);
    res.json(result);
  });

  app.post("/shifthobbies", async (req: Request, res: Response) => {
    const persons: Person[] = req.body;
    let result = shiftHobbies(persons);
    res.json(result);
  });


const PORT=8000
app.listen(PORT,()=>console.log("Server connected"))
