const inventory_API = `${BASE_API_URL}/inventory`; // http://localhost:3000/api/inventory

const getItems = () => _get(inventory_API, OPTIONS_WITH_AUTH);

const AddItem = (formData) => 
  _post(inventory_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const deleteItem = (itemId) =>
  _delete(`${inventory_API}/${itemId}`, OPTIONS_WITH_AUTH);