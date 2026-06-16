export class User{
    id:number;
    name:string;
    email:string;
    private interests:Set<string>;
    constructor(id:number,name:string,email:string){
        this.id=id;
        this.name=name;
        this.email=email;
        this.interests=new Set<string>();
    }
    public addInterest(interest:string):void{
        this.interests.add(interest);
    }
    public removeInterest(interest:string):void{
        this.interests.delete(interest);
    }
    public getInterests():Set<string>{
        return this.interests;
    }

}