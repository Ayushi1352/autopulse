import type { IconType } from "react-icons";
import {
  FaCar,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegHandshake,
  FaStar,
  FaRegSmile,
  FaYoutube,
} from "react-icons/fa";
import { FaCalendarDays, FaScrewdriverWrench } from "react-icons/fa6";
import { GiCarWheel } from "react-icons/gi";
import { LiaOilCanSolid } from "react-icons/lia";
import { MdOutlineCarRepair } from "react-icons/md";
import { PiCarBold, PiCarFill, PiCarProfile, PiEngine, PiHandshakeBold, PiSnowflakeBold, PiTireBold, PiUsersThreeBold } from "react-icons/pi";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  TbArrowNarrowRight,
  TbArrowRight,
  TbAward,
  TbBatteryAutomotive,
  TbCalendarEvent,
  TbCalendarMonth,
  TbCar,
  TbCarSuv,
  TbCheck,
  TbChevronDown,
  TbChevronLeft,
  TbChevronRight,
  TbClock,
  TbClockCheck,
  TbEngine,
  TbEye,
  TbFlag3,
  TbGasStation,
  TbMail,
  TbManualGearbox,
  TbMenu2,
  TbMessage,
  TbMoodSmile,
  TbRocket,
  TbSettingsCheck,
  TbSnowflake,
  TbTargetArrow,
  TbTools,
  TbUser,
  TbUsers,
  TbUsersGroup,
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
  FaRegHandshake,
  FaStar,
  FaYoutube,
  GiCarWheel,
  LiaOilCanSolid,
  MdOutlineCarRepair,
  PiCarProfile,
  PiEngine,
  PiSnowflakeBold,
  PiTireBold,
  RiDoubleQuotesL,
  TbArrowNarrowRight,
  TbArrowRight,
  TbAward,
  TbBatteryAutomotive,
  TbCalendarEvent,
  TbCalendarMonth,
  TbCar,
  TbCarSuv,
  TbCheck,
  TbChevronDown,
  TbChevronLeft,
  TbChevronRight,
  TbClock,
  TbClockCheck,
  TbEngine,
  TbEye,
  TbFlag3,
  TbGasStation,
  TbMail,
  TbManualGearbox,
  TbMenu2,
  TbMessage,
  TbMoodSmile,
  TbRocket,
  TbSettingsCheck,
  TbSnowflake,
  TbTargetArrow,
  TbTools,
  TbUser,
  TbUsers,
  TbUsersGroup,
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
