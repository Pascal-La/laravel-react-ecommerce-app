import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewCategory = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/getCategory`).then((res) => {
      if (isMounted) {
        // Fix error : "Can't perform a React state update on an unmounted component" (leak unnecessary data)
        if (res.data.status === 200) {
          setCategory(res.data.category);
          console.log(res.data.category);
          setLoading(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  let showCategoryList = "";
  if (loading) {
    return <h4>Loading...</h4>;
  } else {
    showCategoryList = category.map((item, idx) => {
      return (
        <div className="col-md-4" key={idx}>
          <div className="card">
            <Link to={`collections/${item.slug}`}>
              <img src="" className="w-100" alt={item.name} />
            </Link>
            <div className="card-body">
              <Link to={`collections/${item.slug}`}>
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Category Page</h6>
        </div>
      </div>
      <div className="py-3">
        <div className="container">
          <div className="row">{showCategoryList}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
