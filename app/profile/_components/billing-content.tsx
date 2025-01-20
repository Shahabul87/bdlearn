"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Receipt, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BillCard } from "./bill-card";
import { NewBillDialog } from "./new-bill-dialog";
import { BillFilterDialog } from "./bill-filter-dialog";
import { BillDetailsDialog } from "./bill-details-dialog";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { BillCategory, BillStatus } from "@prisma/client";

interface Bill {
  id: string;
  title: string;
  description: string | null;
  category: BillCategory;
  amount: number;
  currency: string;
  startDate: Date;
  dueDate: Date;
  status: BillStatus;
  provider: string | null;
  autoPayEnabled: boolean;
  notifyBefore: number;
  paymentHistory: any[];
  attachments: any[];
}

export const BillingContent = ({ userId }: { userId: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewBillOpen, setIsNewBillOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBills = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Debug request
      //console.log("Fetching bills for month:", selectedMonth);
      
      const { data } = await axios.get<Bill[]>('/api/bills', {
        params: {
          month: selectedMonth
        }
      });
      
      // Debug response
      //console.log("Received bills:", data);
      
      setBills(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching bills:', error.response?.data);
        toast.error(error.response?.data || "Failed to fetch bills");
      } else {
        console.error('Error fetching bills:', error);
        toast.error("Failed to fetch bills");
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const totalDue = bills
    .filter(bill => bill.status === 'UNPAID')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const upcomingBills = bills
    .filter(bill => bill.status === 'UPCOMING')
    .length;

  // Filter bills based on search query
  const filteredBills = bills.filter(bill => 
    bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (bill.provider?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    bill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={cn(
        "flex justify-between items-center p-6 rounded-xl",
        "bg-white/30 dark:bg-gray-900/50",
        "border border-gray-200/50 dark:border-gray-800"
      )}>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Bills & Payments
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            Manage your bills and payment schedules
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "border-gray-200 dark:border-gray-700",
              "bg-white/50 dark:bg-gray-800/50",
              "text-gray-700 dark:text-gray-200",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              "hover:text-purple-600 dark:hover:text-purple-400",
              "transition-colors"
            )}
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button 
            onClick={() => setIsNewBillOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-medium shadow-lg shadow-purple-600/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Bill
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Due Card */}
        <div className={cn(
          "p-6 rounded-xl",
          "bg-white/30 dark:bg-gray-900/50",
          "border border-gray-200/50 dark:border-gray-800"
        )}>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Due</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-200 mt-2">
            ${totalDue.toFixed(2)}
          </p>
        </div>
        {/* Upcoming Bills Card */}
        <div className={cn(
          "p-6 rounded-xl",
          "bg-white/30 dark:bg-gray-900/50",
          "border border-gray-200/50 dark:border-gray-800"
        )}>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">Upcoming Bills</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-200 mt-2">
            {upcomingBills}
          </p>
        </div>
        {/* Month Selector Card */}
        <div className={cn(
          "p-6 rounded-xl",
          "bg-white/30 dark:bg-gray-900/50",
          "border border-gray-200/50 dark:border-gray-800"
        )}>
          <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">Month</h3>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className={cn(
              "mt-2 px-3 py-1.5 rounded-md",
              "bg-white/50 dark:bg-gray-800",
              "border border-gray-200 dark:border-gray-700",
              "text-gray-900 dark:text-gray-200"
            )}
          />
        </div>
      </div>

      {/* Search and Filter */}
      <div className={cn(
        "flex gap-4 flex-wrap items-center p-4 rounded-lg",
        "bg-white/20 dark:bg-gray-900/30"
      )}>
        <Input
          placeholder="Search bills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            "max-w-xs",
            "bg-white/50 dark:bg-gray-800/50",
            "border-gray-200 dark:border-gray-700",
            "text-gray-900 dark:text-gray-200",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
            "focus:border-purple-500 transition-colors"
          )}
          icon={<Search className="w-4 h-4 text-gray-400" />}
        />
      </div>

      {/* Bills List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading bills...</p>
        </div>
      ) : filteredBills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBills.map((bill) => (
            <BillCard 
              key={bill.id} 
              bill={bill}
              onClick={() => setSelectedBill(bill)}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "text-center py-16 rounded-xl",
            "bg-white/20 dark:bg-gray-900/30",
            "border border-gray-200 dark:border-gray-800"
          )}
        >
          <Receipt className="w-16 h-16 mx-auto mb-4 text-purple-600 dark:text-purple-400 opacity-50" />
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">No bills found for this month</p>
          <Button 
            variant="outline" 
            className={cn(
              "border-purple-500/50",
              "text-purple-600 dark:text-purple-400",
              "hover:bg-purple-50 dark:hover:bg-purple-500/10",
              "font-medium"
            )}
            onClick={() => setIsNewBillOpen(true)}
          >
            Add Your First Bill
          </Button>
        </motion.div>
      )}

      {/* Dialogs */}
      <NewBillDialog
        open={isNewBillOpen}
        onClose={() => setIsNewBillOpen(false)}
        onSuccess={fetchBills}
      />
      <BillFilterDialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      {selectedBill && (
        <BillDetailsDialog
          bill={selectedBill}
          onClose={() => setSelectedBill(null)}
          onUpdate={fetchBills}
        />
      )}
    </div>
  );
}; 