"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  roleFilter: "ALL" | "PATIENT" | "RECEPTIONIST" | "DOCTOR";
  setRoleFilter: (value: "ALL" | "PATIENT" | "RECEPTIONIST" | "DOCTOR") => void;
};

const SearchAndFilter: React.FC<Props> = (
  { searchTerm, setSearchTerm, roleFilter, setRoleFilter },
) => {
  return (
    <div className="mb-4 flex space-x-4">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Roles</SelectItem>
          <SelectItem value="PATIENT">Patient</SelectItem>
          <SelectItem value="RECEPTIONIST">Receptionist</SelectItem>
          <SelectItem value="DOCTOR">Doctor</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchAndFilter;
