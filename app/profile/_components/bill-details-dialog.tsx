"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  X, 
  Receipt, 
  CreditCard, 
  AlertTriangle,
  FileText,
  Download,
  Calendar,
  Clock,
  Building,
  Link,
  Phone,
  Bell,
} from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface BillDetailsDialogProps {
  bill: any;
  onClose: () => void;
  onUpdate: () => void;
}

export const BillDetailsDialog = ({ bill, onClose, onUpdate }: BillDetailsDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  const [formData, setFormData] = useState(bill);

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/bills/${bill.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update bill");

      onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating bill:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/bills/${bill.id}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: bill.amount,
          method: "Credit Card",
          reference: `PAY-${Date.now()}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to process payment");

      onUpdate();
      setShowPaymentConfirm(false);
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={cn(
        "max-w-2xl w-full",
        "bg-white/95 dark:bg-gray-900/95",
        "border border-gray-200 dark:border-gray-800",
        "overflow-y-auto max-h-[85vh]"
      )}>
        <button
          onClick={onClose}
          className={cn(
            "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity",
            "hover:opacity-100 focus:outline-none",
            "focus:ring-2 focus:ring-purple-400",
            "focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900",
            "disabled:pointer-events-none",
            "data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800"
          )}
        >
          <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Bill Details
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="details" className="text-gray-800 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100">
              Details
            </TabsTrigger>
            <TabsTrigger value="history" className="text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100">
              Payment History
            </TabsTrigger>
            <TabsTrigger value="attachments" className="text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100">
              Attachments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4">
            <div className="space-y-4">
              {/* Status and Actions */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    bill.status === "PAID" && "bg-green-500/10 text-green-700 dark:text-green-400",
                    bill.status === "UNPAID" && "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                    bill.status === "OVERDUE" && "bg-red-500/10 text-red-700 dark:text-red-400"
                  )}>
                    {bill.status}
                  </span>
                  {bill.autoPayEnabled && (
                    <span className="bg-purple-500/10 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                      Auto-pay Enabled
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className={cn(
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-700 dark:text-gray-200",
                          "hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        Edit
                      </Button>
                      {bill.status !== "PAID" && (
                        <Button
                          onClick={() => setShowPaymentConfirm(true)}
                          className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
                        >
                          Pay Now
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className={cn(
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-700 dark:text-gray-200",
                          "hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleUpdate}
                        disabled={isSubmitting}
                        className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
                      >
                        Save Changes
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Basic Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-400">Title</Label>
                  {isEditing ? (
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={cn(
                        "bg-white/50 dark:bg-gray-800",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200"
                      )}
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{bill.title}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-400">Amount</Label>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                    {bill.currency} {bill.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-400">Due Date</Label>
                  <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    {format(new Date(bill.dueDate), 'MMM d, yyyy')}
                  </div>
                </div>
                {bill.lastPaidDate && (
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-gray-400">Last Paid</Label>
                    <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      <Clock className="w-4 h-4 text-green-400" />
                      {format(new Date(bill.lastPaidDate), 'MMM d, yyyy')}
                    </div>
                  </div>
                )}
              </div>

              {/* Provider Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Provider Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <Building className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    {bill.provider}
                  </div>
                  {bill.website && (
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                      <Link className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <a href={bill.website} target="_blank" rel="noopener noreferrer" 
                        className="hover:text-purple-600 dark:hover:text-purple-400">
                        Visit Website
                      </a>
                    </div>
                  )}
                  {bill.supportContact && (
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                      <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      {bill.supportContact}
                    </div>
                  )}
                </div>
              </div>

              {/* Notifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <Bell className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    Notify {bill.notifyBefore} days before due date
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    {bill.notifyEmail && "Email"} {bill.notifyEmail && bill.notifySMS && "•"} {bill.notifySMS && "SMS"}
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div className="space-y-4">
                {bill.paymentHistory?.length > 0 ? (
                  bill.paymentHistory.map((payment: any) => (
                    <div
                      key={payment.id}
                      className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <p className="text-gray-900 dark:text-gray-100">{format(new Date(payment.paymentDate), 'MMM d, yyyy')}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Reference: {payment.reference}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 dark:text-gray-100">{bill.currency} {payment.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{payment.method}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Receipt className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600 opacity-50" />
                    <p className="text-gray-600 dark:text-gray-400">No payment history available</p>
                  </div>
                )}
              </div>

              {/* Attachments */}
              <div className="space-y-4">
                {bill.attachments?.length > 0 ? (
                  bill.attachments.map((attachment: any) => (
                    <div
                      key={attachment.id}
                      className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <div>
                          <p className="text-gray-900 dark:text-gray-100">{attachment.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{attachment.type}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                        onClick={() => window.open(attachment.url)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600 opacity-50" />
                    <p className="text-gray-600 dark:text-gray-400">No attachments available</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <div className="space-y-4">
              {bill.paymentHistory?.length > 0 ? (
                bill.paymentHistory.map((payment: any) => (
                  <div
                    key={payment.id}
                    className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div>
                      <p className="text-gray-900 dark:text-gray-100">{format(new Date(payment.paymentDate), 'MMM d, yyyy')}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Reference: {payment.reference}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 dark:text-gray-100">{bill.currency} {payment.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{payment.method}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Receipt className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600 opacity-50" />
                  <p className="text-gray-600 dark:text-gray-400">No payment history available</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="attachments" className="mt-4">
            <div className="space-y-4">
              {bill.attachments?.length > 0 ? (
                bill.attachments.map((attachment: any) => (
                  <div
                    key={attachment.id}
                    className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-gray-900 dark:text-gray-100">{attachment.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{attachment.type}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                      onClick={() => window.open(attachment.url)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600 opacity-50" />
                  <p className="text-gray-600 dark:text-gray-400">No attachments available</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Payment Confirmation Dialog */}
        {showPaymentConfirm && (
          <div className={cn(
            "absolute inset-0",
            "bg-white/95 dark:bg-gray-900/95",
            "flex items-center justify-center"
          )}>
            <div className={cn(
              "p-6 rounded-lg max-w-md w-full mx-4",
              "bg-white dark:bg-gray-800",
              "border border-gray-200 dark:border-gray-700"
            )}>
              <div className="text-center mb-6">
                <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">Confirm Payment</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to pay {bill.currency} {bill.amount.toFixed(2)} for {bill.title}?
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentConfirm(false)}
                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isSubmitting}
                  className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
                >
                  {isSubmitting ? "Processing..." : "Confirm Payment"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}; 