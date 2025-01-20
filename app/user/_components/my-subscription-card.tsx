"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  ExternalLink, 
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Wallet,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscriptionCardProps {
  subscription: {
    id: string;
    name: string;
    platform: string;
    url: string;
    status?: string;
    dateOfSubscription: Date;
    endOfSubscription: Date;
    amount: number;
    cardUsed: string;
    position?: number;
    createdAt: Date;
    updatedAt: Date;
    category?: string;
  }
  isFirstCard?: boolean;
  totalSubscriptions?: number;
  totalAmount?: number;
}

const MySubscriptionCard = ({ 
  subscription, 
  isFirstCard,
  totalSubscriptions, 
  totalAmount 
}: SubscriptionCardProps) => {
  // Function to format price with fallback
  const formatPrice = (amount: number | undefined) => {
    if (amount === undefined) return "$0.00";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Update the isActive check
  const isActive = () => {
    const endDate = new Date(subscription.endOfSubscription);
    const now = new Date();
    
    // Convert both to timestamps for comparison
    return endDate.getTime() > now.getTime();
  };

  // Use the function in the component
  const active = isActive();

  // Debug logs
  console.log('Card Debug:', {
    name: subscription.name,
    endDate: subscription.endOfSubscription,
    isActive: active,
    totalSubs: totalSubscriptions
  });

  return (
    <div className="space-y-6">
      {/* Total Summary Section - Only show on first card */}
      {isFirstCard && (
        <div className={cn(
          "grid grid-cols-2 gap-4 p-4 rounded-xl",
          "dark:bg-gray-800/50 bg-gray-100",
          "border dark:border-gray-700 border-gray-200"
        )}>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Subscriptions</p>
            <p className="text-2xl font-bold dark:text-gray-200">
              {totalSubscriptions ?? 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Monthly Cost</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatPrice(totalAmount)}/mo
            </p>
          </div>
        </div>
      )}

      {/* Subscription Details Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "rounded-xl overflow-hidden",
          "border transition-all duration-300",
          "dark:bg-gray-900/50 dark:border-gray-800",
          "bg-white border-gray-200",
          "hover:shadow-lg"
        )}
      >
        {/* Header Section */}
        <div className={cn(
          "p-4 border-b",
          "dark:border-gray-800 border-gray-200",
          "dark:bg-gray-800/50 bg-gray-50"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 dark:text-gray-400" />
              <h3 className="font-semibold dark:text-gray-200">{subscription.name}</h3>
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
              active ? (
                "dark:bg-green-500/20 bg-green-100 dark:text-green-300 text-green-600"
              ) : (
                "dark:bg-red-500/20 bg-red-100 dark:text-red-300 text-red-600"
              )
            )}>
              {active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
              {active ? 'Active' : 'Expired'}
            </div>
          </div>
        </div>

        {/* Details Table */}
        <div className="p-4">
          <table className="w-full">
            <tbody className="divide-y dark:divide-gray-800 divide-gray-200">
              <tr>
                <td className="py-2 text-sm dark:text-gray-400 text-gray-500">Platform</td>
                <td className="py-2 text-sm dark:text-gray-200 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span>{subscription.platform}</span>
                    <ExternalLink 
                      className="w-4 h-4 cursor-pointer hover:text-blue-500 transition-colors"
                      onClick={() => window.open(subscription.url, '_blank', 'noopener,noreferrer')}
                    />
                  </div>
                </td>
              </tr>
              {subscription.category && (
                <tr>
                  <td className="py-2 text-sm dark:text-gray-400 text-gray-500">Category</td>
                  <td className="py-2 text-sm dark:text-gray-200 text-right">
                    {subscription.category}
                  </td>
                </tr>
              )}
              <tr>
                <td className="py-2 text-sm dark:text-gray-400 text-gray-500">Monthly Cost</td>
                <td className="py-2 text-sm dark:text-gray-200 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-medium">
                      {formatPrice(subscription.amount)}/mo
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 text-sm dark:text-gray-400 text-gray-500">Start Date</td>
                <td className="py-2 text-sm dark:text-gray-200 text-right">
                  {new Date(subscription.dateOfSubscription).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td className="py-2 text-sm dark:text-gray-400 text-gray-500">End Date</td>
                <td className="py-2 text-sm dark:text-gray-200 text-right">
                  {new Date(subscription.endOfSubscription).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td className="py-2 text-sm dark:text-gray-400 text-gray-500">Card Used</td>
                <td className="py-2 text-sm dark:text-gray-200 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>{subscription.cardUsed}</span>
                  </div>
                </td>
              </tr>
              {subscription.position !== undefined && (
                <tr>
                  <td className="py-2 text-sm dark:text-gray-400 text-gray-500">Position</td>
                  <td className="py-2 text-sm dark:text-gray-200 text-right">
                    #{subscription.position + 1}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default MySubscriptionCard;
