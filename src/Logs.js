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

export default function Logs(props) {
    const [loading, setloading] = useState(true);
    const  token = getCookie('ADMIN_TOKEN');
    //const base_domain = Config.base_domain;
    
    const url_list = Config.api_domain + "/logs/";
    const url_download = Config.api_domain + "/logs/download/";
   
    
    const [isFormVisible, setFormVisible] = useState(false); 
    
    const [name, setName] = useState("");
    const [items, setItems] = useState();
  
    const tabel = !isFormVisible ? 'main-card d-block' : 'd-none';

   
      
    function getRowsData () {
        if (typeof(items) !== 'undefined'){
          //var items=props.presensiDataLast.data;
          if(items !== null){
               if(items.length >0){
            
               return items.map((row, index)=>{
                //console.log(row.id, index)
                // 
                return <tr key={index}><td>{index+1}</td><td>{row.time}</td><td>{row.organization}</td><td>{row.total}</td><td> <Button type="submit" variant="warning" size="sm" inline="true" onClick={()=>download(row)} size="sm" className="px-1 py-0" ><Download size={12} /></Button></td></tr>
                })
               }else{
                //return <tr><td>1</td><td>2021-07-19T12:25:42.309399</td><td>2221</td><td> <Button type="submit" variant="warning" size="sm" inline="true" onClick={()=>setModeEdit()} size="sm" className="px-1 py-0" ><Download size={12} /></Button> <Button type="submit" variant="danger" size="sm" onClick={()=>setModeDelete()} className="px-1 py-0" ><Trash size={12} /></Button></td></tr> 
                return <tr><td colSpan={4}>No data found</td></tr>                   
               }
          }else{
            return <tr><td colSpan={4}>No data found</td></tr>
          }
       }else{
          return <tr><td colSpan={4}>Accessing Data {loader}</td></tr>
        }
    }

   
    function download(r){
        //console.log(url_download+r.file)
        window.open(url_download+r.file)
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
                        <span className="text-uppercase"><b>List of Logs</b></span>
                    </Alert>
                    <Table bordered className="font-11" size="sm">
                        <thead>
                            <tr>
                                <th width="5%">No</th>
                                <th width="10%">Time Harvesting</th>
                                <th width="10%">Organization</th>
                                <th width="10%">Total</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getRowsData()
                            }
                        </tbody>
                    </Table>
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