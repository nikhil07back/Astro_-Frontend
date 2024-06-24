import React, { useState, useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function Chatastroreport() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = 4;
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const sampleData = [
        { tousername: "User2", toemailid: "user2@example.com", fromusername: "User4", fromemailid: "user4@example.com",  chat: "asdf", chatprice:"100", chatdate:"25-04-2024"},
        { tousername: "User6", toemailid: "user6@example.com", fromusername: "User8", fromemailid: "user8@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User10", toemailid: "user10@example.com", fromusername: "User12", fromemailid: "user12@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User14", toemailid: "user14@example.com", fromusername: "User16", fromemailid: "user16@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User18", toemailid: "user18@example.com", fromusername: "User20", fromemailid: "user20@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User22", toemailid: "user22@example.com", fromusername: "User24", fromemailid: "user24@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User26", toemailid: "user26@example.com", fromusername: "User28", fromemailid: "user28@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User30", toemailid: "user30@example.com", fromusername: "User32", fromemailid: "user32@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User34", toemailid: "user34@example.com", fromusername: "User36", fromemailid: "user36@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User38", toemailid: "user38@example.com", fromusername: "User40", fromemailid: "user40@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User42", toemailid: "user42@example.com", fromusername: "User44", fromemailid: "user44@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User46", toemailid: "user46@example.com", fromusername: "User48", fromemailid: "user48@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User50", toemailid: "user50@example.com", fromusername: "User52", fromemailid: "user52@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User54", toemailid: "user54@example.com", fromusername: "User56", fromemailid: "user56@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User58", toemailid: "user58@example.com", fromusername: "User60", fromemailid: "user60@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User62", toemailid: "user62@example.com", fromusername: "User64", fromemailid: "user64@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User68", toemailid: "user68@example.com", fromusername: "User70", fromemailid: "user70@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User72", toemailid: "user72@example.com", fromusername: "User74", fromemailid: "user74@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User76", toemailid: "user76@example.com", fromusername: "User78", fromemailid: "user78@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User80", toemailid: "user80@example.com", fromusername: "User82", fromemailid: "user82@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User84", toemailid: "user84@example.com", fromusername: "User86", fromemailid: "user86@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User88", toemailid: "user88@example.com", fromusername: "User90", fromemailid: "user90@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User92", toemailid: "user92@example.com", fromusername: "Use94", fromemailid: "user94@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
        { tousername: "User96", toemailid: "user96@example.com", fromusername: "User98", fromemailid: "user98@example.com",  chat: "ghj", chatprice:"200", chatdate:"26-04-2024"  },
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
                <th>Chat</th>
                <th>Chat Price</th>
                <th>Chat Date</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {currentItems.map((row, index) => (
                <tr key={index}>
                  <td>{row.tousername}</td>
                  <td>{row.toemailid}</td>
                  <td>{row.fromusername}</td>
                  <td>{row.fromemailid}</td>
                  <td>{row.chat}</td>
                  <td>{row.chatprice}</td>
                  <td>{row.chatdate}</td>
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
export default Chatastroreport;