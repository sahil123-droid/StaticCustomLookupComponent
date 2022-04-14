import { LightningElement, api, track } from 'lwc';
import fetchData from '@salesforce/apex/MyCustomLookupController.fetchData';

export default class MyCustomLookup extends LightningElement {
    @api objectName;
    @api field;
    searchString;
    @api records = [];
    showData;
    selectedRecord;
    showPill;
    showSpinner

    selectElement(event){
        console.log('eve',event.currentTarget.dataset.key);
        let key = event.currentTarget.dataset.key;
        let val;
        for(let i=0;i<this.records.length;i++){
            if(this.records[i].Id === key){
                this.selectedRecord = this.records[i];
                val = this.records[i];
                break;
            }
        }
        this.showPill = true;
        this.showData = false;
        const selectedEvent = new CustomEvent('selected', { detail: { info : val } });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    removeItem(){
        this.selectedRecord = null;
        this.showPill = false;
    }

    clearData(){
        this.showData = false;
        this.records = [];
        this.searchRecords = '';
    }
    searchRecords(event) {
        this.showSpinner = true;
        this.searchString = event.target.value;
        console.log('object name', this.objectName);
        console.log('field', this.field);
        console.log('search string', this.searchString);
        fetchData({
            objectName: this.objectName,
            field: this.field,
            searchTerm: this.searchString
        })
            .then(result => {
                if(result.length > 0) {
                    this.showData = true;
                    this.records = result;
                }
                else{
                    this.showData = false;
                }
                this.showSpinner = false;
            })
            .catch(error => {
                console.log('err',error);
            });
    }
}