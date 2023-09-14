import { LightningElement, wire } from 'lwc';
import{ShowToastEvent} from 'lightning/platformShowToastEvent';
import getToDoList from '@salesforce/apex/ToDoController.getToDoList';
export default class Todolists extends LightningElement {
    todolist;
    taskStatus = "pending";
    @wire(getToDoList, {taskStatus:"$taskStatus"})
    wiredToDoList(result) {
        this.wiredToDoListResult = result;
        if(result.data){
            this.todolist = result.data;
        } else if(result.error) {
            const evt = new ShowToastEvent({
                title: "error",
                message: result.body.message,
                    variant: "error"
            });
            this.dispatchEvent(evt);

        }
    }
}