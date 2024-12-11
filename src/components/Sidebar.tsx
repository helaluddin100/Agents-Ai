import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FaAdjust,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaBook,
  FaCode,
  FaMousePointer,
} from "react-icons/fa";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

interface MySidebarProps {
  id: string | string[] | undefined;
}

const MySidebar: React.FC<MySidebarProps> = ({ id }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
    setToggled(!toggled);
  };

  const router = useRouter();
  const location = router.pathname;
  console.log(location);
  return (
    <Sidebar className="h-screen sidebar" collapsed={collapsed}>
      <Menu>
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
                padding: "9px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 15,
                letterSpacing: "1px",
              }}
            >
              <span
                onClick={() => {
                  router.push("/");
                }}
                className="flex items-center"
              >
                <img src="/logo.png" alt="logo" className="w-6 mr-2 " />
                Agents.ai
              </span>
            </div>
          </MenuItem>
        )}
      </Menu>
      <Menu>
        {" "}
        <Link href={"/data-feed/" + id} as={"/data-feed/" + id}>
          <MenuItem
            icon={<FaBook />}
            className={
              location === "/data-feed/[id]"
                ? "text-primary "
                : "text-gray-700 hover:text-black"
            }
            // suffix={<span className="badge red"></span>}
          >
            <p>
              <span>Knowledge Base</span>
            </p>
          </MenuItem>{" "}
        </Link>
        <a href={"/customize/" + id}>
          <MenuItem
            icon={<FaAdjust />}
            className={
              location === "/customize/[id]"
                ? "text-white bg-secondary hover:text-black hover:bg-secondary"
                : "text-gray-700 hover:text-black"
            }
            // suffix={<span className="badge red"></span>}
          >
            <p>
              <span>Customize Chatbot</span>
            </p>
          </MenuItem>{" "}
        </a>
        {/* <Link href={"/analytics/" + id}>
          <MenuItem
            icon={<FaMousePointer />}
            className={
              location === "/analytics/[id]"
                ? "text-primary "
                : "text-gray-700 hover:text-black"
            }
            // suffix={<span className="badge red"></span>}
          >
            <p>
              <span>Analytics</span>
            </p>
          </MenuItem>{" "}
        </Link> */}
        <a href={"/script/" + id}>
          <MenuItem
            icon={<FaCode />}
            className={
              location === "/script/[id]"
                ? "text-primary "
                : "text-gray-700 hover:text-black"
            }
            // suffix={<span className="badge red"></span>}
          >
            <p>
              <span>Embed</span>
            </p>
          </MenuItem>{" "}
        </a>
      </Menu>
    </Sidebar>
  );
};

export default MySidebar;
