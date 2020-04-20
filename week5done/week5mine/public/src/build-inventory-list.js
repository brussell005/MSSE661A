

// This is an IIFE (Immediately Invoked Function Expression).
// What it does is in the name.
(async () => {
  const items = await getinventory();
  console.log(items);

  if (items.length) {
    const div = document.getElementById('items');
    const loadingDiv = div.childNodes[1];

    const ul = document.createElement('ul');

    // replace 'loading...' with list
    div.replaceChild(ul, loadingDiv); // <- order is important here!

    // create the list
    items.map((item) => {
      // building blocks
      const li = document.createElement('li');
      li.className = 'task-item';
      const block = document.createElement('div');
      block.className = 'item-block';

      //   content
      const checkboxSpan = document.createElement('span');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkboxSpan.className = 'item-checkbox';
      checkboxSpan.appendChild(checkbox);

      const nameSpan = document.createElement('span');
      nameSpan.className = 'item-name';
      nameSpan.innerText = item.item_name;

      const statusSpan = document.createElement('span');
      statusSpan.className = 'item-status';
      statusSpan.innerText = item.status;

      const dateSpan = document.createElement('span');
      dateSpan.className = 'item-date';
      dateSpan.innerText = item.created_date;

      // add list item
      block.appendChild(checkboxSpan);
      block.appendChild(nameSpan);
      block.appendChild(statusSpan);
      block.appendChild(dateSpan);

      li.appendChild(block);
      ul.appendChild(li);
    });
  }
})();
