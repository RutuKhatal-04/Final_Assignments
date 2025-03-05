export interface filterDtos{
    filter: { [key: string]: any } ;
    columns:string[];
    size:number;
    page:number;
    sort:string;
}


export class FilterDTOImpl implements filterDtos{
    filter: { [key: string]: any } = {};
    columns:string[]=["id","bookCode","title","description","publishedDate","price","authors","version","active","archive","uId"];
    size:number=10;
    page:number=1;
    sort:string="asc";


    constructor(init?: Partial<filterDtos>) {
        if (init) {
            this.filter = init.filter || this.filter;
            this.columns = init.columns || this.columns;
            this.size = init.size || this.size;
            this.page = init.page || this.page;
            this.sort = init.sort || this.sort;
        }
    }
}
