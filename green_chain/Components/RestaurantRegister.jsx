import React, { useState } from "react";

const RestaurantRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    wasteType: [],
    cookedWastes: {},
    uncookedWastes: {},
  });

  const wasteOptions = ["Cooked", "Uncooked"];
  const wasteItems = {
    cooked: ["Cooking oil & fats", "Plate leftovers", "Teabag & tea leaves", "Bread & bakery items"],
    uncooked: ["Vegetable/Fruit Peels", "Egg Shells", "Meat/Fish Trimmings"],
  };

  const incrementOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          wasteType: [...formData.wasteType, name],
        });
      } else {
        setFormData({
          ...formData,
          wasteType: formData.wasteType.filter((item) => item !== name),
          cookedWastes: { ...formData.cookedWastes, [name]: null },
          uncookedWastes: { ...formData.uncookedWastes, [name]: null },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleWasteWeightChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      cookedWastes: { ...formData.cookedWastes, [name]: value },
      uncookedWastes: { ...formData.uncookedWastes, [name]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <div className="container mx-auto max-w-md p-4 border rounded-lg shadow-lg" style={{ marginTop: "5px" }}>
      <h1 className="text-2xl font-bold mb-4">Restaurant Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            maxLength="150"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location/Address
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            maxLength="250"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
            Contact Information (Phone Number)
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            pattern="[0-9]{10}"
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type of Wastes Generated</label>
          {wasteOptions.map((option) => (
            <div key={option} className="mb-2">
              <label>
                <input
                  type="checkbox"
                  name={option}
                  checked={formData.wasteType.includes(option)}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {option}
              </label>
            </div>
          ))}
        </div>
        {formData.wasteType.includes("Cooked") && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Cooked Wastes</label>
            {wasteItems.cooked.map((item) => (
              <div key={item} className="mb-2">
                <label htmlFor={item} className="block text-sm font-medium text-gray-700">
                  {item}
                </label>
                <select
                  id={item}
                  name={item}
                  value={formData.cookedWastes[item] || ""}
                  onChange={handleWasteWeightChange}
                  className="border rounded-lg px-3 py-2"
                >
                  {incrementOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} kgs
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
        {formData.wasteType.includes("Uncooked") && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Uncooked Wastes</label>
            {wasteItems.uncooked.map((item) => (
              <div key={item} className="mb-2">
                <label htmlFor={item} className="block text-sm font-medium text-gray-700">
                  {item}
                </label>
                <select
                  id={item}
                  name={item}
                  value={formData.uncookedWastes[item] || ""}
                  onChange={handleWasteWeightChange}
                  className="border rounded-lg px-3 py-2"
                >
                  {incrementOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} kgs
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RestaurantRegistration;
