import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { setCookie } from './Helpers';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Config from './config.json';


import ilustrasi from './illustration.jpg';

export default function Dashboard(props) {
    return (
        <Row className="mx-3">
            <Col lg={6} className="mt-3 mb-4">
                <h3>Hello, Administrator!</h3>
                <img src={ilustrasi} alt="illustration" className="w-100" />
            </Col>
        </Row>

    )
}