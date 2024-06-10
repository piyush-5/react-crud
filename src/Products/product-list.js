import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, TextInput, Table, Rating } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AddEditProduct } from "../dialogs/add-edit-modal";

const List = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});
  const [opened, { open, close }] = useDisclosure(false);
  const [action, setAction] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const data = await fetch("https://dummyjson.com/products").then((res) =>
          res.json()
        );

        console.log(data);
        setData(data.products);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchProductData();
  }, []);

  const handleDelete = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setData(data.filter((item) => item.id !== id));
        } else {
          console.error("Error deleting item");
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleDialog = (item, action) => {
    item ? setSelectedProduct(item) : setSelectedProduct({});
    setAction(action);
    return open();
  };

  const searchData = (data) => {
    return data.filter((item) => {
      return item.title.toString().toLowerCase().includes(query);
    });
  };

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          {/* <input
            type={"text"}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          /> */}
          <div>
            <TextInput
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button size="xs" onClick={() => handleDialog(null, "add")}>
              Add Product
            </Button>
          </div>
          <Table
            striped
            highlightOnHover
            stickyHeader
            withTableBorder
            withColumnBorders
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Discount</Table.Th>
                <Table.Th>Rating</Table.Th>
                <Table.Th>Stock</Table.Th>
                <Table.Th>Brand</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {searchData(data).map((item) => (
                <Table.Tr key={item.id}>
                  <Link to={`/product/${item.id}`}>
                    <Table.Td>{item.title}</Table.Td>
                  </Link>
                  <Table.Td>{item.description}</Table.Td>
                  <Table.Td>{item.price}</Table.Td>
                  <Table.Td>{item.discountPercentage}</Table.Td>
                  <Table.Td>
                    <Rating value={item.rating} fractions={2} readOnly />
                  </Table.Td>
                  <Table.Td>{item.stock}</Table.Td>
                  <Table.Td>{item.brand}</Table.Td>
                  <Table.Td>{item.category}</Table.Td>
                  <Table.Td>
                    <Button
                      size="compact-xs"
                      onClick={() => handleDialog(item, "edit")}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="filled"
                      color="red"
                      size="compact-xs"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          {/* <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Rating</th>
                <th>Stock</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchData(data).map((item) => (
                <tr key={item.id}>
                  <Link to={`/product/${item.id}`}>
                    <td>{item.title}</td>
                  </Link>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.discountPercentage}</td>
                  <td>{item.rating}</td>
                  <td>{item.stock}</td>
                  <td>{item.brand}</td>
                  <td>{item.category}</td>
                  <td>
                    <button onClick={open}>Edit</button>
                  </td>
                  <td>
                    <Button
                      variant="filled"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <Modal
            closeOnClickOutside={false}
            opened={opened}
            onClose={close}
            title="Authentication"
          >
            {/* <span>Piyush</span> */}
            <AddEditProduct
              selectedProduct={selectedProduct}
              close={close}
              setData={setData}
              action={action}
            ></AddEditProduct>
          </Modal>
        </div>
      )}
    </>
  );
};

export default List;
