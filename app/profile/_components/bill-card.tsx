"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  Receipt, 
  Calendar, 
  Bell, 
  CreditCard,
  Building,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BillCategory, BillStatus } from '@prisma/client';

interface BillCardProps {
  bill: {
    id: string;
    title: string;
    description: string | null;
    category: BillCategory;
    amount: number;
    currency: string;
    dueDate: Date;
    status: BillStatus;
    provider: string | null;
    autoPayEnabled: boolean;
    notifyBefore: number;
  };
  onClick: () => void;
}

export const BillCard = ({ bill, onClick }: BillCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "UNPAID":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "OVERDUE":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      case "UPCOMING":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "UTILITY":
        return <Building className="w-4 h-4" />;
      case "INTERNET":
        return <Receipt className="w-4 h-4" />;
      case "INSURANCE":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Receipt className="w-4 h-4" />;
    }
  };

  const daysUntilDue = Math.ceil(
    (new Date(bill.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className={cn(
        "rounded-xl p-6 transition-all",
        "bg-white/50 dark:bg-gray-900/50",
        "border border-gray-200/50 dark:border-gray-800",
        "hover:bg-gray-50/70 dark:hover:bg-gray-900/70",
        "hover:border-purple-500/50"
      )}>
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={cn(
              "text-lg font-semibold transition-colors",
              "text-gray-900 dark:text-gray-200",
              "group-hover:text-purple-600 dark:group-hover:text-purple-400"
            )}>
              {bill.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{bill.provider}</p>
          </div>
          <Badge className={`${getStatusColor(bill.status)}`}>
            {bill.status}
          </Badge>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">
            {bill.currency} {bill.amount.toFixed(2)}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
            Due {format(new Date(bill.dueDate), 'MMM d, yyyy')}
            {daysUntilDue > 0 && (
              <span className="ml-2 text-xs">
                ({daysUntilDue} {daysUntilDue === 1 ? 'day' : 'days'} left)
              </span>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            {getCategoryIcon(bill.category)}
            <span className="ml-2">{bill.category}</span>
          </div>

          {bill.autoPayEnabled && (
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <CreditCard className="w-4 h-4 mr-2" />
              Auto-pay enabled
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Bell className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
            Notify {bill.notifyBefore} days before
          </div>
        </div>

        {/* View Details Button */}
        <div className={cn(
          "mt-4 pt-4",
          "border-t border-gray-200/50 dark:border-gray-800",
          "flex justify-end"
        )}>
          <button className={cn(
            "text-sm flex items-center",
            "text-purple-600 hover:text-purple-700",
            "dark:text-purple-400 dark:hover:text-purple-300"
          )}>
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}; 