<?php
//The Fixed Deposit database object model

namespace database\models;

class FixedDeposit{
    private $id;

    private $account_no;

    private $channel;

    private $amount;

    private $rate;

    private $roi;

    private $status;

    private $start_date;

    private $end_date;

    private $office;

    private $registered_by;

    private $timestamp;

    private $date;

    //public constructor for loading the model
    public function __construct($payloads=null){
        if(is_null($payloads)){
            return;
        }
        elseif(is_array($payloads) || is_object($payloads)){
            //start assigning variables
            $obj_payloads = null;
            if(is_array($payloads)){
                $obj_payloads = (object)$payloads;
            }
            else{
                $obj_payloads = $payloads;
            }
            //start assigning variables
            $this->id = $this->serialize_payloads($obj_payloads->id);
            $this->account_no = $this->serialize_payloads($obj_payloads->account_no);
            $this->amount = $this->serialize_payloads($obj_payloads->amount);
            $this->channel = $this->serialize_payloads($obj_payloads->channel);
            $this->rate = $this->serialize_payloads($obj_payloads->rate);
            $this->roi = $this->serialize_payloads($obj_payloads->roi);
            $this->status = $this->serialize_payloads($obj_payloads->status);
            $this->start_date = $this->serialize_payloads($obj_payloads->start_date);
            $this->end_date = $this->serialize_payloads(@$obj_payloads->end_date);
            $this->office = $this->serialize_payloads($obj_payloads->office);
            $this->registered_by = $this->serialize_payloads($obj_payloads->registered_by);
            $this->date = $this->serialize_payloads(@$obj_payloads->date);
            $this->timestamp = $this->serialize_payloads($obj_payloads->timestamp);
        }
        else{
            return;
        }
    }
    //Serialize Payloads
    private function serialize_payloads($payload_set){
        if(is_null($payload_set)){
            return null;
        }
        elseif(is_object($payload_set)  || is_array($payload_set)){
            return json_encode($payload_set);
        }
        else{
            return $payload_set;
        }
    }
    //Get all object model data in an array
    public function get_all(){
        return get_object_vars($this);
    }
    //Get all object model data without the id in an array
    public function get_all_exclude_id(){
        $data = get_object_vars($this);
        unset($data["id"]);
        return $data;
    }
    //set Setters Method
    public function set_Id($id){
        $this->id = $id;
    }
    public function set_accountNo($account_no){
        $this->account_no = $account_no;
    }
    public function set_channel($channel){
        $this->channel = $channel;
    }
    public function set_amount($amount){
        $this->amount = $amount;
    }
    public function set_rate($rate){
        $this->rate = $rate;
    }
    public function set_roi($roi){
        $this->roi = $roi;
    }
    public function set_status($status){
        $this->status = $status;
    }
    public function set_startDate($start_date){
        $this->start_date = $start_date;
    }
    public function set_endDate($end_date){
        $this->end_date = $end_date;
    }
    public function set_office($office){
        $this->office = $office;
    }
    public function set_registeredBy($registered_by){
        $this->registered_by = $registered_by;
    }
    public function set_date($date){
        $this->date = $date;
    }
    public function set_timestamp($timestamp){
        $this->timestamp = $timestamp;
    }
    //set Getters Method
    public function get_Id(){
        return $this->id;
    }
    public function get_accountNo(){
        return $this->account_no;
    }
    public function get_channel(){
        return $this->channel;
    }
    public function get_amount(){
       return  $this->amount;
    }
    public function get_rate(){
        return $this->rate;
    }
    public function get_roi(){
        return $this->roi;
    }
    public function get_status(){
        return $this->status;
    }
    public function get_startDate(){
        return $this->start_date;
    }
    public function get_endDate(){
        return $this->end_date;
    }
    public function get_office(){
        return $this->office;
    }
    public function get_registeredBy(){
        return $this->registered_by;
    }
    public function get_date(){
        return $this->date;
    }
    public function get_timestamp(){
        return $this->timestamp;
    }
}
