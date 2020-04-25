/**
 * AJAX add new tasks to task list on save.
 */
const doAddItem = async (e) => {
    e.preventDefault();
  
    const itemInput = document.getElementById('formInputItemName');
    const item_name = itemInput.value;
    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;
  
    if (!item_name) {
      alert('Please enter an item name.');
      return;
    }
  
    const res = await AddItem({ item_name, status });
  
    if (res !== null) {
      inst.generateItems();
    }
    itemInput.value = '';
  };
  