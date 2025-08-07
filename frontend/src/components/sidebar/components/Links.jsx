/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "../../../components/icons/DashIcon";
import { Button, Tooltip } from "antd";
import Service from "Service/Service";


export function SidebarLinks(props) {
  // Chakra color mode
  const features = Service.getUserdata().packages || {};
  let location = useLocation();
  const [arrow, setArrow] = React.useState("Show");
  const mergedArrow = React.useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const { routes, onClose, name } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.split("/")[2] === routeName;
  };
  const NavbarClose = () => {
    if (window.innerWidth < 1200) {
      onClose();
    }
  };
  const createLinks = (routes) => {
    return routes
      .filter((route) => {
        // Check feature flag (if present)
        if (route.featureKey !== undefined) {
          return features[route.featureKey];
        }
        return true; // Always include if no featureKey
      }).map((route, index) => {
        if (
          // route.layout === "/rtl" ||
          // route.layout === "/auth" ||
          route.layout === "/admin"

        ) {
          return (
            <Link
              onClick={NavbarClose}
              key={index}
              to={route.layout + "/" + route.path}
            >
              <div className="relative mb-3 flex hover:cursor-pointer">
                <li
                  className="my-[3px] flex cursor-pointer items-center px-8"
                  key={index}
                >
                  <span
                    className={`${activeRoute(route.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                      } flex h-9 w-9 items-center justify-center rounded-lg bg-lightPrimary px-1 ${route?.icon?.bgcoloer
                      } dark:text-white`}
                  >
                    <Tooltip
                      points={["top", "right"]}
                      placement="right"
                      targetOffset={[10, 10]}
                      overflow={{
                        adjustX: true,
                        adjustY: true,
                      }}
                      useCssRight={true}
                      useCssBottom={true}
                      title={route.name}
                      arrow={mergedArrow}
                    >
                      {/* {route.icon ? route.icon : <DashIcon />}{" "} */}
                      <img
                        className={`aspect-square w-6 object-contain`}
                        src={route?.icon?.iconlight}
                        alt={route?.icon?.iconlight}
                      />
                      {/* {route.icon ? route.icon : <DashIcon />}{" "} */}
                    </Tooltip>
                  </span>
                  <p
                    className={`leading-1 ml-4 transition-all duration-1000  ${name ? "flex" : "hidden overflow-hidden"
                      }  ${activeRoute(route.path) === true
                        ? "font-bold text-navy-700 dark:text-white"
                        : "font-medium text-gray-600"
                      }`}
                  >
                    {route.name}
                  </p>
                </li>
                {activeRoute(route.path) ? (
                  <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
                ) : null}
              </div>
            </Link>
          );
        }
      });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
