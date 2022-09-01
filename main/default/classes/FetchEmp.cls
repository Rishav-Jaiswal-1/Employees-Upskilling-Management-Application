public with sharing class FetchEmp {
    public FetchEmp() {

    }
    @AuraEnabled
    public static List<Employee__c> foobar(String stext,Integer v_Offset, Integer v_pagesize){
        
        string searchKey = '%' + stext + '%';
        return [SELECT Id,Name, Employee_Email__c, Emp_Name__c , Primary_Skill__c , Experience__c , Secondary_Skill__c FROM Employee__c  where Name like: searchKey  limit :v_pagesize OFFSET :v_Offset];
    }
   
    @AuraEnabled
       public static Integer TotalRecords(String stext){
        string searchKey = '%' + stext + '%';
        List<Employee__c> foo=[SELECT Id,Name, Employee_Email__c, Emp_Name__c , Primary_Skill__c , Experience__c , Secondary_Skill__c FROM Employee__c  where Name like: searchKey ];
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

