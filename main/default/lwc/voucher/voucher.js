import { LightningElement,wire,track,api } from 'lwc';
import getVoucherList from '@salesforce/apex/FetchData.vouchlist';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import getNext from '@salesforce/apex/FetchData.getNext';
import getPrevious from '@salesforce/apex/FetchData.getPrevious';
import TotalRecords from '@salesforce/apex/FetchData.TotalRecordsV';
export default class Voucher extends LightningElement {
    
    @track vouchers = [];
    error;
    refreshTable;
    sstext="";
    @track v_Offset=0;
    @track v_TotalRecords;
    @track page_size = 5;
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
        TotalRecords({stext: this.sstext}).then(result=>{
            this.v_TotalRecords = result;
        });
        this.fetch();
    
    }
    previousHandler2(){
        
        console.log(this.v_TotalRecords);
        if(this.v_Offset>0)
        getPrevious({v_Offset: this.v_Offset, v_pagesize: this.page_size}).then(result=>{
            this.v_Offset = result;
            console.log(this.v_Offset);
            this.fetch();
          //  return refreshApex(this.getEmployeeList);
        });
    }
    nextHandler2(){
        
        console.log(this.v_TotalRecords);
        if(this.v_Offset<(this.v_TotalRecords-this.page_size))
        getNext({v_Offset: this.v_Offset, v_pagesize: this.page_size}).then(result=>{
            this.v_Offset = result;
            console.log(this.v_Offset);
            this.fetch();
           // return refreshApex(this.getEmployeeList);
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
                    message: did_str + ' Voucher is deleted.',
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
    TotalRecords({stext: this.sstext}).then(result=>{
        this.v_TotalRecords = result;
    });
    this.v_Offset=0;
    this.fetch();
}
fetch(){
    getVoucherList({
        stext: this.sstext,
        v_Offset: this.v_Offset,
        v_pagesize: this.page_size
    })
    .then(result => {
        // set @track contacts variable with return contact list from server  
        this.refreshTable = result;
        this.vouchers = result;
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
        this.vouchers = null;
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
        window.location.assign('https://rishav-jais-cma-dev-ed.lightning.force.com/lightning/r/Voucher__c/'+this.id_str+'/view');
    }

}