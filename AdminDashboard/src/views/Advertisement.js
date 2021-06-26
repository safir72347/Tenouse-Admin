/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{useEffect, useState, useContext} from 'react';
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  Table
} from "reactstrap";


function Advertisement (){

    const [ad_counts, setadcounts] = React.useState(false);
    const [ad_selected, setadselected] = React.useState(false);
    const [total_reward, settotalreward] = React.useState(false);
    const [dataset, setdataset] = React.useState(false);
    

    React.useEffect(() => {
        getAdData()
    }, []);

    const getAdData = async () => {
        fetch("/getadvertisementdata", {
            method:"get",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(data=>{
            setadselected(Number(data.ad_selected) + 1);
            settotalreward(data.total_reward);
            let counts = [];
            for (let i of Object.keys(data.ad_counts)){
                counts.push(data.ad_counts[i])
            }
            setadcounts(counts);
            setdataset(data.dataset);
        })
    }

    let labels = ['Ad-1', 'Ad-2', 'Ad-3', 'Ad-4', 'Ad-5', 'Ad-6', 'Ad-7', 'Ad-8', 'Ad-9', 'Ad-10']
    const data = {
        labels: labels,
        datasets: [{
          label: 'Advertisement Analysis',
          data: ad_counts || [65, 59, 80, 81, 56, 55, 40, 55, 60, 48],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(153, 102, 255)',
            'rgb(255, 205, 86)',
            'rgb(255, 159, 64)',
            'rgb(255, 99, 132)'
          ],
          borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };

    return (
        
      <>
        <div className="content">

          <Row>
            <Col md="8" style={{ marginLeft:"auto", marginRight:"auto", marginTop:"60px" }}>

            <h5 className="title">Advertisement Analysis (Reinforcement Learning)</h5>
              <Card>

                <CardHeader>
                  
                </CardHeader>
                <CardBody>
                  
                      
                     
                    <Row>
                      <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <Label for="exampleSelect1">All Advertisements</Label>
                        {
                            ad_counts? 
                            ad_counts.map((item, index) => {
                                return (
                                    <h5>Ad-{index+1}: {item}</h5>
                                )
                            })
                            :
                            <h4>Loading...</h4>
                        }
                    </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                      <FormGroup>
                        {/* <Label for="exampleSelect2">Quarter</Label> */}
                        <h4> Ad Selected : 
                        {ad_selected ? 
                            ' ' + ad_selected
                            :
                            ' Loading...'
                        }
                        </h4>
                        
                        <h4>
                        Total Reward : 
                        {total_reward ? 
                            ' ' + total_reward
                            :
                            ' Loading...'
                        }
                        </h4>
                        
                        
                    </FormGroup>
                      </Col>
                    </Row>

                    <h4 style={{ paddingTop:"30px", paddingBottom:"30px", textAlign:"center" }}> Advertisement Analysis</h4>

                    {
                        config? 
                        <Bar data = {config.data}></Bar>
                        :
                        <h3>Loading...</h3>
                    }
                    
                  
                </CardBody>
                <CardFooter>
                  
                </CardFooter>


              </Card>


              <Card>
              
                <CardHeader>
                  <h5 className="title">Dataset</h5>
                </CardHeader>
                <CardBody>
                  
                      
                     


                    <div style={{
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}>



                    <Table bordered>
                    <thead>
                        <tr>
                    <th>Ad1</th>
                    <th>Ad2</th>
                    <th>Ad3</th>
                    <th>Ad4</th>
                    <th>Ad5</th>
                    <th>Ad6</th>
                    <th>Ad7</th>
                    <th>Ad8</th>
                    <th>Ad9</th>
                    <th>Ad10</th>
                    </tr>
                    </thead>
                    
                    <tbody>
                    {
                        dataset ? dataset.map(row => {
                            return (
                                <tr>
                                    {
                                        row.map((element) => {
                                            return (
                                                <td> {element} </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        }):'Loading...'

                        
                        
                    }
                    
                    </tbody>
                    
                        
                    </Table>

                    </div>

                      

                    
                
                </CardBody>
                <CardFooter>

                </CardFooter>

                
              </Card>
            </Col>
            
          </Row>

        </div>
      </>
    );
  
}

export default Advertisement;