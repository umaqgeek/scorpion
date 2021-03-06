<?php
require_once APPPATH . 'libraries/TwitterAPIExchange.php';

class Apps_security extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->helper(array('form', 'url'));
                $this->load->model('account_db');
                $this->load->database();
                $this->load->library('session');
                $this->load->library(array('TwitterAPIExchange'));                
        }

        public function checkPinCode() { //retreive query result from getPinCode()

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');
        $data = $this->account_db->getPinCode($sessionName);
        echo json_encode($data);       
        }

        public function getTrans() {//insert into db
                
                $this->load->model('account_db');
                $getTrans  = $this->account_db->add_trans();
        
                if(!empty($getTrans)){
                        return true;
                }else{
                        return false;
                }
        }


        public function sendTwtDm(){//send dm twitter

                       
                       $name = $this->session->userdata['twtsess']['name'];
                       $twtid = $this->session->userdata['twtsess']['socialid'];
                       $message = $this->session->userdata['twtsess']['message'];
                       $transvalue = $this->session->userdata['twtsess']['transvalue'];
                       $type = $this->session->userdata['twtsess']['type'];
                       $link = $this->session->userdata['twtsess']['link'];

                       $msg = preg_replace('/\s+/', '%', $message);



                

                $sess_token = $this->session->userdata['tw_access_token']['oauth_token'];
        $sess_token_secret = $this->session->userdata['tw_access_token']['oauth_token_secret'];
        $screenname = $this->session->userdata['tw_access_token']['screen_name'];

        //echo json_encode($sess_token_secret);
        
        /** Set access tokens here - see: https://dev.twitter.com/apps/ **/
        $settings = array(
            'oauth_access_token' => $sess_token,
            'oauth_access_token_secret' => $sess_token_secret,
            'consumer_key' => "jMw4oy0jXlWoStF21H8emTamJ",
            'consumer_secret' => "IPPPPcdUyJIAt5NRH5c3TeP03oSJELMRKT7X69fhqAwqhxURo7"
        );

        if($type == "Gold" || $type == "Silver"){
            $val = "gram";
        }else{
            $val = "Myr";
        }


                $i = 0;
                $cursor = -1;
                $text = "This top section message is generated by system.\nHye ".$name.". I have send you  ".$type." total of ".$transvalue." ".$val.".\nOpen this link to continue.\nhttp://localhost/scorpion/www/index.html?".$link."\n\n".$message;
                //$receiver = "803453626354044928";
                $receiver = $twtid; // only follower
                $url = 'https://api.twitter.com/1.1/direct_messages/new.json';
                $requestMethod = 'POST';
                //https://api.twitter.com/1/direct_messages/new.format
                $postfields = array(
                        'user_id' => $receiver, 
                        'text' => $text,
   
                );
                /*  Calling TwiiterAPI class */
                $twitter = new TwitterAPIExchange($settings);
                echo $twitter->buildOauth($url, $requestMethod)
                        ->setPostfields($postfields)
                        ->performRequest();

 

        }

        public function getTwtData(){//get transaction data for twitter



                $datatwt = array(
                   'socialid'  => $this->input->post('socialid'),
                   'name' => $this->input->post('name'),
                   'type' => $this->input->post('type'),
                   'message' => $this->input->post('message'),
                   'transvalue' => $this->input->post('transvalue'),
                   'link' => $this->input->post('link'),
               );

                //$twtsession = json_encode($datatwt);
                $this->session->set_userdata('twtsess',$datatwt);

                



        }

        
}