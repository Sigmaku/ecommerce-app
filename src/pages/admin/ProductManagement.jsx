import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Upload,
  Download,
  Eye,
  Check,
  X,
  DollarSign,
  Tag,
  Users,
  BarChart3,
  AlertCircle,
  ShoppingBag,
  Home,
  LogOut,
  Settings,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

const ProductManagement = ({ adminUser, onLogout }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Laptop",
    stock: "",
    brand: "",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
  });

  const loadProducts = () => {
    setIsLoading(true);
    setTimeout(() => {
      const saved = localStorage.getItem("admin_products");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Ensure proper data types
          const fixedProducts = parsed.map((p) => ({
            ...p,
            price: parseFloat(p.price) || 0,
            stock: parseInt(p.stock) || 0,
            id: parseInt(p.id) || Date.now() + Math.random(),
          }));
          setProducts(fixedProducts);
        } catch (error) {
          console.error("Error loading products:", error);
          setProducts([]);
        }
      } else {
        // Default products
        const defaultProducts = [
          {
            id: 1,
            name: 'MacBook Pro M3 16"',
            price: 2499.99,
            category: "Laptop",
            stock: 12,
            brand: "Apple",
            image:
              "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            rating: 4.9,
          },
          {
            id: 2,
            name: "iPhone 15 Pro Max",
            price: 1299.99,
            category: "Smartphone",
            stock: 25,
            brand: "Apple",
            image:
              "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
            rating: 4.8,
          },
          {
            id: 3,
            name: "Gaming PC RTX 4090",
            price: 3499.99,
            category: "PC Desktop",
            stock: 3,
            brand: "Custom Build",
            image:
              "https://images.unsplash.com/photo-1593640408182-31c70c8268f5",
            rating: 4.9,
          },
          {
            id: 4,
            name: "Samsung Galaxy S24 Ultra",
            price: 1199.99,
            category: "Smartphone",
            stock: 12,
            brand: "Samsung",
            image:
              "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
            rating: 4.7,
          },
        ];
        setProducts(defaultProducts);
        localStorage.setItem("admin_products", JSON.stringify(defaultProducts));
      }
      setIsLoading(false);
    }, 500);
  };

  // Categories
  const categories = [
    "All",
    "Laptop",
    "Smartphone",
    "PC Desktop",
    "Tablet",
    "Air Conditioner",
    "Washing Machine",
    "Refrigerator",
    "Monitor",
  ];

  useEffect(() => {
    if (!adminUser || adminUser.role !== "admin") {
      navigate("/admin-login");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, [adminUser, navigate]);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("admin_products", JSON.stringify(newProducts));
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand &&
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      category: "Laptop",
      stock: "",
      brand: "",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
    });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock || "",
      brand: product.brand || "",
      image:
        product.image ||
        "https://images.unsplash.com/photo-1498049794561-7780e7231661",
    });
    setShowModal(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((product) => product.id !== id);
      saveProducts(updatedProducts);
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Product name and price are required!");
      return;
    }

    let updatedProducts;

    if (editingProduct) {
      // Update existing
      updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              ...formData,
              price: parseFloat(formData.price) || 0,
              stock: parseInt(formData.stock) || 0,
            }
          : product
      );
    } else {
      // Add new
      const newProduct = {
        ...formData,
        id:
          products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        rating: 4.5,
        description: formData.name + " - Premium product",
        specs: ["New Product"],
      };
      updatedProducts = [...products, newProduct];
    }

    saveProducts(updatedProducts);
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute(
      "download",
      `products_export_${new Date().toISOString().split("T")[0]}.json`
    );
    linkElement.click();
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Admin Header - SAMA PERSIS DENGAN DASHBOARD */}
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>Product Management</h1>
          <p>
            Manage your store products,{" "}
            <span className="admin-name">{adminUser?.name}</span>
          </p>
        </div>

        <div className="admin-header-right">
          <button className="btn-refresh" onClick={loadProducts}>
            <RefreshCw size={20} /> Refresh
          </button>

          <button className="btn-settings">
            <Settings size={20} />
          </button>

          <div className="admin-user-menu">
            <span className="admin-role">Administrator</span>
            <button className="btn-logout" onClick={handleLogout}>
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="admin-container">
        {/* Sidebar - SAMA PERSIS DENGAN DASHBOARD */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <div className="nav-section">
              <h3>MAIN</h3>
              <button
                className="nav-link"
                onClick={() => navigate("/admin/dashboard")}
              >
                <BarChart3 size={20} /> Dashboard
              </button>
              <button className="nav-link active">
                <Package size={20} /> Products
              </button>
            </div>

            <div className="nav-section">
              <h3>QUICK ACTIONS</h3>
              <button className="nav-link" onClick={() => navigate("/")}>
                <Home size={20} /> View Store
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          {/* Search and Actions Bar */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Products List</h2>
              <div className="section-actions">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <button className="btn-action" onClick={handleAddProduct}>
                  <Plus size={18} /> Add Product
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="category-filters-row">
              <Filter size={16} />
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-filter ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Products Table */}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Brand</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {
                      const price = parseFloat(product.price) || 0;
                      const stock = parseInt(product.stock) || 0;

                      return (
                        <tr key={product.id}>
                          <td>#{product.id}</td>
                          <td>
                            <div className="product-cell">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="product-thumb"
                                onError={(e) =>
                                  (e.target.src =
                                    "https://via.placeholder.com/40")
                                }
                              />
                              <div>
                                <strong>{product.name}</strong>
                                <div className="product-description">
                                  {product.description || "Premium product"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="category-badge">
                              {product.category}
                            </span>
                          </td>
                          <td>
                            <strong style={{ color: "#e63946" }}>
                              ${price.toFixed(2)}
                            </strong>
                          </td>
                          <td>
                            <span
                              className={`stock-badge ${
                                stock < 5 ? "low" : "good"
                              }`}
                            >
                              {stock} units
                            </span>
                          </td>
                          <td>{product.brand || "-"}</td>
                          <td>
                            <div className="rating-display">
                              ★ {product.rating || 4.5}
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-action-small view"
                                onClick={() =>
                                  window.open(
                                    `/product/${product.id}`,
                                    "_blank"
                                  )
                                }
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                className="btn-action-small edit"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                className="btn-action-small delete"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="empty-state">
                        <Package size={48} />
                        <h3>No products found</h3>
                        <p>Try adding a product or adjusting your filters</p>
                        <button
                          className="btn-primary"
                          onClick={handleAddProduct}
                        >
                          <Plus size={18} /> Add First Product
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination/Info */}
            <div className="table-footer">
              <div className="table-info">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="table-actions">
                <button className="btn-secondary" onClick={handleExport}>
                  <Download size={16} /> Export
                </button>
                <button className="btn-primary" onClick={handleAddProduct}>
                  <Plus size={16} /> Add Product
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., MacBook Pro M3"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="2499.99"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="10"
                  />
                </div>

                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Apple"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  <Check size={18} /> {editingProduct ? "Update" : "Save"}{" "}
                  Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tambah CSS untuk Product Management */}
      <style jsx>{`
        .category-filters-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          padding: 0.75rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .category-filter {
          padding: 6px 12px;
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 20px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .category-filter:hover {
          border-color: #e63946;
          color: #e63946;
        }

        .category-filter.active {
          background: #e63946;
          color: white;
          border-color: #e63946;
        }

        .product-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .product-thumb {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          object-fit: cover;
        }

        .product-description {
          font-size: 0.85rem;
          color: #6c757d;
          margin-top: 2px;
        }

        .category-badge {
          background: rgba(230, 57, 70, 0.1);
          color: #e63946;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .stock-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .stock-badge.good {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .stock-badge.low {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .rating-display {
          color: #fbbf24;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          gap: 6px;
        }

        .btn-action-small {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-action-small.view {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .btn-action-small.edit {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .btn-action-small.delete {
          background: rgba(230, 57, 70, 0.1);
          color: #e63946;
        }

        .btn-action-small:hover {
          transform: translateY(-2px);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #dee2e6;
          min-width: 250px;
        }

        .search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.9rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem !important;
        }

        .empty-state svg {
          color: #dee2e6;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          color: #495057;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: #6c757d;
          margin-bottom: 1.5rem;
        }

        .table-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #dee2e6;
        }

        .table-info {
          color: #6c757d;
          font-size: 0.9rem;
        }

        .table-actions {
          display: flex;
          gap: 10px;
        }

        .products-container {
            display: flex;
            min-height: calc(100vh - 70px); /* Tinggi layar dikurangi tinggi header */
            width: 100%;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #dee2e6;
        }

        .modal-header h2 {
          margin: 0;
          color: #2d3047;
        }

        .close-btn {
          background: none;
          border: none;
          color: #6c757d;
          cursor: pointer;
          padding: 5px;
        }

        .close-btn:hover {
          color: #e63946;
        }

        .modal-form {
          padding: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #495057;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #e63946;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid #dee2e6;
        }

        .btn-cancel {
          padding: 0.75rem 1.5rem;
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          color: #495057;
          cursor: pointer;
          font-weight: 500;
        }

        .btn-cancel:hover {
          border-color: #e63946;
          color: #e63946;
        }

        .btn-save {
          padding: 0.75rem 1.5rem;
          background: #e63946;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-save:hover {
          background: #d90429;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .section-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .search-box {
            min-width: 100%;
          }

          .category-filters-row {
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

// Note: Impor icon BarChart3, ShoppingBag, Users dari lucide-react
export default ProductManagement;
