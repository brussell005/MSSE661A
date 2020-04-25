/**
 * @class InventoryList
 *
 * Creates a list of tasks and updates a list
 */

class InventoryList {
    items = [];
  
    constructor() {}
  
    /**
     * Build task list parent.
     * Uses bootstrap classes with some custom overrides.
     */
    createItemsListParent = () => {
      const ul = document.createElement('ul');
      ul.id = 'items-list';
      ul.className = 'list-group list-group-flush checked-list-box';
      return ul;
    };
  
 _deleteEventHandler = (itemId) => async () => {
      if (itemId) {
        const res = await deleteItem(itemId);
  
        if (res !== null) {
          this.items = this.items.filter((item) => item.inventory_id !== itemId);
          const item = document.getElementById(`item-${itemId}`);
          item.remove();
  
          if (!this.items.length) {
            const div = document.getElementById('items');
            const loadingDiv = div.childNodes[1];
            const errDiv = this.generateErrorMsg('Input some new items!');
            div.replaceChild(errDiv, loadingDiv);
          }
        }
      }
    };
  
    /**
     * Builds the list item.
     * Uses bootstrap classes with some custom overrides.
     *
     * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
     * @example
     * <li class="list-group-item">
     *   <button class="btn btn-secondary" onclick="deleteTask(e, index)">X</button>
     *   <span>Task name</span>
     *   <span>pending</span>
     *   <span>date create</span>
     * </li>
     */
    buildInventoryListRowItem = (item) => {
      const listGroupItem = document.createElement('li');
      listGroupItem.id = `item-${item.item_id}`; // task-1
      listGroupItem.className = 'list-group-item';
  
      const deleteBtn = document.createElement('button');
      const deleteBtnTxt = document.createTextNode('X');
      deleteBtn.className = 'btn btn-secondary';
      deleteBtn.addEventListener('click', this._deleteEventHandler(item.inventory_id));
      deleteBtn.appendChild(deleteBtnTxt);
  
      const itemNameSpan = document.createElement('span');
      const itemName = document.createTextNode(item.item_name);
      itemNameSpan.appendChild(itemName);
  
      const itemStatusSpan = document.createElement('span');
      const itemStatus = document.createTextNode(item.status);
      itemStatusSpan.append(itemStatus);
  
      const itemDateSpan = document.createElement('span');
      const itemDate = document.createTextNode(item.created_date);
      itemDateSpan.append(itemDate);
  
      // add list item's details
      listGroupItem.append(deleteBtn);
      listGroupItem.append(itemNameSpan);
      listGroupItem.append(itemStatusSpan);
      listGroupItem.append(itemDateSpan);
  
      return listGroupItem;
    };
  
    /**
     * Assembles the list items then mounts them to a parent node.
     * Uses bootstrap classes with some custom overrides.
     */
    buildItemList = (mount, items) =>
      items.map((item) => {
        const listGroupRowItem = this.buildInventoryListRowItem(item);
  
        // add entire list item
        mount.append(listGroupRowItem);
      });
  
    generateErrorMsg = (msg) => {
      const div = document.createElement('div');
      const text = document.createTextNode(msg);
      div.id = 'user-message';
      div.className = 'center';
      div.appendChild(text);
      return div;
    };
  
    generateItems = async () => {
      const res = await getItems();
      const div = document.getElementById('items');
      const loadingDiv = div.childNodes[1];
  
      if (res.length) {
        this.tasks = res;
        const tasksDiv = this.createItemsListParent();
        this.buildItemList(tasksDiv, res);
        div.replaceChild(tasksDiv, loadingDiv);
      } else {
        const errDiv = this.generateErrorMsg(res.msg);
        div.replaceChild(errDiv, loadingDiv);
      }
    };
  }
  
  const inst = new InventoryList();
  
  // This is an IIFE (Immediately Invoked Function Expression).
  (async () => {
    inst.generateItems();
  })();
  