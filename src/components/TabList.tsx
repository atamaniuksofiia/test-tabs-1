import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdAccountBalance,
  MdTimeline,
  MdAccountBalanceWallet,
  MdMenuBook,
  MdBarChart,
  MdBusinessCenter,
  MdAdminPanelSettings,
  MdHelpOutline,
  MdShowChart,
  MdPayments,
  MdAttachMoney,
  MdSearch,
  MdExpandMore,
  MdClose,
} from "react-icons/md";
import "./Tab.css";

const getTabIcon = (tabId) => {
  const iconMap = {
    1: <MdDashboard className="tab-icon" />,
    2: <MdAccountBalance className="tab-icon" />,
    3: <MdTimeline className="tab-icon" />,
    4: <MdAccountBalanceWallet className="tab-icon" />,
    5: <MdMenuBook className="tab-icon" />,
    6: <MdBarChart className="tab-icon" />,
    7: <MdBusinessCenter className="tab-icon" />,
    8: <MdAdminPanelSettings className="tab-icon" />,
    9: <MdHelpOutline className="tab-icon" />,
    10: <MdShowChart className="tab-icon" />,
    11: <MdPayments className="tab-icon" />,
    12: <MdAttachMoney className="tab-icon" />,
    13: <MdSearch className="tab-icon" />,
  };
  return iconMap[tabId] || <MdDashboard className="tab-icon" />;
};

const initialTabs = [
  { id: 1, name: "Dashboard", url: "/dashboard", pinned: false },
  { id: 2, name: "Banking", url: "/banking", pinned: false },
  { id: 3, name: "Timeline", url: "/timeline", pinned: false },
  { id: 4, name: "Accounting", url: "/accounting", pinned: false },
  { id: 5, name: "Manual", url: "/manual", pinned: false },
  { id: 6, name: "Statistics", url: "/statistics", pinned: false },
  { id: 7, name: "Bank Office", url: "/bank-office", pinned: false },
  { id: 8, name: "Administration", url: "/administration", pinned: false },
  { id: 9, name: "Help", url: "/help", pinned: false },
  { id: 10, name: "Wertpapierhandel", url: "/wertpapierhandel", pinned: false },
  { id: 11, name: "Ausschüttungen", url: "/ausschuttungen", pinned: false },
  { id: 12, name: "Finanzl", url: "/finanzl", pinned: false },
  { id: 13, name: "Search", url: "/search", pinned: false },
  { id: 14, name: "Analytics", url: "/analytics", pinned: false },
  { id: 15, name: "Clients", url: "/clients", pinned: false },
  { id: 16, name: "Invoices", url: "/invoices", pinned: false },
  { id: 17, name: "Calendar", url: "/calendar", pinned: false },
  { id: 18, name: "Messages", url: "/messages", pinned: false },
  { id: 19, name: "Reports", url: "/reports", pinned: false },
  { id: 20, name: "Settings", url: "/settings", pinned: false },
];
const TabList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabs, setTabs] = useState(
    () => JSON.parse(localStorage.getItem("tabs") || "[]") || initialTabs
  );
  const [activeTab, setActiveTab] = useState(null);
  const [visibleTabs, setVisibleTabs] = useState<typeof initialTabs>([]);
  const [overflowTabs, setOverflowTabs] = useState<typeof initialTabs>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef({});

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    const currentPath = location.pathname;
    const matchingTab = tabs.find((tab) => tab.url === currentPath);
    if (matchingTab) {
      setActiveTab(matchingTab.id);
    } else if (!activeTab && tabs.length > 0) {
      setActiveTab(tabs[0].id);
      navigate(tabs[0].url);
    }
  }, [location.pathname, tabs]);

  const updateTabVisibility = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const dropdownWidth = dropdownRef.current?.offsetWidth || 40;

    let totalWidth = 0;
    const visible: typeof tabs = [];
    const overflow: typeof tabs = [];

    for (const tab of tabs) {
      const el = tabRefs.current[tab.id];
      if (!el) continue;
      const style = window.getComputedStyle(el);
      const margin =
        parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      const fullWidth = el.offsetWidth + margin;

      if (totalWidth + fullWidth + dropdownWidth < containerWidth) {
        visible.push(tab);
        totalWidth += fullWidth;
      } else {
        overflow.push(tab);
      }
    }

    setVisibleTabs(visible);
    setOverflowTabs(overflow);
  }, [tabs]);

  useEffect(() => {
    const timer = setTimeout(updateTabVisibility, 100);
    window.addEventListener("resize", updateTabVisibility);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateTabVisibility);
    };
  }, [updateTabVisibility]);

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  const handleTabClick = (tabId) => {
    const clickedTab = tabs.find((t) => t.id === tabId);
    if (!clickedTab) return;
    setActiveTab(tabId);
    navigate(clickedTab.url);
  };

  const handleSwapFromDropdown = (tab) => {
    const lastVisible = [...visibleTabs].reverse().find((t) => !t.pinned);
    if (!lastVisible) return;

    const visibleCopy = [...visibleTabs];
    const overflowCopy = overflowTabs.filter((t) => t.id !== tab.id);

    const lastIndex = visibleCopy.findIndex((t) => t.id === lastVisible.id);
    if (lastIndex !== -1) visibleCopy.splice(lastIndex, 1, tab);
    overflowCopy.push(lastVisible);

    setVisibleTabs(visibleCopy);
    setOverflowTabs(overflowCopy);
    setActiveTab(tab.id);
    navigate(tab.url);
    setDropdownOpen(false);
  };

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    const copiedTabs = [...tabs];
    const draggedTab =
      dragItem.current !== null ? copiedTabs[dragItem.current] : null;
    if (draggedTab === null) return;
    if (dragItem.current !== null) {
      copiedTabs.splice(dragItem.current, 1);
    }
    if (dragOverItem.current !== null) {
      copiedTabs.splice(dragOverItem.current, 0, draggedTab);
    }
    setTabs(copiedTabs);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="tabs-container" ref={containerRef}>
      <div className="tabs-list">
        {visibleTabs.map((tab, index) => (
          <div
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current[tab.id] = el;
            }}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => handleTabClick(tab.id)}
          >
            {getTabIcon(tab.id)}
            <span className="tab-name">{tab.name}</span>
          </div>
        ))}

        <div className="dropdown-wrapper">
          <div
            className="dropdown-toggle"
            ref={dropdownRef}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <MdExpandMore className="dropdown-icon" />
            {overflowTabs.length > 0 && (
              <span className="overflow-count">{overflowTabs.length}</span>
            )}
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {overflowTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`dropdown-tab ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => handleSwapFromDropdown(tab)}
                >
                  {getTabIcon(tab.id)}
                  <span>{tab.name}</span>
                  <button
                    className="close-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Закрито таб "${tab.name}"`);
                    }}
                  >
                    <MdClose className="close-icon" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        style={{ position: "absolute", visibility: "hidden", top: "-9999px" }}
      >
        {tabs.map((tab) => (
          <div
            key={`measure-${tab.id}`}
            ref={(el) => {
              if (el) tabRefs.current[tab.id] = el;
            }}
            className="tab"
          >
            {getTabIcon(tab.id)}
            <span className="tab-name">{tab.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabList;
