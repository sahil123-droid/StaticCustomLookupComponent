import { LightningElement } from 'lwc';

export default class TestComponent extends LightningElement {
    handleSelected(event){
        console.log('event',JSON.parse(JSON.stringify(event.detail.info)));
    }
}