import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const MySidebar = ({
  collapsed,
  toggled,

  sidebarContent,
}: {
  image: any;
  collapsed: boolean;
  toggled: boolean;
  handleToggleSidebar: any;
  handleCollapsedChange: any;

  sidebarContent: any;
}) => {
  const [open, setOpen] = useState(toggled);
  // const location = {
  //   pathname: '/create-template',
  // };

  return (
    <Sidebar collapsed={collapsed} toggled={toggled}>
      {/* <SidebarHeader color="#111827">
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: '9px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 15,
                  letterSpacing: '1px',
                }}
              >
                <span
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Besto Message
                </span>
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader> */}
      {/* Content */}
      <div>
        {sidebarContent}
        {!collapsed ? <div className="z-50"></div> : <div></div>}
      </div>
      {/* Footer */}
      {/* <SidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
          <button
            className="sidebar-btn bg-gray-800 flex items-center justify-center mx-auto"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              localStorage.clear();
              navigate('/');
              window.location.reload();
            }}
          >
            <FaUser />
            {!collapsed ? (
              userId ? (
                <span className="ml-2 translate-y-0.5">Logout</span>
              ) : (
                <span className="ml-2 translate-y-0.5">Login</span>
              )
            ) : (
              <div></div>
            )}
          </button>
        </div>
      </SidebarFooter> */}
    </Sidebar>
  );
};

export default MySidebar;
