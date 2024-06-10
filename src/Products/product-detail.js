import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  debugger;
  const [product, setProductDetails] = useState({});
  const { productid } = useParams();

  useEffect(() => {
    const getProductdetails = async () => {
      try {
        const data = await fetch(
          `https://dummyjson.com/products/${productid}`
        ).then((res) => res.json());

        console.log(data);
        setProductDetails(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    getProductdetails();
  }, [productid]);

  const fields = Object.keys(product || {});

  return (
    <div>
      <table>
        <tbody>
          {fields?.map((field) => (
            <tr>
              <td>
                <h4>{field}</h4>
              </td>
              <td>
                {typeof product[field] == "string" ? product[field] : "Object"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProductDetail;
