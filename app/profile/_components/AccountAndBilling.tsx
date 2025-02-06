"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { CreditCard, Wallet, DollarSign, Receipt, History, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const AccountAndBilling = () => {
  const [selectedSection, setSelectedSection] = useState('payment-methods');

  const billingHistory = [
    { id: 1, date: '2024-02-01', amount: 29.99, status: 'Paid', description: 'Monthly Premium Plan' },
    { id: 2, date: '2024-01-01', amount: 29.99, status: 'Paid', description: 'Monthly Premium Plan' },
    // Add more history items
  ];

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '08/24', isDefault: false },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Billing Navigation - Made responsive */}
      <div className={cn(
        "flex flex-col xs:flex-row gap-2 xs:gap-4 p-2 sm:p-1 rounded-lg overflow-x-auto no-scrollbar",
        "bg-gray-100/80 dark:bg-gray-800/80",
        "border border-gray-200/50 dark:border-gray-700/50"
      )}>
        <Button
          variant={selectedSection === 'payment-methods' ? 'default' : 'ghost'}
          onClick={() => setSelectedSection('payment-methods')}
          size="sm"
          className={cn(
            "flex items-center gap-1.5 sm:gap-2 w-full xs:w-auto text-xs sm:text-sm whitespace-nowrap",
            selectedSection === 'payment-methods'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Payment Methods
        </Button>
        <Button
          variant={selectedSection === 'billing-history' ? 'default' : 'ghost'}
          onClick={() => setSelectedSection('billing-history')}
          size="sm"
          className={cn(
            "flex items-center gap-1.5 sm:gap-2 w-full xs:w-auto text-xs sm:text-sm whitespace-nowrap",
            selectedSection === 'billing-history'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Billing History
        </Button>
        <Button
          variant={selectedSection === 'subscription' ? 'default' : 'ghost'}
          onClick={() => setSelectedSection('subscription')}
          size="sm"
          className={cn(
            "flex items-center gap-1.5 sm:gap-2 w-full xs:w-auto text-xs sm:text-sm whitespace-nowrap",
            selectedSection === 'subscription'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Subscription
        </Button>
      </div>

      {/* Payment Methods Section - Made responsive */}
      {selectedSection === 'payment-methods' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className={cn(
            "rounded-lg p-4 sm:p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Payment Methods</h3>
            <div className="space-y-3 sm:space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg gap-3 sm:gap-4",
                    "bg-gray-50/50 dark:bg-gray-900/50",
                    "border border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm sm:text-base text-gray-900 dark:text-gray-200">{method.type} •••• {method.last4}</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Expires {method.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 sm:gap-4">
                    {method.isDefault && (
                      <span className="text-[10px] sm:text-xs bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 sm:h-9 text-xs sm:text-sm text-gray-700 dark:text-gray-300">Edit</Button>
                    <Button variant="ghost" size="sm" className="h-8 sm:h-9 text-xs sm:text-sm text-red-600 dark:text-red-400">Remove</Button>
                  </div>
                </div>
              ))}
              <Button 
                className="w-full h-9 sm:h-10 text-xs sm:text-sm mt-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              >
                <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Add New Payment Method
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Billing History Section - Made responsive */}
      {selectedSection === 'billing-history' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className={cn(
            "rounded-lg p-4 sm:p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Billing History</h3>
            <div className="space-y-3 sm:space-y-4">
              {billingHistory.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg gap-3 sm:gap-4",
                    "bg-gray-50/50 dark:bg-gray-900/50",
                    "border border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-sm sm:text-base text-gray-900 dark:text-gray-200">{item.description}</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 sm:gap-4">
                    <span className="text-sm sm:text-base text-green-600 dark:text-green-400">${item.amount}</span>
                    <span className="text-[10px] sm:text-xs bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                      {item.status}
                    </span>
                    <Button variant="ghost" size="sm" className="h-8 sm:h-9 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      <Receipt className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Subscription Section - Made responsive */}
      {selectedSection === 'subscription' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Current Plan */}
          <div className={cn(
            "rounded-lg p-4 sm:p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Current Plan</h3>
            <div className={cn(
              "rounded-lg p-4 sm:p-6",
              "bg-gray-50/50 dark:bg-gray-900/50",
              "border border-gray-200 dark:border-gray-700"
            )}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 sm:gap-4 mb-4">
                <div>
                  <h4 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-200">Premium Plan</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Billed monthly</p>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-200">
                  $29.99
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">/mo</span>
                </span>
              </div>
              <div className="space-y-2 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                  <span>Premium features included</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                  <span>Priority support</span>
                </div>
              </div>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full xs:w-auto h-9 sm:h-10 text-xs sm:text-sm text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                >
                  Change Plan
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="w-full xs:w-auto h-9 sm:h-10 text-xs sm:text-sm bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </div>

          {/* Billing Settings */}
          <div className={cn(
            "rounded-lg p-4 sm:p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Billing Settings</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm sm:text-base text-gray-900 dark:text-gray-200">Auto-renew subscription</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Automatically renew your subscription</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm sm:text-base text-gray-900 dark:text-gray-200">Email receipts</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Receive receipts for all payments</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 