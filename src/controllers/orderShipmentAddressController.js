import OrderShipmentAddress from "../models/OrderShipmentAddress.js";

const getAllAddresses = (req, res) => {
  OrderShipmentAddress.getAll((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};

const createAddress = (req, res) => {
  const { full_address, street_address, department_floor, town_city } = req.body;
  if (!full_address || !street_address || !town_city) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  OrderShipmentAddress.create(req.body, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(data);
  });
};

const deleteAddress = (req, res) => {
  const { id } = req.params;
  OrderShipmentAddress.delete(id, (err, data) => {
    if (err) return res.status(404).json({ error: err.message });
    res.json(data);
  });
};

// ✅ Export functions correctly
export { getAllAddresses, createAddress, deleteAddress };