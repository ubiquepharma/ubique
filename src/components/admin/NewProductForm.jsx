"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const NewProductForm = ({ item, edit, view, setModal }) => {
  const [formData, setFormData] = useState({
    brand: "",
    category: "",
    packagingsize: "",
    mrp: "",
    pts: "",
    ptr: "",
    composition: "",
    image: [],
    expireDate: "",
    businessType: "",
    applicationType: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      const data = response.data.data;
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (edit && item) {
      setFormData({
        productId: item.productId,
        brand: item.brand,
        category: item.category,
        packagingsize: item.packagingsize,
        businessType: item.businessType,
        applicationType: item.applicationType,
        mrp: item.mrp,
        pts: item.moq,
        ptr: item.medicineType,
        composition: item.composition,
        expireDate: item.expireDate,
        image: item.image.secure_url || "",
      });
    }
    fetchCategories();
  }, [edit, item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    // Validate required fields
    if (!formData.brand) errors.brand = "Brand Name is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.packagingsize)
      errors.packagingsize = "Packaging Size is required";
    if (!formData.mrp) errors.mrp = "M.R.P is required";
    if (!formData.pts) errors.pts = "M.O.Q is required";
    if (!formData.applicationType) errors.applicationType = "Application Type is required";
    if (!formData.ptr) errors.ptr = "Medicine Type is required";
    if (!formData.composition) errors.composition = "Composition is required";
    if (!formData.expireDate) errors.expiryDate = "Expiry Date is required";
    if (!formData.image) errors.image = "At least one image is required";

    // Validate image size
    if (formData.image.size > 300000) {
      errors.image = "Image size should be less than 300 KB";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("brand", formData.brand);
      formDataToSubmit.append("category", formData.category);
      formDataToSubmit.append("packagingsize", formData.packagingsize);
      formDataToSubmit.append("mrp", formData.mrp);
      formDataToSubmit.append("moq", formData.pts);
      formDataToSubmit.append("medicineType", formData.ptr);
      formDataToSubmit.append("composition", formData.composition);
      formDataToSubmit.append("businessType", formData.businessType);
      formDataToSubmit.append("applicationType", formData.applicationType);

      formDataToSubmit.append("expireDate", formData.expireDate); // Add expiry date to formData
      if (formData.image instanceof File) {
        formDataToSubmit.append("image", formData.image);
      } else if (formData.image) {
        formDataToSubmit.append("image", formData.image);
      }

      // console.log(Object.fromEntries(formDataToSubmit));
      let response;

      if (edit) {
        // If in edit mode, make a PUT request
        response = await axios.put(
          `/api/product/${item.productId}`,
          formDataToSubmit
        );
      } else {
        // If not in edit mode, make a POST request
        response = await axios.post("/api/product", formDataToSubmit);
      }

      if (response.data.success) {
        setModal(false);
        setLoading(false);
        alert(
          edit ? "Product updated successfully!" : "Product added successfully!"
        );
      } else {
        alert("Error adding or updating product!");
        setLoading(false);
      }
    } catch (error) {
      alert("An error occurred!");
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4 w-full py-4" onSubmit={handleSubmit}>
        {/* Brand Name */}
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="brand">Brand Name</label>
          {view ? (
            <p className="text-lg font-semibold">{formData.brand}</p>
          ) : (
            <input
              type="text"
              name="brand"
              value={formData.brand}
              required
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              placeholder="Brand Name"
              className="bg-defined-white p-4 w-full rounded"
            />
          )}
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand}</p>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="category">Category</label>
          {view ? (
            <p className="text-lg font-semibold">{formData.category}</p>
          ) : (
            <select
              name="category"
              required
              value={formData.category} // Controlled by the value of formData.category
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="p-4 rounded bg-defined-white"
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          )}
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Packaging Size */}
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="packagingsize">Packaging Size</label>
          <input
            type="text"
            name="packagingsize"
            value={formData.packagingsize}
            required
            onChange={(e) =>
              setFormData({ ...formData, packagingsize: e.target.value })
            }
            placeholder="Packaging Size"
            className="bg-defined-white p-4 w-full rounded"
          />
          {errors.packagingsize && (
            <p className="text-red-500 text-sm">{errors.packagingsize}</p>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="businessType">Business Type</label>
          <input
            type="text"
            name="businessType"
            value={formData.businessType}
            required
            onChange={(e) =>
              setFormData({ ...formData, businessType: e.target.value })
            }
            placeholder="Business Type"
            className="bg-defined-white p-4 w-full rounded"
          />
          {errors.businessType && (
            <p className="text-red-500 text-sm">{errors.businessType}</p>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="applicationType">Application Type</label>
          <input
            type="text"
            name="applicationType"
            value={formData.applicationType}
            required
            onChange={(e) =>
              setFormData({ ...formData, applicationType: e.target.value })
            }
            placeholder="Application Type"
            className="bg-defined-white p-4 w-full rounded"
          />
          {errors.applicationType && (
            <p className="text-red-500 text-sm">{errors.applicationType}</p>
          )}
        </div>

        {/* MRP */}
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="mrp">M. R. P.</label>
          <input
            type="text"
            name="mrp"
            value={formData.mrp}
            required
            onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
            placeholder="M. R. P."
            className="bg-defined-white p-4 w-full rounded"
          />
          {errors.mrp && <p className="text-red-500 text-sm">{errors.mrp}</p>}
        </div>

        {/* MOQ */}
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="pts">M.O.Q</label>
          <input
            type="text"
            name="pts"
            value={formData.pts}
            required
            onChange={(e) => setFormData({ ...formData, pts: e.target.value })}
            placeholder="M.O.Q"
            className="bg-defined-white p-4 w-full rounded"
          />
          {errors.pts && <p className="text-red-500 text-sm">{errors.pts}</p>}
        </div>

        {/* Medicine Type */}
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="ptr">Medicine Type</label>
          <input
            type="text"
            name="ptr"
            value={formData.ptr}
            required
            onChange={(e) => setFormData({ ...formData, ptr: e.target.value })}
            placeholder="Medicine Type"
            className="bg-defined-white p-4 w-full rounded"
          />
          {errors.ptr && <p className="text-red-500 text-sm">{errors.ptr}</p>}
        </div>

        {/* Composition (using React Quill) */}
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="composition">Composition</label>
          <textarea
            value={formData.composition}
            onChange={
              (e) => setFormData({ ...formData, composition: e.target.value }) // Corrected to handle textarea value
            }
            className="bg-defined-white min-h-[8rem]  p-4 w-full rounded"
            placeholder="Enter Composition"
          />
          {errors.composition && (
            <p className="text-red-500 text-sm">{errors.composition}</p>
          )}
        </div>

        {/* Expiry Date */}
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            name="expireDate"
            value={formData.expireDate}
            required
            onChange={(e) =>
              setFormData({ ...formData, expireDate: e.target.value })
            }
            className="bg-defined-white p-4 w-full rounded"
          />
          {errors.expireDate && (
            <p className="text-red-500 text-sm">{errors.expireDate}</p>
          )}
        </div>

        {/* Images */}
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="image">Product Image</label>

          {/* If editing, show existing image */}

          {/* Image input for uploading new image */}
          <input
            type="file"
            name="image"
            onChange={(e) => {
              const file = e.target.files[0];
              setFormData({
                ...formData,
                image: file, // Store the new image file
              });
            }}
            className="bg-defined-white p-4 w-full rounded"
          />
          {edit && formData.image && typeof formData.image === "string" && (
            <div>
              <Image
                src={formData.image} // This is the URL of the image (item.image.secure_url)
                alt="Existing Product Image"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
          )}

          {/* Display error message if image field is invalid */}
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}

          {/* Display the uploaded image if any (for new image preview) */}
          {formData.image && formData.image instanceof File && (
            <div className="relative w-32 h-32 mt-2">
              <Image
                src={URL.createObjectURL(formData.image)} // Display new uploaded image preview
                alt="Uploaded Product Image"
                width={100}
                height={100}
                className="object-cover"
              />
              <IoIosCloseCircleOutline
                className="absolute top-0 right-0 text-red-500 cursor-pointer"
                onClick={() => {
                  setFormData({ ...formData, image: null }); // Clear the uploaded image
                }}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-defined-green text-white p-4 rounded mt-4"
          disabled={loading}
        >
          {loading ? "Processing..." : edit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default NewProductForm;