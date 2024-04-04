class ProductManager {
  constructor() {
    this.editIndex = null;
    this.products = [];
    this.tableBody = document.querySelector("#myTable tbody");
    this.modal = document.getElementById("myModal");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalActionButton = document.getElementById("modalActionButton");
    this.init();
    this.updateTableFromLocalStorage();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    document
      .querySelector(".add-data-button")
      .addEventListener("click", () => this.openAddModal());
    document
      .querySelector(".close")
      .addEventListener("click", () => this.closeModal());
    this.modalActionButton.addEventListener("click", () =>
      this.addOrUpdateProduct()
    );
    document
      .getElementById("searchInput")
      .addEventListener("keyup", () => this.filterTable());
  }

  filterTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("myTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      let display = false;
      const td = tr[i].getElementsByTagName("td");

      for (let j = 0; j < td.length; j++) {
        if (td[j]) {
          const txtValue = td[j].textContent || td[j].innerText;

          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            display = true;
            break;
          }
        }
      }

      tr[i].style.display = display ? "" : "none";
    }
  }

  openAddModal() {
    this.modal.style.display = "block";
    this.modalTitle.textContent = "Add Product";
    this.modalActionButton.textContent = "Add Product";
    this.editIndex = null;
    this.clearModalFields();
  }

  closeModal() {
    this.modal.style.display = "none";
    this.updateTableFromLocalStorage();
  }

  addOrUpdateProduct() {
    const newName = document.getElementById("newNameModal").value;
    const newSKU = document.getElementById("newSKUModal").value;
    const newCategory = document.getElementById("newCategoryModal").value;
    const newPrice = document.getElementById("newPriceModal").value;
    const newStock = document.getElementById("newStockModal").value;
    const newManufacturer = document.getElementById(
      "newManufacturerModal"
    ).value;
    const newSupplier = document.getElementById("newSupplierModal").value;
    const newDescription = document.getElementById("newDescriptionModal").value;

    if (
      newName &&
      newSKU &&
      newCategory &&
      newPrice &&
      newStock &&
      newManufacturer &&
      newSupplier &&
      newDescription
    ) {
      const newProduct = {
        name: newName,
        SKU: newSKU,
        category: newCategory,
        price: newPrice,
        stock: newStock,
        manufacturer: newManufacturer,
        supplier: newSupplier,
        description: newDescription,
      };

      if (this.editIndex !== null) {
        // If editIndex is not null, it means we are updating an existing product
        this.products[this.editIndex] = newProduct;
      } else {
        // If editIndex is null, it means we are adding a new product
        this.products.push(newProduct);
      }

      localStorage.setItem("products", JSON.stringify(this.products));
      this.closeModal();
    } else {
      alert("Please fill in all fields.");
    }
  }

  updateTableFromLocalStorage() {
    this.products = JSON.parse(localStorage.getItem("products")) || [];
    this.tableBody.innerHTML = "";

    this.products.forEach((product, index) => {
      const newRow = this.tableBody.insertRow();
      Object.values(product).forEach((value) => {
        const cell = newRow.insertCell();
        cell.textContent = value;
      });

      const actionCell = newRow.insertCell();
      const editButton = this.createButton("Edit", () =>
        this.openEditModal(index)
      );
      const deleteButton = this.createButton("Delete", () =>
        this.deleteProduct(index)
      );
      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
    });
  }

  openEditModal(index) {
    this.editIndex = index;
    const product = this.products[index];
    this.fillModalFields(product);
    this.modal.style.display = "block";
    this.modalTitle.textContent = "Update Product";
    this.modalActionButton.textContent = "Update Product";
  }

  deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(this.products));
      this.updateTableFromLocalStorage();
    }
  }

  clearModalFields() {
    const modalInputs = document.querySelectorAll("#addProductFormModal input");
    modalInputs.forEach((input) => (input.value = ""));
  }

  fillModalFields(product) {
    document.getElementById("newNameModal").value = product.name;
    document.getElementById("newSKUModal").value = product.SKU;
    document.getElementById("newCategoryModal").value = product.category;
    document.getElementById("newPriceModal").value = product.price;
    document.getElementById("newStockModal").value = product.stock;
    document.getElementById("newManufacturerModal").value =
      product.manufacturer;
    document.getElementById("newSupplierModal").value = product.supplier;
    document.getElementById("newDescriptionModal").value = product.description;
  }

  createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("action-button");
    button.onclick = clickHandler;
    return button;
  }
}

const productManager = new ProductManager();
