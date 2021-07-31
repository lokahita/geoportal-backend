import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { setCookie } from './Helpers';
import { PencilSquare, Trash, Printer, Download, ArrowRepeat, FileEarmarkExcel } from 'react-bootstrap-icons';
import image_loader from './loading.gif';
import Config from './config.json';

import { getCookie } from './Helpers';
export default function Harvestings(props) {
    const [loading, setloading] = useState(true);

    const token = getCookie('ADMIN_TOKEN');
    //const base_domain = Config.base_domain;

    const url_list = Config.api_domain + "/harvestings/";
    const url_insert = Config.api_domain + "/harvestings/pull/";
    const url_update = Config.api_domain + "/harvestings/update/";
    const url_delete = Config.api_domain + "/harvestings/delete/";

    const url_list_organizations = Config.api_domain + "/organizations/";
    const [idOrganization, setIdOrganization] = useState(0);
    const [listOrganizations, setListOrganizations] = useState();

    const [isFormVisible, setFormVisible] = useState(false);
    const [modeUsulan, setModeUsulan] = useState("tambah");
    const [tombolUsulan, setTombolUsulan] = useState("Redo");

    const [id, setId] = useState(0);
    const [identifier, setIdentifier] = useState("");
    const [title, setTitle] = useState("");
    const [numberData, setNumberData] = useState(0);
    const [items, setItems] = useState();
    const [dataAll, setDataAll] = useState();

    const [alert, setAlert] = useState("d-none");
    const [error, setError] = useState("d-none");

    const status = isFormVisible ? 'main-card mt-3 d-block' : 'd-none';
    const tabel = !isFormVisible ? 'main-card d-block' : 'd-none';



    function handlingOrganizations(e) {
        //console.log(e.target.value + " " + e.target.selectedOptions[0].text );
        setIdOrganization(e.target.value);
        if (e.target.value === "0") {
            //console.log(data)
            setItems(dataAll);//.slice(0, 10));
            setNumberData(dataAll.length);
        } else {
            load_organizations(e.target.value)
        }
    }

    function load_organizations(id) {
        //console.log(data);

        //var result = data.filter(p => {
        //console.log(id);
        //console.log(typeof id);
        //console.log(items);
        //console.log(dataAll[0].organizations.id);
        //console.log(typeof dataAll[0].organizations.id);
        var result = dataAll.filter(p => p.organizations.id === parseInt(id));
        console.log(result);
        setItems(result);
       // setItems(result.slice(0, 10));//.slice(0, 10));
        setNumberData(result.length);
    }


    function getRowsData() {
        if (typeof (items) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (items !== null) {
                if (items.length > 0) {

                    return items.map((row, index) => {
                        //console.log(row.id, index)
                        // <PencilSquare size={12} /></Button> <Button type="submit" variant="danger" size="sm" onClick={()=>setModeDelete(row)} className="px-1 py-0" >
                        return <tr key={index}><td>{index + 1}</td><td>{row.identifier}</td><td>{row.title}</td><td>{row.organizations.name}</td><td>{row.modified}</td><td> <Button type="submit" variant="danger" size="sm" inline="true" onClick={() => setModeDelete(row)} size="sm" className="px-1 py-0" ><Trash size={12} /></Button></td></tr>
                    })
                } else {
                    return <tr><td colSpan={6}>No data found</td></tr>
                }
            } else {
                return <tr><td colSpan={6}>No data found</td></tr>
            }
        } else {
            return <tr><td colSpan={6}>Accessing Data {loader}</td></tr>
        }
    }

    function load_usulan() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        };

        fetch(url_list, requestOptions).then(res => res.json()).then(data => {
            if (data.status === "Expired token") {
                window.location.replace(Config.base_domain)
            } else {
                console.log(data);
                setItems(data.data);
            }
        });
    }

    function setModeInsert() {
        setId(0);
        setIdentifier("");
        setTitle("");
        setModeUsulan("tambah");
        setFormVisible(true);
        setTombolUsulan("Redo");
    }

    function setModeDelete(r) {
        setId(r.id);
        setIdentifier(r.identifier);
        setTitle(r.title);

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
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            };

            const response = await fetch(url_insert + idOrganization, requestOptions)
            //console.log(response)

            var json = await response.json();
            //console.log(json);
            //console.log(json.status);

            if (response.status === 200) {
                //console.log(data);
                setAlert('d-block alert-success')
                setError('d-none')
                msg.innerHTML = json.status + ', total: ' + json.total + ' data';
                load_usulan();
                setId(0);
                setIdentifier("");
                setTitle("");
                setFormVisible(false);
            } else {
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
                    "id": id
                })
            };

            const response = await fetch(url_delete, requestOptions)
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
                setTitle("");
                setIdentifier("");
                setFormVisible(false);
            } else {
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
        if (modeUsulan === 'tambah')
            tambahData();
        else if (modeUsulan === 'hapus')
            hapusData();
    }



    function muatUlang(event) {
        window.location.reload();
    }


    useEffect(() => {

        let mounted = true;
        let mounted2 = true;

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
                if (data.status === "Expired token") {
                    //console.log("aaa")
                    //props.setLogout()
                    window.location.replace(Config.base_domain)
                } else {
                    setDataAll(data.data);
                    setNumberData(data.data.length);
                    setItems(data.data);
                    //setItems(data.data.slice(0, 10));
                }
            }
        })

        fetch(url_list_organizations, requestOptions).then(res => res.json()).then(data => {
            if (mounted2) {
                //console.log(data.data);
                var dataset = [{ id: 0, name: "All" }]
                data.data.forEach(element => {
                    dataset.push(element);
                });
                //console.log(dataset)
                setListOrganizations(dataset);
            }
        });

        return function cleanup() {
            mounted = false;
            mounted2 = false;
        }
    }, [token, url_list]);

    function getOrganizations() {
        if (typeof (listOrganizations) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (listOrganizations !== null) {
                if (listOrganizations.length > 0) {
                    return listOrganizations.map((row, index) => {
                        //console.log(row.id, index)
                        return <option key={index} value={row.id}>{row.name}</option>
                    })
                }
            } else {
                return <option></option>
            }
        } else {
            return <option></option>
        }
    }




    const loader = <img className="logo d-inline" alt="logo" src={image_loader} width="30px" />

    const identify = (
        <>
            <Form.Group>
                <Form.Label>Identifier</Form.Label>
                <Form.Control size="sm" className="font-11" type="text" value={identifier} disabled={modeUsulan === "hapus"} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control size="sm" className="font-11" type="text" value={title} disabled={modeUsulan === "hapus"} />
            </Form.Group>
        </>
    )
    const card = (
        <>
            <Card className={tabel}>
                <Card.Body>
                    <Alert variant="warning">
                        <span className="text-uppercase"><b>List of harvested metadata</b></span>
                    </Alert>
                    <span>Filter Organization:
                    <Form.Control size="sm" className="font-11" as="select" value={idOrganization} onChange={e => handlingOrganizations(e)} >
                            {
                                getOrganizations()
                            }
                        </Form.Control>
                    </span>
                    <br />
                    <span>Found: {numberData}</span>

                    <Table bordered className="font-11" size="sm">
                        <thead>
                            <tr>
                                <th width="5%">No</th>
                                <th width="20%">Identifier</th>
                                <th width="20%">Title</th>
                                <th width="20%">Organization
                                </th>
                                <th width="15%">Modified</th>
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
                        <Button variant="success" type="button" block onClick={() => setModeInsert()} className="font-11 py-0" size="sm">Reharvesting Catalogue</Button>
                    </Form.Group>

                </Card.Body>
            </Card>
            <Card className={status} id="#form_isian">
                <Card.Body>
                    <Alert variant="warning">
                        <span className="text-uppercase"><b>Harvesting form</b></span>
                    </Alert>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Organization Name</Form.Label>
                            <Form.Control size="sm" className="font-11" as="select" value={idOrganization} onChange={e => handlingOrganizations(e)} disabled={modeUsulan === "hapus"}>
                                {
                                    getOrganizations()
                                }
                            </Form.Control>
                        </Form.Group>
                        {modeUsulan === "hapus" ? identify : ""}


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
                                    <Button variant="success" type="submit" block className="font-11 py-0" size="sm" title="Organization must be selected">{tombolUsulan} Harvesting</Button>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Body>
            </Card>
        </>

    )
    return loading ? loader : card
}

/*

<Button variant="success" type="submit" className="float-right mb-2"  onClick={()=>unduhExcel()} > <FileEarmarkExcel size={16}/> Unduh Usulan Excel</Button>
        <Button variant="primary" type="submit" className="float-right mb-2 mr-2"  onClick={()=>cetakUsulan()} > <Download size={16}/> Unduh Usulan Pdf</Button>
        <Button variant="info" type="submit" className="float-right mb-2 mr-2"  onClick={()=>muatUlang()} > <ArrowRepeat size={16}/> Muat Ulang Usulan</Button>

        */