import React from "react";
import { useForm } from "@mantine/form";
import { NumberInput, TextInput, Button } from "@mantine/core";

export const AddEditProduct = ({ selectedProduct, close, setData, action }) => {
  console.log(selectedProduct, action);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: selectedProduct.title ? selectedProduct.title : "",
      desc: selectedProduct.description ? selectedProduct.description : "",
      stock: selectedProduct.stock ? selectedProduct.stock : 0,
      brand: selectedProduct.brand ? selectedProduct.brand : "",
      cat: selectedProduct.category ? selectedProduct.category : "",
    },

    validate: {
      title: (value) =>
        value.trim() === "" && value.length < 2
          ? "Title must have at least 2 letters"
          : null,
      stock: (value) => (value < 1 ? "Must have atleast 1 stock" : null),
    },
  });

  const updateProduct = () => {
    form.onSubmit(console.log);
    console.log(form.getValues());
    const { title, desc, stock, brand, cat } = form.getValues();
    /* updating title of product with id 1 */
    fetch(`https://dummyjson.com/products/${selectedProduct.id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: desc,
        stock: stock,
        brand: brand,
        category: cat,
      }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        setData((prevData) => {
          return prevData.map((data, index) => {
            if (data.id === updatedProduct.id) {
              return updatedProduct;
            } else {
              return prevData[index];
            }
          });
        });
      })
      .then(console.log)
      .then(close);
  };

  const addProduct = () => {
    const { title, desc, stock, brand, cat } = form.getValues();
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: desc,
        stock: stock,
        brand: brand,
        category: cat,
      }),
    })
      .then((res) => res.json())
      .then((newProduct) => {
        setData((prev) => [...prev, newProduct]);
      })
      .then(console.log)
      .then(close);
  };

  return (
    <form
      onSubmit={form.onSubmit(action === "edit" ? updateProduct : addProduct)}
    >
      {selectedProduct.id}
      <TextInput
        label="Title"
        placeholder="Title"
        key={form.key("title")}
        {...form.getInputProps("title")}
      />
      <TextInput
        mt="sm"
        label="Description"
        placeholder="Description"
        key={form.key("desc")}
        {...form.getInputProps("desc")}
      />
      <NumberInput
        mt="sm"
        label="Stock"
        placeholder="Stock"
        min={1}
        max={10}
        key={form.key("stock")}
        {...form.getInputProps("stock")}
      />
      <TextInput
        label="Brand"
        placeholder="Brand"
        key={form.key("brand")}
        {...form.getInputProps("brand")}
      />
      <TextInput
        label="Category"
        placeholder="Category"
        key={form.key("cat")}
        {...form.getInputProps("cat")}
      />
      <Button mt="sm" type="submit">
        Submit
      </Button>
    </form>
  );
};
