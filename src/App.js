import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pageNumber, setPageNumber] = useState(2);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const getIssues = async () => {
      const res = await axios.get(
        `https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5 `
      );
      console.log(res.data);
      setIssues(res.data);
    };

    getIssues();
  }, [pageNumber]);

  const handlePrev = () => {
    if (pageNumber >= 2) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber <= 4) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  return (
    <div className="App">
      <h1 className="heading">Github Issues</h1>
      <div className="pageNo">Page Number {pageNumber}</div>
      <ul>
        {issues.map((issue) => (
          <li>{issue.title}</li>
        ))}
      </ul>
      <div className="buttons">
        <button
          className="prev"
          onClick={handlePrev}
          disabled={pageNumber === 1 ? true : false}
        >
          Prev
        </button>
        <button
          className="next"
          onClick={handleNext}
          disabled={pageNumber === 5 ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
