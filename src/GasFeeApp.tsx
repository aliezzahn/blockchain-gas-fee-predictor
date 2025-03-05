import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Clock,
  Zap,
  Moon,
  Sun,
  BarChart as BarChartIcon,
  Clock as ClockIcon,
  Settings,
  PieChart as PieChartIcon,
} from "lucide-react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { useTheme } from "@/components/ui/use-theme";

// Enhanced Mock Data Generation
const generateMockBlockchainData = () => {
  const gasData = [];
  const transactionData = [];
  const networkData = [];
  const now = new Date();

  for (let i = 24; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 60 * 60 * 1000);

    // Gas Price Data
    gasData.push({
      time: date.toLocaleTimeString(),
      gasPrice: Math.floor(Math.random() * 50 + 10),
      networkCongestion: Math.random() * 100,
    });

    // Transaction Volume Data
    transactionData.push({
      time: date.toLocaleTimeString(),
      transactions: Math.floor(Math.random() * 1000 + 500),
      successRate: Math.random() * 100,
    });

    // Network Performance Data
    networkData.push({
      time: date.toLocaleTimeString(),
      blockTime: Math.random() * 20,
      networkLoad: Math.random() * 100,
    });
  }

  // Pie Chart Data for Transaction Types
  const transactionTypeData = [
    { name: "DeFi", value: Math.floor(Math.random() * 100) },
    { name: "NFT", value: Math.floor(Math.random() * 100) },
    { name: "Smart Contracts", value: Math.floor(Math.random() * 100) },
    { name: "Token Transfer", value: Math.floor(Math.random() * 100) },
  ];

  return {
    gasData,
    transactionData,
    networkData,
    transactionTypeData,
  };
};

// Top Navigation Component
const TopNavigation = ({ activeTab, setActiveTab }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-0 left-0 right-0 bg-background border-b shadow-lg z-50 pt-4 pb-2">
      <div className="container px-4 flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Gas Fee Predictor</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

// Bottom Navigation Component (Same as previous implementation)
const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    {
      icon: BarChartIcon,
      label: "Trends",
      tab: "trends",
    },
    {
      icon: PieChartIcon,
      label: "Insights",
      tab: "insights",
    },
    {
      icon: ClockIcon,
      label: "Timing",
      tab: "timing",
    },
    {
      icon: Settings,
      label: "Settings",
      tab: "settings",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
      <div className="grid grid-cols-4">
        {navItems.map((item) => (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`
              flex flex-col items-center justify-center py-3 
              ${
                activeTab === item.tab
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-accent"
              }
            `}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const GasFeePredictor = () => {
  const { theme, setTheme } = useTheme();
  const [blockchainData, setBlockchainData] = useState(null);
  const [activeTab, setActiveTab] = useState("trends");
  const [optimalTransactionTime, setOptimalTransactionTime] = useState(null);
  const [costSavingRecommendation, setCostSavingRecommendation] = useState("");

  useEffect(() => {
    const data = generateMockBlockchainData();
    setBlockchainData(data);

    const lowestGasPriceEntry = data.gasData.reduce((prev, current) =>
      prev.gasPrice < current.gasPrice ? prev : current
    );

    setOptimalTransactionTime(lowestGasPriceEntry.time);

    if (lowestGasPriceEntry.gasPrice < 20) {
      setCostSavingRecommendation(
        "Excellent time to execute transactions! Gas prices are low."
      );
    } else if (lowestGasPriceEntry.gasPrice < 35) {
      setCostSavingRecommendation(
        "Good time to execute non-urgent transactions."
      );
    } else {
      setCostSavingRecommendation(
        "Consider delaying non-critical smart contract interactions."
      );
    }
  }, []);

  if (!blockchainData) return null;

  return (
    <div className="container mx-auto p-4 pb-20">
      {/* Header with Theme Toggle */}
      <TopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-16">
        {/* Trends Tab */}
        {activeTab === "trends" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Gas Price Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={blockchainData.gasData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis
                      label={{
                        value: "Gwei",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="gasPrice" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={blockchainData.transactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis
                      label={{
                        value: "Transactions",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Bar dataKey="transactions" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === "insights" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Network Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={blockchainData.networkData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis
                      label={{
                        value: "Block Time",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="blockTime"
                      stroke="#FF6384"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={blockchainData.transactionTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {blockchainData.transactionTypeData.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Timing Tab */}
        {activeTab === "timing" && (
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2" /> Optimal Transaction Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                {optimalTransactionTime && (
                  <div className="text-center">
                    <p className="text-xl font-semibold">
                      {optimalTransactionTime}
                    </p>
                    <p className="text-muted-foreground">
                      Lowest gas prices detected
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2" /> Cost Saving Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertTitle>Transaction Strategy</AlertTitle>
                  <AlertDescription>
                    {costSavingRecommendation}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab - Same as previous implementation */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Theme</h3>
                    <div className="flex items-center space-x-4">
                      <span>
                        {theme === "dark" ? "Dark Mode" : "Light Mode"}
                      </span>
                      <Button
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                      >
                        Switch Theme
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Blockchain Network
                    </h3>
                    <p className="text-muted-foreground">Ethereum Mainnet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

// Wrapper Component with Theme Provider
const GasFeeApp = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GasFeePredictor />
    </ThemeProvider>
  );
};

export default GasFeeApp;
