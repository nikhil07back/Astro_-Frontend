import React, {useState} from "react";
import { Table } from "react-bootstrap";
function Payment() {
  const [data, setData] = useState([
    { tousername: "user1", toemailid: "user1@example.com", fromusername: "User2", fromemailid: "user2@example.com",  callamount: "$10", },
    { tousername: "priya", toemailid: "user3@example.com", fromusername: "User4", fromemailid: "user4@example.com",  callamount: "$20",  },
    { tousername: "nikita", toemailid: "user5@example.com", fromusername: "User6", fromemailid: "user6@example.com",  callamount: "$30",  },
    { tousername: "anil", toemailid: "user7@example.com", fromusername: "User8", fromemailid: "user8@example.com",  callamount: "$40",  },
    { tousername: "pradip", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callamount: "$50",  },
    { tousername: "pradip", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callamount: "$50",  },
    { tousername: "pradip", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callamount: "$50",  },
    { tousername: "pradip", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callamount: "$50",  },
    { tousername: "pradip", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callamount: "$50",  },
    { tousername: "pradip", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callamount: "$50",  },
    { tousername: "pradip", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callamount: "$50",  },
  ]);
  return (
    <div style={{width:"100%",overflow:'auto',height:"30rem"}}>
      <Table striped bordered hover style={{ width: "100%" ,height:"25rem",overflowY:"auto"}}>
        <thead>
          <tr>
            <th>To Username</th>
            <th>To EmailId</th>
            <th>PaymentId </th>
            <th>How much Amount deposit</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.tousername}</td>
              <td>{row.toemailid}</td>
              <td>{row.fromusername}</td>
              <td>{row.fromemailid}</td>
              <td>{row.callamount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Payment;