"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LocalSwitcher from "./LocalSwitcher";
import Image from "next/image";

export default function Header({
  menuItems = [],
  logoSrc = "/logo.jpg",
  logo = {
    width: 288,
    height: 0,
    alt: "Logo",
    className: "w-48 md:w-72",
  },
  onContactClick,
  className = "",
  showLanguageSwitcher = true,
  menuIcon: MenuIcon,
  theme = {
    primaryColor: "bg-dark/70",
    textColor: "text-white",
    hoverColor: "hover:text-premium",
  },
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest(".sidebar")) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sidebarOpen]);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const sectionId = e.currentTarget.getAttribute("href")?.substring(1);
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    setSidebarOpen(false);
  };

  const renderMenuButton = () => (
    <button
      className={`${theme.textColor}`}
      onClick={() => setSidebarOpen(!sidebarOpen)}
      aria-label={sidebarOpen ? "Close menu" : "Open menu"}
    >
      {sidebarOpen ? (
        <XMarkIcon className="h-10 w-10" />
      ) : MenuIcon ? (
        <MenuIcon className="w-5 md:w-8 h-5 md:h-8" />
      ) : (
        <div className="flex items-center gap-2">
          <span className="block w-6 h-0.5 bg-current"></span>
          <span className="text-sm">Menu</span>
        </div>
      )}
    </button>
  );

  if (!isClient) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out ${
          scrollPosition > 90
            ? `${theme.primaryColor} backdrop-blur-2xl shadow-md h-16 sm:h-fit md:h-20`
            : "bg-transparent"
        } ${className}`}
      >
        <div
          className={`grid grid-cols-3 gap-4 items-center max-h-header mx-4 lg:mx-40 ${
            scrollPosition > 90 ? "mt-4" : "mt-4 md:mt-16"
          }`}
        >
          {/* Left section */}
          <div className="flex items-center">
            <div className="flex items-center gap-5 md:text-lg">
              {renderMenuButton()}
              {showLanguageSwitcher && (
                <>
                  <div className="w-px bg-white/50 h-6 hidden md:block"></div>
                  <div className="hidden md:block">
                    <LocalSwitcher />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Center logo */}
          <div className="flex justify-center">
            <Link href="/" className="block">
              <Image
                src={logoSrc}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={`${logo.className} transition-transform duration-300 hover:scale-105`}
                priority
              />
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed top-0 right-0 h-full bg-white z-40 transition-transform duration-700 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          } w-full sidebar`}
        >
          <div className="flex h-screen">
            <div className="flex flex-col justify-between w-full sm:w-1/2 bg-dark text-white p-8 sm:pl-12 overflow-auto">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white text-xl flex items-center gap-2"
                >
                  <XMarkIcon className="w-8 h-8" />
                  <span>Close</span>
                </button>
                {showLanguageSwitcher && (
                  <div className="text-2xl">
                    <LocalSwitcher />
                  </div>
                )}
              </div>

              <nav className="my-8">
                <ul className="space-y-6 text-center">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href || "#"}
                        className={`${theme.hoverColor} text-2xl transition-all duration-300 inline-block`}
                        onClick={(e) =>
                          item.href?.startsWith("#") && handleNavClick(e, item)
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex justify-center">
                <Image
                  src={logoSrc}
                  alt={logo.alt}
                  width={180}
                  height={60}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="hidden md:block w-1/2 relative">
              <Image
                src="/logo.jpg"
                fill
                alt="Menu background"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </header>
    </>
  );
}
