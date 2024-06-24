import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function Paymentastroreport() {
  const [isLoading, setIsLoading] = useState(true); 
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = 4;
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const sampleData = [
        { username: "User3", emailId: "user3@example.com", orderId: "1234", paymentId: "2345",  amountdeposit: "$10", dateTime:"26-04-2024 & 01:30", status: "success" },
        { username: "User4", emailId: "user4@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User5", emailId: "user5@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User6", emailId: "user6@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User7", emailId: "user7@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User8", emailId: "user8@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User9", emailId: "user9@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User10", emailId: "user10@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User11", emailId: "user11@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User12", emailId: "user12@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User13", emailId: "user13@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User14", emailId: "user14@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User15", emailId: "user15@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User16", emailId: "user16@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User17", emailId: "user17@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User18", emailId: "user18@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User19", emailId: "user19@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User20", emailId: "user20@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User21", emailId: "user21@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User22", emailId: "user22@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User23", emailId: "user23@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User24", emailId: "user24@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User25", emailId: "user25@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
        { username: "User26", emailId: "user26@example.com", orderId: "2345", paymentId:"3456",  amountdeposit: "$20",  dateTime:"27-04-2024 & 02:30", status: "pending" },
      ];
      setData(sampleData); 
      setIsLoading(false); 
    };
    fetchData(); 
  }, []);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div style={{ width: '100%', overflow: 'auto', height: '30rem' }}>
      {isLoading ? (
        <SkeletonTheme color="#e9e9e9" highlightColor="#f2f2f2">
          <Table striped bordered hover style={{ width: '100%', overflowY: 'auto', height: '25rem' }}>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th><Skeleton width={100} /></th>
                <th><Skeleton width={100} /></th>
                <th><Skeleton width={100} /></th>
                <th><Skeleton width={100} /></th>
                <th><Skeleton width={100} /></th>
                <th><Skeleton width={100} /></th>
                <th><Skeleton width={100} /></th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td><Skeleton /></td>
                  <td><Skeleton /></td>
                  <td><Skeleton /></td>
                  <td><Skeleton /></td>
                  <td><Skeleton /></td>
                  <td><Skeleton /></td>
                  <td><Skeleton /></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </SkeletonTheme>
      ) : (
        <div>
        <Table striped bordered hover style={{ width: '100%', overflowY: 'auto', height: '25rem' }}>
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th>Username</th>
              <th>EmailId</th>
              <th>OrderId</th>
              <th>PaymentId</th>
              <th>Amount deposit</th>
              <th>Date, Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {currentItems.map((row, index) => (
              <tr key={index}>
                <td>{row.username}</td>
                <td>{row.emailId}</td>
                <td>{row.orderId}</td>
                <td>{row.paymentId}</td>
                <td>{row.amountdeposit}</td>
                <td>{row.dateTime}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <nav aria-label="Page navigation example" >
  <ul className="pagination" style={{justifyContent:'flex-end'}}>
    <li className="page-item" >
      <a
        className="page-link"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(Math.max(currentPage - 1, 1));
        }}
      >
        Previous
      </a>
    </li>
    {[...Array(totalPages)].map((_, index) => (
      <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
        <a
          className="page-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(index + 1);
          }}
        >
          {index + 1}
        </a>
      </li>
    ))}
    <li className="page-item">
      <a
        className="page-link"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(Math.min(currentPage + 1, totalPages));
        }}
      >
        Next
      </a>
    </li>
  </ul>
</nav>
        </div> 
      )}
    </div>
  );
}
export default Paymentastroreport;