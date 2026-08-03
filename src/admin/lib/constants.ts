import type { IconType } from "react-icons";
import {
  FiAward,
  FiBriefcase,
  FiCalendar,
  FiCamera,
  FiClock,
  FiCompass,
  FiDollarSign,
  FiFolder,
  FiGlobe,
  FiHeadphones,
  FiHeart,
  FiHome,
  FiImage,
  FiLayout,
  FiMap,
  FiMapPin,
  FiNavigation,
  FiSend,
  FiSettings,
  FiShield,
  FiSmile,
  FiStar,
  FiSun,
  FiTool,
  FiTruck,
  FiUmbrella,
  FiUser,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import {
  FaBus,
  FaCar,
  FaCarSide,
  FaChurch,
  FaHandHoldingHeart,
  FaLandmark,
  FaMapLocationDot,
  FaMountain,
  FaPlane,
  FaRoute,
  FaTaxi,
  FaTrain,
  FaTruckPickup,
  FaVanShuttle,
} from "react-icons/fa6";
import { CATEGORIES } from "@/data/packages";

export interface NavItem {
  label: string;
  href: string;
  icon: IconType;
  section: "MAIN" | "CONTENT" | "SYSTEM";
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: FiLayout, section: "MAIN" },
  { label: "Bookings", href: "/admin/bookings", icon: FiCalendar, section: "MAIN" },
  { label: "Packages", href: "/admin/packages", icon: FiBriefcase, section: "MAIN" },
  { label: "Vehicles", href: "/admin/vehicles", icon: FaCarSide, section: "MAIN" },
  { label: "Services", href: "/admin/services", icon: FiTool, section: "MAIN" },
  { label: "Gallery", href: "/admin/gallery", icon: FiImage, section: "CONTENT" },
  { label: "Reviews", href: "/admin/reviews", icon: FiStar, section: "CONTENT" },
  { label: "Media Library", href: "/admin/media", icon: FiFolder, section: "CONTENT" },
  { label: "Website Settings", href: "/admin/settings", icon: FiSettings, section: "SYSTEM" },
  { label: "Profile", href: "/admin/profile", icon: FiUser, section: "SYSTEM" },
];

export const NAV_SECTIONS: { key: NavItem["section"]; label: string }[] = [
  { key: "MAIN", label: "Main" },
  { key: "CONTENT", label: "Content" },
  { key: "SYSTEM", label: "System" },
];

export const ICON_MAP: Record<string, IconType> = {
  FiUsers,
  FiShield,
  FiDollarSign,
  FiClock,
  FiHeadphones,
  FiSmile,
  FiAward,
  FiStar,
  FiHeart,
  FiGlobe,
  FiZap,
  FiTruck,
  FiCompass,
  FiMap,
  FiMapPin,
  FiNavigation,
  FiHome,
  FiSun,
  FiSend,
  FiCamera,
  FiCalendar,
  FiTool,
  FiUmbrella,
  FiBriefcase,
  FaPlane,
  FaTrain,
  FaCarSide,
  FaLandmark,
  FaMountain,
  FaRoute,
  FaBus,
  FaTaxi,
  FaCar,
  FaChurch,
  FaMapLocationDot,
  FaVanShuttle,
  FaTruckPickup,
  FaHandHoldingHeart,
};

export const ICON_CHOICES = Object.keys(ICON_MAP);

export const PACKAGE_CATEGORIES = CATEGORIES.filter((c) => c !== "All");

export const TRANSMISSION_OPTIONS = ["Manual", "Automatic"] as const;
export const FUEL_OPTIONS = ["Petrol", "Diesel", "CNG", "Electric"] as const;
