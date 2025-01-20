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
    <div className="space-y-6">
      {/* Billing Navigation */}
      <div className={cn(
        "flex gap-4 p-1 rounded-lg",
        "bg-gray-100/80 dark:bg-gray-800/80",
        "border border-gray-200/50 dark:border-gray-700/50"
      )}>
        <Button
          variant={selectedSection === 'payment-methods' ? 'default' : 'ghost'}
          onClick={() => setSelectedSection('payment-methods')}
          className={cn(
            "flex items-center gap-2",
            selectedSection === 'payment-methods'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <CreditCard className="w-4 h-4" />
          Payment Methods
        </Button>
        <Button
          variant={selectedSection === 'billing-history' ? 'default' : 'ghost'}
          onClick={() => setSelectedSection('billing-history')}
          className={cn(
            "flex items-center gap-2",
            selectedSection === 'billing-history'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <History className="w-4 h-4" />
          Billing History
        </Button>
        <Button
          variant={selectedSection === 'subscription' ? 'default' : 'ghost'}
          onClick={() => setSelectedSection('subscription')}
          className={cn(
            "flex items-center gap-2",
            selectedSection === 'subscription'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <Wallet className="w-4 h-4" />
          Subscription
        </Button>
      </div>

      {/* Payment Methods Section */}
      {selectedSection === 'payment-methods' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Payment Methods</h3>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg",
                    "bg-gray-50/50 dark:bg-gray-900/50",
                    "border border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-gray-900 dark:text-gray-200">{method.type} •••• {method.last4}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Expires {method.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {method.isDefault && (
                      <span className="text-xs bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                    <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">Remove</Button>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
                <CreditCard className="w-4 h-4 mr-2" />
                Add New Payment Method
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Billing History Section */}
      {selectedSection === 'billing-history' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Billing History</h3>
            <div className="space-y-4">
              {billingHistory.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg",
                    "bg-gray-50/50 dark:bg-gray-900/50",
                    "border border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <Receipt className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-gray-900 dark:text-gray-200">{item.description}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 dark:text-green-400">${item.amount}</span>
                    <span className="text-xs bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                      {item.status}
                    </span>
                    <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                      <Receipt className="w-4 h-4 mr-2" />
                      Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Subscription Section */}
      {selectedSection === 'subscription' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Current Plan</h3>
            <div className={cn(
              "rounded-lg p-6",
              "bg-gray-50/50 dark:bg-gray-900/50",
              "border border-gray-200 dark:border-gray-700"
            )}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-200">Premium Plan</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Billed monthly</p>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-200">$29.99
                  <span className="text-sm text-gray-600 dark:text-gray-400">/mo</span>
                </span>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Premium features included</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Bell className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Priority support</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700">
                  Change Plan
                </Button>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          </div>

          <div className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Billing Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Auto-renew subscription</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically renew your subscription</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Email receipts</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive receipts for all payments</p>
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