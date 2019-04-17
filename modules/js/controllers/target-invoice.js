/**
 * The Loan invoice angular controller
 */
'use strict';

//Loan application management controller
user.controller("targetInvoiceCtrl", function($scope, $location, $route, httpReq, showAlert){
    //set default search keys
    var keyParams = {id:'Invoice Id',refQQno:'Reference No',accountQQno:'Savings Account No',registeredQQby:'Registered By',office:'Office Location', status:'Loan Status'};
    var data_no = 0;
    $scope.keys = keyParams;
    //Key Change Action performed
    $scope.list = JSON.parse(localStorage.getItem('offices')); //set offices
    $scope.keyChange = function(){
        if($scope.key == 'office'){
            $scope.value = "";
            $scope.value_input = false;
            $scope.value_status = false;
            $scope.value_select = true;
        }
        else if($scope.key == 'status'){
            $scope.value = "";
            $scope.value_status = true;
            $scope.value_input = false;
            $scope.value_select = false;
        }
        else{
            $scope.value = "";
            $scope.value_input = true;
            $scope.value_select = false;
            $scope.value_status = false;
            $scope.selected_key = keyParams[$scope.key];
        }
    }
    if($location.search().key && $location.search().value){
        $scope.key = $location.search().key;
        $scope.value = $location.search().value;
        //set appropriate forms
        if($scope.key == 'office'){
            $scope.value_select = true;
        }
        else if ($scope.key == 'status'){
            $scope.value_status = true;
        }
        else{
            $scope.value_input = true;
            $scope.selected_key = keyParams[$scope.key];
        }
    }
    //search action performed
    $scope.searchBtn = function(){
        if($scope.key != null && $scope.value != null){
            $location.url('/target-invoice?key=' + $scope.key + '&value=' + $scope.value);
        }
        else{
            showAlert.warning("Select correct search parameters");
        }
    }
    //build Parameters
    var page = 1;
    var key = "";
    var value = "";
    var url = '/targetinvoice/view';
    if($location.search().page){
        page = $location.search().page;
    }
    if($location.search().key && $location.search().value){
        key = $location.search().key;
        value = $location.search().value;
        url = url + '/search/' + key + '/' + value;
    }
    url = url + '/' + page;
    //get Savings accounts from database
    httpReq.send(url,null,'POST',
        {
            success: function(response){
                if(response.status === 200){
                    $scope.invoice = response.data;
                    //check the number of data in response data
                    for(var data in response.data){
                        data_no++;
                    }
                    data_no < 15 ? $scope.show_next = false : $scope.show_next = true;
                    page > 1 ? $scope.show_prev = true : $scope.show_prev = false;
                }
            },
            error: function(response){
                switch(response.status){
                    case 400:{
                        showAlert.warning(response.data);
                        break;
                    }
                    case 403:{
                        showAlert.danger(response.data.auth + ' | ' + response.data.access);
                        break;
                    }
                    default:{
                        showAlert.warning("unknown internal error, workspace might be empty. Hint: Reload browser window");
                    }
                }
            }
        });
    //Edit action performed
    $scope.editBtn = function(index){
        $scope.selected_invoice = new Object;
        $scope.selected_invoice.id = $scope.invoice[index].id;
        $scope.selected_invoice.amount = $scope.invoice[index].amount;
        $scope.selected_invoice.status = $scope.invoice[index].status;
    }
    //Pay Invoice action performed
    $scope.payBtn = function(){
        //send invoice to the server
        if($scope.selected_invoice.amount && $scope.selected_invoice.channel && $scope.selected_invoice.status){
            var in_data = new Object();
            in_data.invoice = $scope.selected_invoice;
            httpReq.send('/targetinvoice/edit/' + $scope.selected_invoice.id, JSON.stringify($scope.selected_invoice), 'POST',
            {
                success: function(response){
                    if(response.status === 200){
                        showAlert.success(response.data.success);
                        $route.reload();
                    }
                },
                error: function(response){
                    switch(response.status){
                        case 400:{
                            showAlert.warning(response.data.error);
                            break;
                        }
                        case 403:{
                            showAlert.danger(response.data.auth + ' | ' + response.data.access);
                            break;
                        }
                        default:{
                            showAlert.warning("unknown internal error, workspace might be empty. Hint: Reload browser window");
                        }
                    }
                }
            });
        }
        else{
            showAlert.warning('Error detected in some form fields, please check and fill the forms correctly');
        }
    }
    //Set next and previous action performed
    $scope.next = function(){
        var new_page = parseInt(page) + 1;
        if($location.search().value && $location.search().key){
            $location.url('/target-invoice?key=' + key + '&value=' + value + "&page=" + new_page);
        }
        else{
            $location.url('/target-invoice?page=' + new_page);
        }
    }
    $scope.prev = function(){
        var new_page = parseInt(page) - 1;
        if($location.search().value && $location.search().key){
            $location.url('/target-invoice?key=' + key + '&value=' + value + "&page=" + new_page);
        }
        else{
            $location.url('/target-invoice?page=' + new_page);
        }
    }
});