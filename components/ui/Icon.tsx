import type { IconType } from "react-icons";
import {
  FaCar,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaRegSmile,
  FaYoutube,
} from "react-icons/fa";
import { FaCalendarDays, FaScrewdriverWrench } from "react-icons/fa6";
import { LiaOilCanSolid } from "react-icons/lia";
import { PiCarBold, PiCarFill, PiHandshakeBold, PiTireBold, PiUsersThreeBold } from "react-icons/pi";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  TbArrowNarrowRight,
  TbArrowRight,
  TbBatteryAutomotive,
  TbCalendarEvent,
  TbCalendarMonth,
  TbCar,
  TbCheck,
  TbChevronDown,
  TbChevronLeft,
  TbChevronRight,
  TbClock,
  TbClockCheck,
  TbEngine,
  TbGasStation,
  TbMail,
  TbMenu2,
  TbMessage,
  TbPhone,
  TbRocket,
  TbSettingsCheck,
  TbSnowflake,
  TbTargetArrow,
  TbUser,
  TbX,
} from "react-icons/tb";
import {
  ApAwardStar,
  ApBrakeDisc,
  ApCalendarGrid,
  ApCarCheck,
  ApCarGear,
  ApEyeRays,
  ApMountainFlag,
  ApSedan,
  ApTimingBelt,
  ApUsersStars,
} from "@/components/ui/customIcons";

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  ApAwardStar,
  ApBrakeDisc,
  ApCalendarGrid,
  ApCarCheck,
  ApCarGear,
  ApEyeRays,
  ApMountainFlag,
  ApSedan,
  ApTimingBelt,
  ApUsersStars,
  FaCalendarDays,
  FaRegSmile,
  FaScrewdriverWrench,
  PiCarBold,
  PiCarFill,
  PiHandshakeBold,
  PiUsersThreeBold,
  FaCar,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaYoutube,
  LiaOilCanSolid,
  PiTireBold,
  RiDoubleQuotesL,
  TbArrowNarrowRight,
  TbArrowRight,
  TbBatteryAutomotive,
  TbCalendarEvent,
  TbCalendarMonth,
  TbCar,
  TbCheck,
  TbChevronDown,
  TbChevronLeft,
  TbChevronRight,
  TbClock,
  TbClockCheck,
  TbEngine,
  TbGasStation,
  TbMail,
  TbMenu2,
  TbMessage,
  TbPhone,
  TbRocket,
  TbSettingsCheck,
  TbSnowflake,
  TbTargetArrow,
  TbUser,
  TbX,
};

type Props = {
  name: string;
  className?: string;
  // Line thickness of the outline icons (Tb); the filled icons (Fa, Gi, Lia, Md, Pi, Ri) and the drawn ones (Ap) keep their own shape.
  strokeWidth?: number;
};

export const Icon = ({ name, className, strokeWidth }: Props) => {
  const Component = icons[name] ?? TbCheck;
  return <Component className={className} strokeWidth={name.startsWith("Tb") ? strokeWidth : undefined} aria-hidden="true" />;
};
