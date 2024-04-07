import React from 'react'

const SideBarLibrarian = () => {
  return (
    <aside className="navbar-aside" id="offcanvas_aside">
            <div className="aside-top">
                <Link to="/admin/dashboard" className="brand-wrap">
                    <img className="logo" src={require('../../static/admin_assets/imgs/theme/logo.png').default} alt="Evara Dashboard" />
                </Link>
                <div>
                    <button className="btn btn-icon btn-aside-minimize">
                        <i className="text-muted material-icons md-menu_open"></i>
                    </button>
                </div>
            </div>
            <nav>
                <ul className="menu-aside">
                    <li className="menu-item active">
                        <Link to="/admin/dashboard" className="menu-link">
                            <i className="icon material-icons md-home"></i>
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>
                    <li className="menu-item has-submenu">
                        <Link to="/admin/products" className="menu-link">
                            <i className="icon material-icons md-shopping_bag"></i>
                            <span className="text">Products</span>
                        </Link>
                        <div className="submenu">
                            <Link to="/admin/products/list">Product List</Link>
                            <Link to="/admin/products/attributes">Attributes</Link>
                            <Link to="/admin/products/brands">Brand</Link>
                            <Link to="/admin/categories">Categories</Link>
                        </div>
                    </li>
                    <li className="menu-item">
                        <Link to="/admin/orders" className="menu-link">
                            <i className="icon material-icons md-shopping_cart"></i>
                            <span className="text">Orders</span>
                        </Link>
                    </li>
                    <li className="menu-item has-submenu">
                        <Link to="/admin/offers" className="menu-link">
                            <i className="icon material-icons md-shopping_bag"></i>
                            <span className="text">Offers</span>
                        </Link>
                        <div className="submenu">
                            <Link to="/admin/offers/category">Category Offer</Link>
                            <Link to="/admin/offers/brand">Brand Offer</Link>
                        </div>
                    </li>
                    <li className="menu-item">
                        <Link to="/admin/coupons" className="menu-link">
                            <i className="icon material-icons md-stars"></i>
                            <span className="text">Coupon</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/admin/customers" className="menu-link">
                            <i className="icon material-icons md-person"></i>
                            <span className="text">Customer</span>
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/admin/sales-report" className="menu-link">
                            <i className="icon material-icons md-pie_chart"></i>
                            <span className="text">Sales report</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
  )
}

export default SideBarLibrarian