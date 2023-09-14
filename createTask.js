import { LightningElement, api } from 'lwc';
import{ShowToastEvent} from 'lightning/platformShowToastEvent';
import saveToDo from '@salesforce/apex/ToDoController.saveToDo';


export default class CreateTask extends LightningElement {
    @api targetParent;
    taskTitle;
    dueDate;
    showDueDate = false;
    showSave = false;

    connectedCallback(){
        console.log("###Target Parent:" + this.targetParent);
    }


    handleOnChange(event){
        const fieldName = event.target.name;
        if(fieldName === 'taskTitle'){
            this.taskTitle = event.target.value;
            if(this.taskTitle != ""){
                this.showDueDate = true;
            } else {
                this.showDueDate = false;
            }
        }
        else if(fieldName === 'dueDate'){
            this.dueDate = event.target.value;
            this.dueDate != "" && this.targetParent !=true
             ? (this.showSave = true) 
             :(this.showSave = false);
              
        }
    }
    handleClick(){
        console.log("###Buttons click on child");
        saveToDo({title: this.taskTitle, dueDate: this.dueDate})
        .then((result) => {
            if(result === "success"){
                this.taskTitle = "";
                this.dueDate = "";
                const evt = new ShowToastEvent({
                    title: "success",
                    message: "A new item has been added in  your todo list",
                    variant: "success"
                });
                this.dispatchEvent(evt);
            }
        })
        .catch((error) =>{
            console.log("error:", error);
            const evt = new ShowToastEvent({
                title: "error",
                message: error.body.message,
                    variant: "error"
            });
            this.dispatchEvent(evt);
        });
    }
    @api
    handleParentClick(){
        this.handleClick();
    }
}