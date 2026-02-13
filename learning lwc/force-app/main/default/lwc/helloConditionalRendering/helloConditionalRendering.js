import { LightningElement } from 'lwc';

export default class HelloConditionalRendering extends LightningElement {
    isVisible = false;
    helloMethod = false;

    handleClick() {
        this.isVisible = true;
    }

    changeHandler(event) {
        const value = event.target.value;
        this.helloMethod = value === 'hello';
    }
}
