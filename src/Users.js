import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { setCookie } from './Helpers';
import {PencilSquare, Trash, Printer, Download, ArrowRepeat, FileEarmarkExcel} from 'react-bootstrap-icons';
import image_loader from './loading.gif';
import Config from './config.json';

import { getCookie } from './Helpers';
export default function Users(props) {
    const [loading, setloading] = useState(true);
    const  token = getCookie('ADMIN_TOKEN');
    //const base_domain = Config.base_domain;
    
    const url_list = Config.api_domain + "/user/";
    const url_insert = Config.api_domain + "/user/";
    const url_update = Config.api_domain + "/user/update/";
    const url_delete = Config.api_domain + "/user/delete/";
    
    const [isFormVisible, setFormVisible] = useState(false);
    const [modeUsulan, setModeUsulan] = useState("tambah");
    const [tombolUsulan, setTombolUsulan] = useState("Save");    
    
    const [id, setId] = useState(0);
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [items, setItems] = useState();
    
    const [alert, setAlert] = useState("d-none");
    const [error, setError] = useState("d-none");

    const status = isFormVisible ? 'main-card mt-3 d-block' : 'd-none';
    const tabel = !isFormVisible ? 'main-card d-block' : 'd-none';

   
    function validateForm() {
        //console.log(wilayahId)
        return username.length > 0 && fullname.length > 0 && email.length > 0 && password === password2;
    }

      
    function getRowsData () {
        if (typeof(items) !== 'undefined'){
          //var items=props.presensiDataLast.data;
          if(items !== null){
               if(items.length >0){
            
               return items.map((row, index)=>{
                //console.log(row.id, index)
                // 
                return <tr key={index}><td>{index+1}</td><td>{row.fullname}</td><td>{row.username}</td><td>{row.email}</td><td> <Button type="submit" variant="warning" size="sm" inline="true" onClick={()=>setModeEdit(row)} size="sm" className="px-1 py-0" ><PencilSquare size={12} /></Button> <Button type="submit" variant="danger" size="sm" onClick={()=>setModeDelete(row)} className="px-1 py-0" ><Trash size={12} /></Button></td></tr>
                })
               }else{
                return <tr><td colSpan={3}>No data found</td></tr>

                //return <tr><td>1</td><td>emhayusa</td><td> <Button type="submit" variant="warning" size="sm" inline="true" onClick={()=>setModeEdit()} size="sm" className="px-1 py-0" ><PencilSquare size={12} /></Button> <Button type="submit" variant="danger" size="sm" onClick={()=>setModeDelete()} className="px-1 py-0" ><Trash size={12} /></Button></td></tr>    
               }
          }else{
            return <tr><td colSpan={3}>No data found</td></tr>
          }
       }else{
          return <tr><td colSpan={3}>Accessing Data {loader}</td></tr>
        }
    }

    function load_usulan(){
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
        };

        fetch(url_list, requestOptions).then(res => res.json()).then(data => {
            if(data.status === "Expired token"){
                window.location.replace(Config.base_domain)
            }else{
                console.log(data);
                setItems(data.data);
            }
        });
    }

    function setModeInsert(){
        setId(0);
        setUsername("");
        setFullname("");
        setEmail("");
        setModeUsulan("tambah");
        setFormVisible(true);
        setTombolUsulan("Save");
    }

    function setModeEdit(r){
        console.log(r);
        setId(r.public_id);
        //setKodeMisi(1);
        //setKodeBidang(1);
        setUsername(r.username);
        setFullname(r.fullname);
        setEmail(r.email);
        setModeUsulan("ubah");
        setFormVisible(true);
        setTombolUsulan("Update");
        //window.scrollBy(0, 150);
    }

    function setModeDelete(r){
        setId(r.public_id);
        setUsername(r.username);
        setFullname(r.fullname);
        setEmail(r.email);
        setModeUsulan("hapus");
        setFormVisible(true);
        setTombolUsulan("Delete");
        //window.scrollBy(0, 150);
    }

    const tambahData = async () => {
         
        //var btn = document.querySelector("#ulangi");
        var msg = document.querySelector("#message");
        var err = document.querySelector("#error");
        setError('d-block alert-info');
        //console.log(loader);
        err.innerHTML = 'please wait..';


        try {
          // Fetch data from REST API
          const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify({ 
                "fullname": fullname,
                "email": email,
                "username": username,
                "password": password
            })
          };
          const response = await fetch (url_insert, requestOptions)
          //console.log(response)
    
          var json = await response.json();
          //console.log(json);
          //console.log(json.status);
        
          if (response.status === 201) {
            //console.log(data);
               setAlert('d-block alert-success')
                setError('d-none')
                msg.innerHTML = json.message;
                load_usulan();
                setId(0);
                setUsername("");
                setFullname("");
                setEmail("");
                setPassword("");
                setPassword2("");
                setFormVisible(false);
           }else{
            setError('d-block alert-danger')  
            err.innerHTML = `Error ${response.status} ${response.statusText}`;
            console.error(`Error ${response.status} ${response.statusText}`);
          }
          
        }catch (error) {
          setError('d-block alert-danger')
          msg.innerHTML = `Error ${error}`;
          console.error(`Error ${error}`);
        }
    };

    
    const ubahData = async () => {
         
           
        //var btn = document.querySelector("#ulangi");
        var msg = document.querySelector("#message");
        var err = document.querySelector("#error");
        setError('d-block alert-info');
        //console.log(loader);
        err.innerHTML = 'please wait..';

        try {
          // Fetch data from REST API
          
          const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify({ 
                "id": id,
                "username": username,
                "fullname": fullname,
                "email": email,
                "password": password
             })
            };

          const response = await fetch (url_update , requestOptions)
          //console.log(response)
    
          var json = await response.json();
          //console.log(json);
          //console.log(json.status);
         
          
          //msg.innerHTML = json.data.status;
        
          if (response.status === 201) {
            //console.log(data);
                setAlert('d-block alert-success')
                setError('d-none')
                msg.innerHTML = json.message;
                load_usulan();
                setId(0);
                setUsername("");
                setFullname("");
                setEmail("");
                setPassword("");
                setPassword2("");
                setFormVisible(false);
          }else{
            setError('d-block alert-danger')  
            err.innerHTML = `Error ${response.status} ${response.statusText}`;
            console.error(`Error ${response.status} ${response.statusText}`);
          }
          
        } catch (error) {
          setError('d-block alert-danger')
          msg.innerHTML = `Error ${error}`;
          console.error(`Error ${error}`);
        }
    
    };

    const hapusData = async () => {
         
        //var btn = document.querySelector("#ulangi");
        var msg = document.querySelector("#message");
        var err = document.querySelector("#error");
        setError('d-block alert-info');
        //console.log(loader);
        err.innerHTML = 'please wait ..';


        try {

          const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify({ 
                "public_id": id             
            })
          };

          const response = await fetch (url_delete, requestOptions)
          //console.log(response)
    
          var json = await response.json();
          //console.log(json);
          //console.log(json.status);
         
          
          //msg.innerHTML = json.data.status;
        
          if (response.status === 201) {
            //console.log(data);
                    setAlert('d-block alert-success')
                    setError('d-none')
                    msg.innerHTML = json.message;
                    load_usulan();
                    setId(0);
                    setUsername("");
                    setFullname("");
                    setEmail("");
                    setPassword("");
                    setPassword2("");
                    setFormVisible(false);
          }else{
            setError('d-block alert-danger')  
            err.innerHTML = `Error ${response.status} ${response.statusText}`;
            console.error(`Error ${response.status} ${response.statusText}`);
          }
          
        } catch (error) {
          setError('d-block alert-danger')
          msg.innerHTML = `Error ${error}`;
          console.error(`Error ${error}`);
        }
    
    };

    function handleSubmit(event) {
        event.preventDefault();
        if(modeUsulan === 'tambah')
            tambahData();
        else if(modeUsulan === 'ubah')
            ubahData();
        else if(modeUsulan === 'hapus')
            hapusData();
    }

    
    
    function muatUlang(event) {
        window.location.reload();
    }


    useEffect(()=>{

        let mounted = true;
       
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
        };

        fetch(url_list, requestOptions).then(res => res.json()).then(data => {
            if (mounted) {
                setloading(false)
                if(data.status === "Expired token"){
                    //console.log("aaa")
                    //props.setLogout()
                    window.location.replace(Config.base_domain) 
                }else{
                    setItems(data.data);
                }
            }
        })

        return function cleanup() {
            mounted = false;
        }
    },[token, url_list]);



    const loader = <img className="logo d-inline" alt="logo" src={image_loader} width="30px" />
    const card = (
        <>
            <Card className={tabel}>
                <Card.Body>
                    <Alert variant="warning">
                        <span className="text-uppercase"><b>List of Users</b></span>
                    </Alert>
                    <Table bordered className="font-11" size="sm">
                        <thead>
                            <tr>
                                <th width="5%">No</th>
                                <th width="20%">Fullname</th>
                                <th width="20%">Username</th>
                                <th width="20%">Email</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getRowsData()
                            }
                        </tbody>
                    </Table>
                    <Alert className={alert}>
                        <span id="message">pesan</span>
                        <button type="button" className="close" aria-label="Close" onClick={() => setAlert('d-none')}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Alert>
                    <Form.Group>
                        <Button variant="success" type="button" block onClick={() => setModeInsert()} className="font-11 py-0" size="sm">Add a new user</Button>
                    </Form.Group>

                </Card.Body>
            </Card>
            <Card className={status} id="#form_isian">
                <Card.Body>
                    <Alert variant="warning">
                        <span className="text-uppercase"><b>User form</b></span>
                    </Alert>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control size="sm" className="font-11" type="text" value={fullname} onChange={e => setFullname(e.target.value)} disabled={modeUsulan==="hapus"} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control size="sm" className="font-11" type="email" value={email} onChange={e => setEmail(e.target.value)} disabled={modeUsulan==="hapus"} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control size="sm" className="font-11" type="text" value={username} onChange={e => setUsername(e.target.value)} disabled={modeUsulan==="hapus"} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control size="sm" className="font-11" type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={modeUsulan==="hapus"} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control size="sm" className="font-11" type="password" value={password2} onChange={e => setPassword2(e.target.value)} disabled={modeUsulan==="hapus"} />
                        </Form.Group>
                        <Alert className={error}>
                            <span id="error" className="font-11">message</span>
                            <button type="button" className="close pt-0" aria-label="Close" onClick={() => setError('d-none')}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Alert>

                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Button variant="danger" type="button" block onClick={() => setFormVisible(false)} className="font-11 py-0" size="sm" >Cancel</Button>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Button variant="success" type="submit" block disabled={!validateForm()} className="font-11 py-0" size="sm" title="Username field must be inserted">{tombolUsulan} User</Button>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        </>

    )
    return loading? loader: card   
}

/*

<Button variant="success" type="submit" className="float-right mb-2"  onClick={()=>unduhExcel()} > <FileEarmarkExcel size={16}/> Unduh Usulan Excel</Button>
        <Button variant="primary" type="submit" className="float-right mb-2 mr-2"  onClick={()=>cetakUsulan()} > <Download size={16}/> Unduh Usulan Pdf</Button>
        <Button variant="info" type="submit" className="float-right mb-2 mr-2"  onClick={()=>muatUlang()} > <ArrowRepeat size={16}/> Muat Ulang Usulan</Button>

        */