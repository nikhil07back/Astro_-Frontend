import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function CallReports() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const totalPages = 4; 
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const sampleData = [
        { tousername: "User1", toemailid: "user1@example.com", fromusername: "User2", fromemailid: "user2@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User3", toemailid: "user3@example.com", fromusername: "User4", fromemailid: "user4@example.com", callduration: "20 min", callamount: "$20", calldate: "2024-04-26" },
        { tousername: "User5", toemailid: "user5@example.com", fromusername: "User6", fromemailid: "user6@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User7", toemailid: "user7@example.com", fromusername: "User8", fromemailid: "user8@example.com", callduration: "20 min", callamount: "$20", calldate: "2024-03-25" },
        { tousername: "User9", toemailid: "user9@example.com", fromusername: "User10", fromemailid: "user10@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User11", toemailid: "user11@example.com", fromusername: "User12", fromemailid: "user12@example.com", callduration: "20 min", callamount: "$20", calldate: "2024-03-25" },
        { tousername: "User13", toemailid: "user13@example.com", fromusername: "User14", fromemailid: "user14@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User15", toemailid: "user15@example.com", fromusername: "User16", fromemailid: "user16@example.com", callduration: "20 min", callamount: "$20", calldate: "2024-03-25" },
        { tousername: "User17", toemailid: "user17@example.com", fromusername: "User18", fromemailid: "user18@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User19", toemailid: "user19@example.com", fromusername: "User20", fromemailid: "user20@example.com", callduration: "20 min", callamount: "$20", calldate: "2024-03-25" },
        { tousername: "User21", toemailid: "user21@example.com", fromusername: "User22", fromemailid: "user22@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User23", toemailid: "user23@example.com", fromusername: "User24", fromemailid: "user24@example.com", callduration: "20 min", callamount: "$20", calldate: "2024-03-25" },
        { tousername: "User25", toemailid: "user25@example.com", fromusername: "User26", fromemailid: "user26@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User27", toemailid: "user27@example.com", fromusername: "User28", fromemailid: "user28@example.com", callduration: "20 min", callamount: "$20", calldate: "2024-03-25" },
        { tousername: "User29", toemailid: "user29@example.com", fromusername: "User30", fromemailid: "user30@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User31", toemailid: "user31@example.com", fromusername: "User32", fromemailid: "user32@example.com", callduration: "20 min", callamount: "$0", calldate: "2024-03-25" },
        { tousername: "User33", toemailid: "user33@example.com", fromusername: "User34", fromemailid: "user34@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User35", toemailid: "user35@example.com", fromusername: "User36", fromemailid: "user36@example.com", callduration: "20 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User37", toemailid: "user37@example.com", fromusername: "User38", fromemailid: "user38@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User39", toemailid: "user39@example.com", fromusername: "User40", fromemailid: "user40@example.com", callduration: "20 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User41", toemailid: "user41@example.com", fromusername: "User42", fromemailid: "user42@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User43", toemailid: "user43@example.com", fromusername: "User44", fromemailid: "user44@example.com", callduration: "20 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User45", toemailid: "user45@example.com", fromusername: "User46", fromemailid: "user46@example.com", callduration: "10 min", callamount: "$10", calldate: "2024-03-25" },
        { tousername: "User47", toemailid: "user47@example.com", fromusername: "User48", fromemailid: "user48@example.com", callduration: "20 min", callamount: "$10", calldate: "2024-03-25" }, 
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
      {isLoading? (
        <SkeletonTheme color="#e9e9e9" highlightColor="#f2f2f2">
          <Table striped bordered hover style={{ width: '100%', overflowY: 'auto', height: '25rem' }}>
            <thead>
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
            <thead style={{textAlign:'center'}}>
              <tr>
                <th>To Username</th>
                <th>To EmailId</th>
                <th>From Username</th>
                <th>From EmailId</th>
                <th>Call Duration</th>
                <th>Call Amount </th>
                <th>Call Date</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {currentItems.map((row, index) => (
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
export default CallReports;