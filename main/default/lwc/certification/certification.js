import { LightningElement,wire,track,api } from 'lwc';
import getCertificationList from '@salesforce/apex/FetchData.certlist';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
export default class Certification extends LightningElement {

    @track certifications = [];
    error;
    refreshTable;
    sstext="";
    offs=0;
    @track id_str;
    // @wire(getEmployeeList)
    // Employee(result) {
    //     this.refreshTable = result;
    //     if (result.data) {
    //         this.employees = result.data;
    //         this.error = undefined;
    //     } else if (result.error) {
    //         this.employees = undefined;
    //         this.error = result.error;
    //         console.log(this.error);
    //     }
    // }
    connectedCallback(){
        getCertificationList({
            stext: this.sstext
        })
        .then(result => {
            // set @track contacts variable with return contact list from server  
            this.refreshTable = result;
            this.certifications = result;
        })
        .catch(error => {
            // display server exception in toast msg 
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            });
            this.dispatchEvent(event);
            // reset contacts var with null   
            this.certifications = null;
        });
    
    }
    removeItem(event) {
        var ctarget = event.currentTarget;
        this.id_str = ctarget.dataset.value;
        console.log('remove '+this.id_str);
      //  window.location.assign('https://rishav-jais-cma-dev-ed.lightning.force.com/lightning/r/Employee__c/'+this.id_str+'/view');
    }
    /*
    deleteEmp(currRow) {
        deleteRecord(currRow.Id).then(() => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Deleted',
                message: 'Record Deleted !',
                variant: 'success'
            }));
            return refreshApex(this.refreshTable);
        }).catch(error => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: 'Record could not be Deleted !',
                variant: 'error'
            }));
        });
    }
    */
    deleteEmp(event){
        var ctarget = event.currentTarget;
        var did_str = ctarget.dataset.value;
        console.log('delete '+did_str);
        // deleteEmployeeList({lstEmpIds : did_str})
        // .then(result => {
        //     //this.isTrue = false;
        //     this.dispatchEvent(
        //         new ShowToastEvent({
        //         title:'Successfully deleted!',
        //         message: did_str + ' Employee is deleted.',
        //         variant: 'success'
        //     }),
        // );
        // return refreshApex(this.refreshTable);
        // })
        deleteRecord(did_str)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Successfully deleted!',
                    message: did_str + ' Certificate is deleted.',
                    variant: 'success',
                }),
            );
           // return refreshApex(this.refreshTable);
           eval("$A.get('e.force:refreshView').fire();");
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while getting Certificates', 
                    message: error.message, 
                    variant: 'error'
                }),
            );
        });
    }
@track isedit;
isedit=false;
editEmp(event){
    var ctarget = event.currentTarget;
    this.id_str = ctarget.dataset.value;
    console.log('edit '+this.id_str);
    this.isedit=true;
   
}
handleEmployeeEdited(){
    this.isedit=false;
   // return refreshApex(this.refreshTable);
   eval("$A.get('e.force:refreshView').fire();");
}
handleChange(event){
    this.sstext = event.target.value;
    console.log(this.sstext);
    getCertificationList({
        stext: this.sstext
    })
    .then(result => {
        // set @track contacts variable with return contact list from server  
        this.refreshTable = result;
        this.certifications = result;
    })
    .catch(error => {
        // display server exception in toast msg 
        const event = new ShowToastEvent({
            title: 'Error',
            variant: 'error',
            message: error.body.message,
        });
        this.dispatchEvent(event);
        // reset contacts var with null   
        this.certifications = null;
    });
    //return refreshApex(this.refreshTable);
}
addEmp(){
        this.id_str = null;
    console.log('edit '+this.id_str);
    this.isedit=true;
   
}
viewrec(event) {
        var ctarget = event.currentTarget;
        this.id_str = ctarget.dataset.value;
        console.log('view '+this.id_str);
        window.location.assign('https://rishav-jais-cma-dev-ed.lightning.force.com/lightning/r/Certification__c/'+this.id_str+'/view');
    }
    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }

}