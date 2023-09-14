import { LightningElement } from 'lwc';

export default class CreateTaskAction extends LightningElement {
    isAction = true;

    handleClick(){
        this.refs.createToDo.handleParentClick();
    }
    closeAction(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}