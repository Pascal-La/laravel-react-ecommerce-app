import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewProduct = () => {
  const [loading, setLoading] = useState(true);
  const [viewProduct, setProduct] = useState([]);

  useEffect(() => {
    document.title = "View Product";

    axios.get(`/api/view-product`).then((res) => {
      if (res.data.status === 200) {
        setProduct(res.data.products);
        setLoading(false);
      }
    });
  }, []);

  let viewProduct_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading...</h4>;
  } else {
    let ProdStatus = "";
    viewProduct_HTMLTABLE = viewProduct.map((item) => {
      if (item.status == "0") {
        ProdStatus = "Shown";
      } else if (item.status == "1") {
        ProdStatus = "Hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.category.name}</td>
          <td>{item.name}</td>
          <td>{item.selling_price}</td>
          <td>
            <img
              src={`http://localhost:8000/${item.image}`}
              width="50px"
              alt={item.name}
            />
          </td>
          <td>
            <Link
              to={`edit-product/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>{ProdStatus}</td>
        </tr>
      );
    });
  }

  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>
          View Product
          <Link
            to="/admin/add-product"
            className="btn btn-primary btn-sm float-end"
          >
            Add Product
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Product Name</th>
                <th>Selling Price</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{viewProduct_HTMLTABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
