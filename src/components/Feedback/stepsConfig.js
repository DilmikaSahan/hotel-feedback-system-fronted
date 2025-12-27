import { IoIosPeople } from "react-icons/io";
import { MdMeetingRoom, MdRoomService, MdDining } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiSofaFill } from "react-icons/ri";

export const STEPS = [
  {
    key: "staff",
    label: "Staff",
    title: "Select Service Team",
    subtitle: "Choose the staff members who served you",
    icon: IoIosPeople,
  },
  {
    key: "room",
    label: "Room",
    title: "Select Room / Table",
    subtitle: "Select your room or table number",
    icon: MdMeetingRoom,
  },
  {
    key: "details",
    label: "Details",
    title: "Your Information",
    subtitle: "Please provide your information",
    icon: FaUser,
  },
  {
    key: "service",
    label: "Service",
    title: "How was the Service?",
    subtitle: "Rate the service quality you received",
    icon: MdRoomService,
  },
  {
    key: "food",
    label: "Food",
    title: "How was the Food?",
    subtitle: "Rate the quality of your meal",
    icon: MdDining,
  },
  {
    key: "ambiance",
    label: "Ambiance",
    title: "How was the Ambiance?",
    subtitle: "Rate the dining environment experience",
    icon: RiSofaFill,
  },
];
