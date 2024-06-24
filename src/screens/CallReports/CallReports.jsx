import React, {useState} from "react";
import { Table } from "react-bootstrap";
function CallReports() {
  const [data, setData] = useState([
    { tousername: "User1", toemailid: "user1@example.com", fromusername: "User2", fromemailid: "user2@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
    { tousername: "User3", toemailid: "user3@example.com", fromusername: "User4", fromemailid: "user4@example.com", callduration: "20 min", callamount: "$20", calldate: "2024-04-26" },
    { tousername: "User5", toemailid: "user5@example.com", fromusername: "User6", fromemailid: "user6@example.com", callduration: "30 min", callamount: "$30", calldate: "2024-05-27" },
    { tousername: "User7", toemailid: "user7@example.com", fromusername: "User8", fromemailid: "user8@example.com", callduration: "40 min", callamount: "$40", calldate: "2024-06-28" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
    { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "50 min", callamount: "$50", calldate: "2024-07-29" },
  ]);
  return (
    <div style={{width:"100%",overflow:'auto',height:"30rem"}}>
      <Table striped bordered hover style={{ width: "100%" ,height:"25rem",overflowY:"auto"}}>
        <thead>
          <tr>
            <th>To Username</th>
            <th>To EmailId</th>
            <th>From Username</th>
            <th>From EmailId</th>
            <th>Call Duration</th>
            <th>Call Amount</th>
            <th>Call Date </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.tousername}</td>
              <td>{row.toemailid}</td>
              <td>{row.fromusername}</td>
              <td>{row.fromemailid}</td>
              <td>{row.callduration}</td>
              <td>{row.callamount}</td>
              <td>{row.calldate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default CallReports;