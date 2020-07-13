import React from "react";

export default class Table extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const list = () =>{
         return this.props.orders.map((order,index)=>{
            var date = new Date(order.dateCreated);

            var formattedTime = date.toLocaleString();
            
            return(
              <tr>
                <td>{formattedTime}</td>
                <td>{innerList1(order.items)}</td>
                <td>{innerList2(order.items)}</td>
              </tr>
            );
          })
        }
        const innerList1 = (items) =>{
          return items.map((itemObj,index)=>{
            var text = itemObj.item.title;
            if(itemObj.quantity>1){
              text = text + " x" + itemObj.quantity;
            }
            return(
              <>
                  {text}<br/>
              </>
            );
          });
        }

          const innerList2 = (items) =>{
            var total = 0;
            return items.map((itemObj,index)=>{
              total = total + (itemObj.item.price * itemObj.quantity);
              var itemPrice = itemObj.item.price;
              if(itemObj.quantity>1){
                itemPrice = itemPrice * itemObj.quantity;
              }
              return(
                <>
                    {itemPrice.toFixed(2)}<br/>
                    {index==items.length-1?
                        <span>{total.toFixed(2)}</span>
                      :
                        null
                    }
                </>
              );
            });
          }
        
        return(
          <>
            {this.props.orders.length==0?
              <p>Empty</p>
              :
                <table style={{ width: "100%" }}>
                  <tr style={{marginBottom:'1rem'}}>
                    <th>Date</th>
                    <th>Item(s)</th>
                    <th style={{float:'right'}}>Price $:</th>
                  </tr>
                  {list()}
                  {/* <tr>
                    <td>7/11/2020</td>
                    <td>Sleek Bike<br/>Outdoor Lights</td>
                    <td>1500<br/>25<br/><span>1525</span></td>
                  </tr>
                  <tr>
                    <td>7/11/2020</td>
                    <td>Smith<br/>Smith<br/>Smith<br/>Smith</td>
                    <td>50</td>
                  </tr> */}
                </table>
            }
          </>
        );
    }
}