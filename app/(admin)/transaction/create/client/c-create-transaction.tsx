"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  User,
  X,
  Check,
  ArrowRight,
  ShoppingCart,
  Info,
  Shirt,
  FileText,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import dynamic from "next/dynamic";

const SelectComboboxFilter = dynamic(
  () => import("@/components/select/select-combobox-filter"),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-full rounded-md border border-input bg-background animate-pulse" />
    ),
  }
);
const LaundryCheckout = () => {
  const [activeTab, setActiveTab] = useState("produk");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Baju Hitam",
      price: 444444,
      quantity: 10,
      total: 4444440,
      type: "produk",
    },
  ]);
  const [paymentStatus, setPaymentStatus] = useState("lunas");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  // Mock data
  const products = [
    {
      id: "baju-hitam",
      name: "Baju Hitam",
      price: 343434,
      stock: 45455,
      category: "produk",
    },
    {
      id: "baju-merah",
      name: "Baju Merah",
      price: 34343,
      stock: 4,
      category: "produk",
    },
    {
      id: "baju-orange",
      name: "Baju Orange",
      price: 400,
      stock: 4,
      category: "produk",
    },
  ];

  const services = [
    {
      id: "sagawa-panjang-cream",
      name: "Sagawa Panjang Chinos",
      price: 100000,
      stock: 94,
      category: "jasa",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID").format(amount);
  };

  const addToCart = (item: any | null) => {
    if (!item) return;
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                total: (cartItem.quantity + 1) * cartItem.price,
              }
            : cartItem
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
          total: item.price,
        },
      ]);
    }
  };

  const removeFromCart = (itemId: any) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: any, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      )
    );
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen  `}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}

            <Alert>
              <ShoppingCart className="w-6 h-6" />
              <AlertTitle>Form Transaksi</AlertTitle>
              <AlertDescription>
                Pilih Produk atau Jasa yang di Order.
              </AlertDescription>
            </Alert>
            {/* Product/Service Selection */}
            <Card>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="produk"
                      className="text-blue-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    >
                      PRODUK
                    </TabsTrigger>
                    <TabsTrigger value="jasa">JASA</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Cari Produk"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Product/Service List */}
                  <TabsContent value="produk" className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredProducts.map((product) => (
                        <Alert
                          key={product.id}
                          className="flex items-start gap-3 p-4 border shadow-lg rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                        >
                          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                            <Check className="w-2 h-2 text-white" />
                          </div>
                          <div className="flex-1">
                            <AlertTitle className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span
                                className={
                                  theme === "dark"
                                    ? "text-white"
                                    : "text-gray-900"
                                }
                              >
                                {product.name}
                              </span>
                            </AlertTitle>
                            <AlertDescription className="mt-1">
                              <div className="flex flex-col space-y-1">
                                <div className="text-sm">
                                  Harga:{" "}
                                  <span className="font-medium">
                                    Rp. {formatCurrency(product.price)}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Stok: {formatCurrency(product.stock)}
                                  </span>
                                </div>
                              </div>
                            </AlertDescription>
                          </div>
                        </Alert>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="jasa" className="space-y-3">
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => addToCart(service)}
                      >
                        <div className="flex-1">
                          <div>
                            <div className="text-sm text-gray-500">
                              {service.id}
                            </div>
                            <h3 className="font-semibold text-gray-900">
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Harga Modal:{" "}
                              <span className="font-medium">
                                Rp. {formatCurrency(service.price)}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            Stok
                          </div>
                          <div
                            className={`font-semibold ${
                              theme === "dark" ? "text-white" : ""
                            }`}
                          >
                            {service.stock}
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Konsumen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-3 border border-dashed rounded-lg text-gray-500 cursor-pointer hover:border-gray-400">
                  <User className="w-5 h-5" />
                  <div>
                    <div className="font-medium">Pilih Konsumen</div>
                    <div className="text-sm">Klik untuk memilih.</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Keranjang</CardTitle>
                  <Badge variant="default" className="rounded-full">
                    {cart.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full border flex items-center justify-center text-sm hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full border flex items-center justify-center text-sm hover:bg-gray-100"
                        >
                          +
                        </button>
                        <span className="text-xs text-gray-500 ml-2">
                          x {formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="font-semibold text-sm mt-1">
                        {formatCurrency(item.total)}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant={paymentStatus === "lunas" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPaymentStatus("lunas")}
                    className={
                      paymentStatus === "lunas"
                        ? "bg-green-600 hover:bg-green-700"
                        : ""
                    }
                  >
                    LUNAS
                  </Button>
                  <Button
                    variant={
                      paymentStatus === "belum_lunas" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setPaymentStatus("belum_lunas")}
                    className={
                      paymentStatus === "belum_lunas"
                        ? "bg-gray-600 hover:bg-gray-700"
                        : ""
                    }
                  >
                    BELUM LUNAS
                  </Button>
                  <Button
                    variant={paymentStatus === "dp" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPaymentStatus("dp")}
                    className={
                      paymentStatus === "dp"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    }
                  >
                    DP
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Total & Checkout */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Total Tagihan</span>
                    <span className="text-xl font-bold text-red-600">
                      {formatCurrency(getTotalAmount())}
                    </span>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                    disabled={cart.length === 0}
                  >
                    PROSES PENJUALAN
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaundryCheckout;
