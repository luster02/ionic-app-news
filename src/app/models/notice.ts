export class Notice {
    constructor(
        id="",
        author= "",
        category= "",
        content= "",
        description= "",
        image= "",
        title= ""
    ){  
        id = this.id 
        author = this.author;
        category = this.category;
        content = this.content;
        description = this.description;
        image = this.image;
        title = this.title;    
    }
    id?: string;
    author: string;
    category: string;
    content: string;
    description: string;
    image: string;
    title: string;

}
