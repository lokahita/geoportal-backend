import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';


import Config from './config.json';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Organizations from './Organizations';
import Metadata from './Metadata';
import Harvesting from './Harvesting';
import Theme from './Theme';
import Keywords from './Keywords';
import Users from './Users';
import Logs from './Logs';

export default function Backend(props) {
    const [menuUtamaAktif, setMenuUtamaAktif] = useState('home');

    var base = "px-2 py-1 pointer"
    var home = menuUtamaAktif === 'home' ? base + " bg-kuning" : base;
    var analytics = menuUtamaAktif === 'analytics' ? base + " bg-kuning" : base;
    var register = menuUtamaAktif === 'register' ? base + " bg-kuning" : base;
    var metadata = menuUtamaAktif === 'metadata' ? base + " bg-kuning" : base;
    var harvest = menuUtamaAktif === 'harvest' ? base + " bg-kuning" : base;
    var theme = menuUtamaAktif === 'theme' ? base + " bg-kuning" : base;
    var keywords = menuUtamaAktif === 'keywords' ? base + " bg-kuning" : base;
    var users = menuUtamaAktif === 'users' ? base + " bg-kuning" : base;
    var logs = menuUtamaAktif === 'logs' ? base + " bg-kuning" : base;
    var logout = menuUtamaAktif === 'logout' ? base + " bg-kuning" : base;

    var konten = <p></p>

    if (menuUtamaAktif === 'home') {
        konten = <Dashboard />
    } else if (menuUtamaAktif === 'analytics') {
        konten = <Analytics />
    } else if (menuUtamaAktif === 'register') {
        konten = <Organizations />
    } else if (menuUtamaAktif === 'metadata') {
        konten = <Metadata />
    } else if (menuUtamaAktif === 'harvest') {
        konten = <Harvesting />
    } else if (menuUtamaAktif === 'theme') {
        konten = <Theme />
    } else if (menuUtamaAktif === 'keywords') {
        konten = <Keywords />
    }else if (menuUtamaAktif === 'users') {
        konten = <Users />
    }else if (menuUtamaAktif === 'logs') {
        konten = <Logs />
    }

    return (
        <Row className="main-admin font-11">
            <Col lg={2} className="pt-3 bg-dark">
                <h6 className="text-white ml-2">Dashboard</h6>
                <ListGroup className="ml-2">
                    <ListGroup.Item className={home} onClick={() => setMenuUtamaAktif('home')}>Home</ListGroup.Item>
                    <ListGroup.Item className={analytics} onClick={() => setMenuUtamaAktif('analytics')}>Analytics</ListGroup.Item>
                    <ListGroup.Item className={register} onClick={() => setMenuUtamaAktif('register')}>Catalogue Management</ListGroup.Item>
                    <ListGroup.Item className={metadata} onClick={() => setMenuUtamaAktif('metadata')}>Upload Metadata</ListGroup.Item>
                    <ListGroup.Item className={harvest} onClick={() => setMenuUtamaAktif('harvest')}>Harvesting</ListGroup.Item>
                    <ListGroup.Item className={theme} onClick={() => setMenuUtamaAktif('theme')}>Theme</ListGroup.Item>
                    <ListGroup.Item className={keywords} onClick={() => setMenuUtamaAktif('keywords')}>Keywords</ListGroup.Item>
                    <ListGroup.Item className={users} onClick={() => setMenuUtamaAktif('users')}>Users</ListGroup.Item>
                    <ListGroup.Item className={logs} onClick={() => setMenuUtamaAktif('logs')}>Logs</ListGroup.Item>
                    <ListGroup.Item className={logout} onClick={() => window.location.href = Config.base_domain + "/#/logout"}>Logout</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col lg={10} className="ml-0 border bg-white font-11 admin-content">
                {
                    konten
                }

            </Col>
        </Row>
    )

}