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


export default function Analytics(props) {
    const options = {
        chart: {
            type: 'spline',
            height: 250
        },
        title: {
            text: 'User Activity'
        },
        xAxis: {
            categories: ['emhayusa'],
            title: {
                text: 'username'
            }
        },
        series: [
            {
                name: 'User Login',
                data: [10]
            }
        ]
    };

    const options2 = {
        chart: {
            type: 'bar',
            height: 250
        },
        title: {
            text: 'Harvesting Metadata Distribution'
        },
        xAxis: {
            categories: ['ICRAF', 'Cifor', 'Internal'],
            title: {
                text: 'Organization'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Metadata',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        series: [
            {
                name: 'the amount of metadata',
                data: [2132, 69, 0]
            }
        ]
    };
/*
    const options3 = {
        chart: {
            type: 'line',
            height: 200
        },
        title: {
            text: 'Metadata per Time'
        },
        xAxis: {
            categories: ['Jan', 'Feb']
        }, yAxis: {
            title: {
                text: 'The Amount of Metadata'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: "Cifor",
            data: [0, 550]
        }, {
            name: "Organization 2",
            data: [0, 430]
        }, {
            name: "Organization 3",
            data: [0, 654]
        }]
    };
    const options4 = {
        chart: {
            type: 'pie',
            height: 200
        },
        title: {
            text: 'Data Download'
        },
        series: [
            {
                data: [1, 2, 1, 4, 3, 6]
            }
        ]
    };

*/

    return (
        <Row className="mx-3">
            <Col lg={6} className="mt-5 mb-4">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Col>
            <Col lg={6} className="mt-5 mb-4">
                <HighchartsReact highcharts={Highcharts} options={options2} />
            </Col>
            {
            
            /*
            <Col lg={6} className="mt-2 mb-2">
                <HighchartsReact highcharts={Highcharts} options={options3} />
            </Col>
            <Col lg={6} className="mt-2 mb-2">
                <HighchartsReact highcharts={Highcharts} options={options4} />
            </Col>
            */
            }
        </Row>

    )
}