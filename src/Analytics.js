import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { useState, useEffect } from 'react';
import { setCookie } from './Helpers';
import { getCookie } from './Helpers';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Config from './config.json';


export default function Analytics(props) {
    const  token = getCookie('ADMIN_TOKEN');
    const [numberData, setNumberData] = useState([1,1,1]);
    const [organization, setOrganization] = useState(['A', 'B', 'C']);
    const [numberContribution, setNumberContribution] = useState([1,1,1]);
    const [user, setUser] = useState(['A', 'B', 'C']);
    //const base_domain = Config.base_domain;
    
    const url_list = Config.api_domain + "/harvestings/count/organization/";
    const url_user = Config.api_domain + "/contribution/count/user/";

    const options = {
        chart: {
            type: 'column',
            height: 350
        },
        title: {
            text: 'User Activity'
        },
        xAxis: {
            categories: user,
            title: {
                text: 'username'
            }
        },
        series: [
            {
                name: 'User Contribution',
                data: numberContribution
            }
        ]
    };

    const options2 = {
        chart: {
            type: 'bar',
            height: 350
        },
        title: {
            text: 'Harvesting Metadata Distribution'
        },
        xAxis: {
            categories: organization,
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
                data: numberData
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
                if (data.status === "Expired token") {
                    //console.log("aaa")
                    //props.setLogout()
                    window.location.replace(Config.base_domain)
                } else {
                    console.log(data.data)
                    var number = []
                    var organ = []
                    data.data.forEach(element => {
                        number.push(element.count)
                        organ.push(element.organization_name)
                    });
                    setNumberData(number)
                    setOrganization(organ)
                    //setItems(data.data.slice(0, 10));
                }
            }
        })

        fetch(url_user, requestOptions).then(res => res.json()).then(data => {
            if (mounted2) {
                if (data.status === "Expired token") {
                    //console.log("aaa")
                    //props.setLogout()
                    window.location.replace(Config.base_domain)
                } else {
                    console.log(data.data)
                    var number = []
                    var organ = []
                    data.data.forEach(element => {
                        number.push(element.count)
                        organ.push(element.username)
                    });
                    setNumberContribution(number)
                    setUser(organ)
                    //setItems(data.data.slice(0, 10));
                }
            }
        })

        return function cleanup() {
            mounted = false;
            mounted2 = false;
        }
    }, [token, url_list]);

    return (
        <Row className="mx-3">
          
            <Col lg={6} className="mt-5">
                <HighchartsReact highcharts={Highcharts} options={options2} />
            </Col>
            <Col lg={6} className="mt-5">
                <HighchartsReact highcharts={Highcharts} options={options} />
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