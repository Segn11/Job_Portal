
import React from 'react';
import { 
  Briefcase, 
  Users, 
  LayoutDashboard, 
  FileText, 
  User as UserIcon, 
  PlusCircle, 
  Settings, 
  LogOut,
  Search,
  MapPin,
  Filter
} from 'lucide-react';

export const JOB_CATEGORIES = [
  'Software Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Finance',
  'Customer Support',
  'Human Resources',
  'Project Management'
];

export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote'];

export const ICONS = {
  Dashboard: <LayoutDashboard size={20} />,
  Jobs: <Briefcase size={20} />,
  Applicants: <Users size={20} />,
  Applications: <FileText size={20} />,
  Profile: <UserIcon size={20} />,
  PostJob: <PlusCircle size={20} />,
  Settings: <Settings size={20} />,
  Logout: <LogOut size={20} />,
  Search: <Search size={20} />,
  Location: <MapPin size={20} />,
  Filter: <Filter size={20} />
};
