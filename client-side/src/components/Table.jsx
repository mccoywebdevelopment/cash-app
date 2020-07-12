import React from "react";

export default class Table extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <table style={{ width: "100%" }}>
                  <tr style={{marginBottom:'1rem'}}>
                    <th>Date</th>
                    <th>Item(s)</th>
                    <th style={{float:'right'}}>Price $:</th>
                  </tr>
                  <tr>
                    <td>7/11/2020</td>
                    <td>Sleek Bike<br/>Outdoor Lights</td>
                    <td>1500<br/>25<br/><span>1525</span></td>
                  </tr>
                  <tr>
                    <td>7/11/2020</td>
                    <td>Smith<br/>Smith<br/>Smith<br/>Smith</td>
                    <td>50</td>
                  </tr>
            </table>
        );
    }
}