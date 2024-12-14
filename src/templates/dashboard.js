import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PORT_NUMBER from '../port_number';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    TrendingUpIcon,
    PackageIcon,
    DollarSignIcon,
    UsersIcon,
    ShoppingCartIcon
} from 'lucide-react';

function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalTransactions: 0,
        totalRevenue: 0,
        topSellingPoints: [],
        transactionTrends: [],
        recentProducts: [],
        lowStockProducts: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                const [
                    productsResponse,
                    transactionsResponse,
                    sellingPointsResponse
                ] = await Promise.all([
                    axios.get(`http://localhost:${PORT_NUMBER}/api/products/all`),
                    axios.get(`http://localhost:${PORT_NUMBER}/api/transactions/all`),
                    axios.get(`http://localhost:${PORT_NUMBER}/api/selling-point/all`)
                ]);

                // Calculate total revenue
                const totalRevenue = transactionsResponse.data.reduce((sum, transaction) =>
                    sum + transaction.totalPrice, 0);

                // Group transactions by selling point
                const sellingPointTransactions = sellingPointsResponse.data.map(point => ({
                    name: point.name,
                    totalSales: transactionsResponse.data
                        .filter(t => t.sellingPoint.sellingPointId === point.sellingPointId)
                        .reduce((sum, t) => sum + t.totalPrice, 0)
                })).sort((a, b) => b.totalSales - a.totalSales);

                // Transaction trends (last 6 months)
                const transactionTrends = transactionsResponse.data
                    .reduce((trends, transaction) => {
                        const month = new Date(transaction.sellingDate).toLocaleString('default', { month: 'short' });
                        const existingMonth = trends.find(t => t.month === month);
                        if (existingMonth) {
                            existingMonth.totalSales += transaction.totalPrice;
                            existingMonth.transactionCount++;
                        } else {
                            trends.push({
                                month,
                                totalSales: transaction.totalPrice,
                                transactionCount: 1
                            });
                        }
                        return trends;
                    }, [])
                    .sort((a, b) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(a.month) -
                        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(b.month));

                // Low stock products (less than 10 units)
                const lowStockProducts = productsResponse.data
                    .filter(product => product.quantity < 10)
                    .sort((a, b) => a.quantity - b.quantity)
                    .slice(0, 5);

                setDashboardData({
                    totalProducts: productsResponse.data.length,
                    totalTransactions: transactionsResponse.data.length,
                    totalRevenue: totalRevenue,
                    topSellingPoints: sellingPointTransactions.slice(0, 3),
                    transactionTrends,
                    recentProducts: productsResponse.data.slice(0, 5),
                    lowStockProducts
                });

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data', error);
                setError('Failed to load dashboard data');
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen bg-sky-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-600"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            Error: {error}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 bg-sky-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-sky-800">Yeremiya Pharmacy Dashboard</h1>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                    <PackageIcon className="text-sky-600 mr-4" size={48} />
                    <div>
                        <h3 className="text-gray-500">Total Products</h3>
                        <p className="text-2xl font-bold text-sky-800">{dashboardData.totalProducts}</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                    <ShoppingCartIcon className="text-green-600 mr-4" size={48} />
                    <div>
                        <h3 className="text-gray-500">Total Transactions</h3>
                        <p className="text-2xl font-bold text-green-800">{dashboardData.totalTransactions}</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                    <DollarSignIcon className="text-emerald-600 mr-4" size={48} />
                    <div>
                        <h3 className="text-gray-500">Total Revenue</h3>
                        <p className="text-2xl font-bold text-emerald-800">${dashboardData.totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                    <UsersIcon className="text-purple-600 mr-4" size={48} />
                    <div>
                        <h3 className="text-gray-500">Active Selling Points</h3>
                        <p className="text-2xl font-bold text-purple-800">{dashboardData.topSellingPoints.length}</p>
                    </div>
                </div>
            </div>

            {/* Charts and Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Transaction Trends */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-4 text-sky-800">Monthly Transaction Trends</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dashboardData.transactionTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="totalSales"
                                stroke="#3B82F6"
                                name="Total Sales"
                            />
                            <Line
                                type="monotone"
                                dataKey="transactionCount"
                                stroke="#10B981"
                                name="Transactions"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Selling Points */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-4 text-sky-800">Top Selling Points</h2>
                    {dashboardData.topSellingPoints.map((point, index) => (
                        <div
                            key={point.name}
                            className={`flex justify-between items-center p-3 ${index < 2 ? 'border-b border-gray-200' : ''
                                }`}
                        >
                            <span className="font-medium">{point.name}</span>
                            <span className="text-green-600 font-bold">${point.totalSales.toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                {/* Low Stock Products */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-4 text-sky-800">Low Stock Products</h2>
                    {dashboardData.lowStockProducts.map((product) => (
                        <div
                            key={product.productCode}
                            className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0"
                        >
                            <span className="font-medium">{product.productName}</span>
                            <span className="text-red-600 font-bold">{product.quantity} units</span>
                        </div>
                    ))}
                </div>

                {/* Recent Products */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-4 text-sky-800">Recent Products</h2>
                    {dashboardData.recentProducts.map((product) => (
                        <div
                            key={product.productCode}
                            className="flex justify-between items-center p-3 border-b border-gray-200 last:border-b-0"
                        >
                            <span className="font-medium">{product.productName}</span>
                            <span className="text-blue-600 font-bold">${product.sellingPrice}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;