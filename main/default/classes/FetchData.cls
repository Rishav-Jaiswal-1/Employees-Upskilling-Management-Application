public with sharing class FetchData {
    public FetchData() {

    }
    @AuraEnabled
    public static List<Certification__c> certlist(String stext){
        
        string searchKey = '%' + stext + '%';
        return [SELECT Id,Name, Cost__c, Cert_Name__c,Comments__c FROM Certification__c  where Name like: searchKey ORDER BY Id  LIMIT 10 OFFSET 0];
    }
    @AuraEnabled
    public static List<Voucher__c> vouchlist(String stext,Integer v_Offset, Integer v_pagesize){
        
        string searchKey = '%' + stext + '%';
        return [SELECT Id,Name,Voucher_Id__c, Voucher_Cost__c, Certification__r.Cert_Name__c,Active__c,Comments__c,Validity__c FROM Voucher__c  where (Name like: searchKey) OR (Voucher_Id__c like: searchKey) OR (Active__c like: searchKey) ORDER BY Id  limit :v_pagesize OFFSET :v_Offset];
    }
    @AuraEnabled
    public static List<Certification_Request__c> certreqlist(String stext,Integer v_Offset, Integer v_pagesize){
        
        string searchKey = '%' + stext + '%';
        return [SELECT Id,Name,Certification__r.Cert_Name__c, Employee__r.Name, Status__c,Voucher__r.Voucher_Id__c,Comments__c,Due_Date__c FROM Certification_Request__c  where (Name like: searchKey) OR (Status__c like: searchKey) ORDER BY Id  limit :v_pagesize OFFSET :v_Offset];
    }
    @AuraEnabled
    public static List<Certification__c> certlists(){

        return [SELECT Id,Name, Cost__c, Cert_Name__c,Comments__c FROM Certification__c ORDER BY Id  LIMIT 10 OFFSET 0];
    }

    @AuraEnabled
       public static Integer TotalRecordsCR(String stext){
        string searchKey = '%' + stext + '%';
        List<Certification_Request__c> foo=[SELECT Id,Name,Certification__r.Cert_Name__c, Employee__r.Name, Status__c,Voucher__r.Voucher_Id__c,Comments__c,Due_Date__c FROM Certification_Request__c  where (Name like: searchKey) OR (Status__c like: searchKey) ];
           return foo.size();
       }
       @AuraEnabled
       public static Integer TotalRecordsV(String stext){
        string searchKey = '%' + stext + '%';
        List<Voucher__c> foo=[SELECT Id,Name,Voucher_Id__c, Voucher_Cost__c, Certification__r.Cert_Name__c,Active__c,Comments__c,Validity__c FROM Voucher__c  where (Name like: searchKey) OR (Voucher_Id__c like: searchKey) OR (Active__c like: searchKey)];
           return foo.size();
       }
       @AuraEnabled
       public static Integer TotalRecordsC(String stext){
        string searchKey = '%' + stext + '%';
        List<Certification__c> foo=[SELECT Id,Name, Cost__c, Cert_Name__c,Comments__c FROM Certification__c  where Name like: searchKey ];
           return foo.size();
       }
       
       @AuraEnabled(cacheable=true)
       public static Integer getNext(Integer v_Offset, Integer v_pagesize){
           v_Offset += v_pagesize;
           return v_Offset;
       }

       @AuraEnabled(cacheable=true)
       public static Integer getPrevious(Integer v_Offset, Integer v_pagesize){
           v_Offset -= v_pagesize;
           return v_Offset;
       }
}