import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const data = [
    { rank: 1, name: 'Selling with re entr', calmarRatio: 3.96, overallProfit: 381845, avgDailyProfit: 319.54, winPercentage: 0.65, price: '-', action: 'View' },
    { rank: 2, name: 'strategy_name', calmarRatio: 3.62, overallProfit: 268872.5, avgDailyProfit: 216.31, winPercentage: 0.64, price: '500', action: 'Buy' },
    { rank: 3, name: 'Based on premium and', calmarRatio: 3.42, overallProfit: 255425, avgDailyProfit: 208.51, winPercentage: 0.64, price: '-', action: 'View' },
    { rank: 4, name: 'strategy_name', calmarRatio: 3.22, overallProfit: 370845, avgDailyProfit: 303.47, winPercentage: 0.65, price: '-', action: 'View' },
    { rank: 5, name: 'strategy_name', calmarRatio: 3.22, overallProfit: 370845, avgDailyProfit: 303.47, winPercentage: 0.65, price: '-', action: 'View' },
    { rank: 6, name: 'Based on premium wit', calmarRatio: 3.01, overallProfit: 135980, avgDailyProfit: 185.77, winPercentage: 0.49, price: '-', action: 'View' },
    { rank: 7, name: 'strategy_name', calmarRatio: 2.76, overallProfit: 267867.5, avgDailyProfit: 218.49, winPercentage: 0.60, price: '-', action: 'View' },
    { rank: 8, name: 'Wait and trade_Save', calmarRatio: 2.62, overallProfit: 178252.5, avgDailyProfit: 161.9, winPercentage: 0.63, price: '-', action: 'View' },
    { rank: 9, name: 'iron condor', calmarRatio: 2.44, overallProfit: 176420, avgDailyProfit: 137.51, winPercentage: 0.65, price: '-', action: 'View' },
    { rank: 10, name: 'strategy_name', calmarRatio: 2.04, overallProfit: 244555, avgDailyProfit: 198.66, winPercentage: 0.62, price: '-', action: 'View' },
];


const Leaderboard = () => {
    const [filter, setFilter] = useState('');
    const [calmarFilter, setCalmarFilter] = useState('All');
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [viewMode, setViewMode] = useState('table');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleCalmarChange = (e) => {
        setCalmarFilter(e.target.value);
    };

    const handleSort = (columnName) => {
        if (columnName === sortedColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedColumn(columnName);
            setSortDirection('asc');
        }
    };

    const sortedData = data.sort((a, b) => {
        if (sortedColumn) {
            const aValue = a[sortedColumn];
            const bValue = b[sortedColumn];
            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        } else {
            return 0;
        }
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        gsap.fromTo(".data-row", 
            { opacity: 0, x: -40 }, 
            { opacity: 1, x: 0, duration: 1,
                ease: "power3.out", stagger: 0.1 }
        );
    }, [sortedData, filter, calmarFilter, sortedColumn, sortDirection, viewMode]);

    const quoteRef = useRef(null);
    useEffect(() => {
        const quote = quoteRef.current.querySelectorAll('span');

        gsap.fromTo(
            quote,
            { autoAlpha: 0, y: 20 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                delay: 1, 
                stagger: {
                    each: 0.08,
                    from: 'start',
                    ease: 'power1.out',
                },
            }
        );
    }, []);


    const lastQuotesRef = useRef(null);

    useEffect(() => {
        const lastQuotes = lastQuotesRef.current;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const quote = entry.target.querySelectorAll('span');
                    gsap.fromTo(
                        quote,
                        { autoAlpha: 0, y: 20 },
                        {
                            autoAlpha: 1,
                            y: 0,
                        duration: 0.9,
                            delay: 0.5, 
                            stagger: {
                                each: 0.1,
                                from: 'start',
                                ease: 'power1.out',
                                onComplete: () => {
                                    // Optionally, you can add a callback to execute after the animation is complete
                                }
                            },
                        }
                    );
                }
            });
        }, { threshold: 0.5 }); // Trigger the animation when 50% of the last quotes section is visible

        if (lastQuotes) {
            observer.observe(lastQuotes);
        }

        return () => {
            if (lastQuotes) {
                observer.unobserve(lastQuotes);
            }
        };
    }, []);


    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-700">
    <span className="font-serif">Leaderboard</span>
</h1>
  <div className="mb-6 text-center text-gray-600 font-serif font italic" ref={quoteRef}>
            <span>Success</span> <span>is</span> <span>not</span>{' '}
            <span className="text-blue-500">final</span>,{' '}
            <span className="text-red-500">failure</span> <span>is</span>{' '}
            <span>not</span> <span className="text-green-500">fatal</span>:{' '}
            <span>It</span> <span>is</span> <span>the</span> <span>courage</span>{' '}
            <span>to</span>{' '}
            <span className="text-yellow-500">continue</span> <span>that</span>{' '}
            <span>counts.</span>
        </div>

            <div className='border border-gray-300 rounded p-4'>
                <h2 className="text-2xl font-serif font-bold mb-6 text-center ">Basic Backtest</h2>
                <div className='border border-gray-300 rounded p-4'>
                <div className="flex flex-wrap items-center justify-between mb-4">
                
                    <div className="flex items-center font-serif space-x-4">
                        <input
                            type="text"
                            placeholder="🔍 Search by name"
                            value={filter}
                            onChange={handleFilterChange}
                            className="px-4 py-2 border border-gray-300 rounded"
                        />
                        <select
                            value={calmarFilter}
                            onChange={handleCalmarChange}
                            className="px-4 py-2 border border-gray-300 rounded"
                        >
                            <option value="All">All Calmar Ratios</option>
                            <option value="3.5">3.5 and above</option>
                            <option value="3.0">3.0 and above</option>
                            <option value="2.5">2.5 and above</option>
                            <option value="2.0">2.0 and above</option>
                        </select>
                    </div>
                    {/* View Mode */}
                    {!isMobile && (
                        <div className="flex items-center space-x-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="table"
                                checked={viewMode === 'table'}
                                onChange={() => setViewMode('table')}
                                className="hidden"
                            />
                            <span className={`cursor-pointer flex items-center justify-center w-8 h-8 border rounded-full transition-colors ${viewMode === 'table' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-gray-300 hover:bg-blue-100 hover:text-blue-700'}`}>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g id="View_Table"><path d="M18.44,3.06H5.56a2.507,2.507,0,0,0-2.5,2.5V18.44a2.507,2.507,0,0,0,2.5,2.5H18.44a2.514,2.514,0,0,0,2.5-2.5V5.56A2.514,2.514,0,0,0,18.44,3.06ZM8.71,19.94H5.56a1.5,1.5,0,0,1-1.5-1.5V15.33H8.71Zm0-5.61H4.06V9.67H8.71Zm0-5.66H4.06V5.56a1.5,1.5,0,0,1,1.5-1.5H8.71Zm11.23,9.77a1.511,1.511,0,0,1-1.5,1.5H9.71V15.33H19.94Zm0-4.11H9.71V9.67H19.94Zm0-5.66H9.71V4.06h8.73a1.511,1.511,0,0,1,1.5,1.5Z"></path></g></svg>
                            </span>
                            <span className="ml-2 font-serif">Table</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="card"
                                checked={viewMode === 'card'}
                                onChange={() => setViewMode('card')}
                                className="hidden"
                            />
                            <span className={`cursor-pointer flex items-center justify-center w-8 h-8 border rounded-full transition-colors ${viewMode === 'card' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-gray-300 hover:bg-blue-100 hover:text-blue-700'}`}>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g id="Grid__2-H"><g><path d="M18.437,11H5.565a2.5,2.5,0,0,1-2.5-2.5V5.564a2.5,2.5,0,0,1,2.5-2.5H18.437a2.5,2.5,0,0,1,2.5,2.5V8.5A2.5,2.5,0,0,1,18.437,11ZM5.565,4.064a1.5,1.5,0,0,0-1.5,1.5V8.5a1.5,1.5,0,0,0,1.5,1.5H18.437a1.5,1.5,0,0,0,1.5-1.5V5.564a1.5,1.5,0,0,0-1.5-1.5Z"></path><path d="M18.437,20.936H5.565a2.5,2.5,0,0,1-2.5-2.5V15.5a2.5,2.5,0,0,1,2.5-2.5H18.437a2.5,2.5,0,0,1,2.5,2.5v2.934A2.5,2.5,0,0,1,18.437,20.936ZM5.565,14a1.5,1.5,0,0,0-1.5,1.5v2.934a1.5,1.5,0,0,0,1.5,1.5H18.437a1.5,1.5,0,0,0,1.5-1.5V15.5a1.5,1.5,0,0,0-1.5-1.5Z"></path></g></g></svg>
                            </span>
                            <span className="ml-2 font-serif">Card</span>
                        </label>
                    </div>
                    )}
                    
                </div>
                {viewMode === 'table' && !isMobile ? (
                    <div>
                        <table className="min-w-full font-serif bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="border-b cursor-pointer hover:bg-gray-100 text-left items-right justify-between" onClick={() => handleSort('rank')}>
                                        <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 font-serif'>
                                        🎖️ Rank
                                            <span className="inline-flex ml-1">
                                                <FaArrowUp className={` text-xs opacity-${sortedColumn === 'rank' && sortDirection === 'asc' ? '100' : '50'}`} />
                                                <FaArrowDown className={`text-xs opacity-${sortedColumn === 'rank' && sortDirection === 'desc' ? '100' : '50'}`} />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="border-b cursor-pointer text-left items-center justify-between">
                                        <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 font-serif'>Name                                        </div>
                                    </th>
                                    <th className="border-b cursor-pointer hover:bg-gray-100 items-center justify-between" onClick={() => handleSort('calmarRatio')}>
                                        <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 font-serif'>
                                            Calmar Ratio
                                            <span className="inline-flex ml-1">
                                                <FaArrowUp className={`text-xs opacity-${sortedColumn === 'calmarRatio' && sortDirection === 'asc' ? '100' : '50'}`} />
                                                <FaArrowDown className={`text-xs opacity-${sortedColumn === 'calmarRatio' && sortDirection === 'desc' ? '100' : '50'}`} />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="border-b cursor-pointer hover:bg-gray-100 text-left items-center justify-between" onClick={() => handleSort('overallProfit')}>
                                        <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 font-serif'>🥳 Overall Profit
                                            <span className="inline-flex ml-1">
                                                <FaArrowUp className={`text-xs opacity-${sortedColumn === 'overallProfit' && sortDirection === 'asc' ? '100' : '50'}`} />
                                                <FaArrowDown className={`text-xs opacity-${sortedColumn === 'overallProfit' && sortDirection === 'desc' ? '100' : '50'}`} />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="border-b cursor-pointer hover:bg-gray-100 text-left items-center justify-between" onClick={() => handleSort('avgDailyProfit')}>
                                        <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 font-serif'>💰 Avg. Daily Profit
                                            <span className="inline-flex ml-1">
                                                <FaArrowUp className={`text-xs opacity-${sortedColumn === 'avgDailyProfit' && sortDirection === 'asc' ? '100' : '50'}`} />
                                                <FaArrowDown className={`text-xs opacity-${sortedColumn === 'avgDailyProfit' && sortDirection === 'desc' ? '100' : '50'}`} />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="border-b cursor-pointer hover:bg-gray-100 text-left items-center justify-between" onClick={() => handleSort('winPercentage')}>
                                        <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 font-serif'>📊 Win % (Day)
                                            <span className="inline-flex ml-1">
                                                <FaArrowUp className={`text-xs opacity-${sortedColumn === 'winPercentage' && sortDirection === 'asc' ? '100' : '50'}`} />
                                                <FaArrowDown className={`text-xs opacity-${sortedColumn === 'winPercentage' && sortDirection === 'desc' ? '100' : '50'}`} />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="border-b cursor-pointer hover:bg-gray-100 text-left items-center justify-between" onClick={() => handleSort('price')}>
                                        <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 font-serif'>💸 Price (Rs)
                                            <span className="inline-flex ml-1">
                                                <FaArrowUp className={` text-xs opacity-${sortedColumn === 'price' && sortDirection === 'asc' ? '100' : '50'}`} />
                                                <FaArrowDown className={`text-xs opacity-${sortedColumn === 'price' && sortDirection === 'desc' ? '100' : '50'}`} />
                                            </span>
                                        </div>
                                    </th>
                                    <th className="border-b">
                                        <div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2
                                        font-serif'>Action</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData
                                    .filter(row => row.name.toLowerCase().includes(filter.toLowerCase()) && (calmarFilter === 'All' || row.calmarRatio >= parseFloat(calmarFilter)))
                                    .map((row) => (
                                        <tr key={row.rank} className="data-row">
                                            <td className="py-2 px-4 font-bold font-serif border-b">{row.rank}</td>
                                            <td className="py-2 px-4 text-left font-serif border-b">{row.name}</td>
                                            <td className="py-2 px-4 text-center font-sans border-b">{row.calmarRatio}</td>
                                            <td className="py-2 px-4 text-center font-sans border-b">{row.overallProfit}</td>
                                            <td className="py-2 px-4 text-center font-sans border-b">{row.avgDailyProfit}</td>
                                            <td className="py-2 px-4 text-center font-sans border-b">{row.winPercentage}</td>
                                            <td className="py-2 px-4 text-center font-sans border-b">{row.price}</td>
                                            <td className="py-2 px-4 text-center font-serif font-bold border-b text-blue-500 cursor-pointer">
                                                {row.action}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 flex-wrap lg:grid lg:grid-cols-2 lg:gap-4">
                        {sortedData
                            .filter(row => row.name.toLowerCase().includes(filter.toLowerCase()) && (calmarFilter === 'All' || row.calmarRatio >= parseFloat(calmarFilter)))
                            .map((row) => (
                                <div key={row.rank} className="data-row font-serif border p-4 rounded bg-white shadow flex">
    <div className="flex-1 font-serif">
        <div className="font-bold font-serif mb-2">Rank: {row.rank}</div>
        <div className="mb-2 font-serif">Name: {row.name}</div>
        <div className="mb-2 font-sans">Calmar Ratio: {row.calmarRatio}</div>
        <div className="mb-2 font-sans">Overall Profit: {row.overallProfit}</div>
        <div className="mb-2 font-sans">Avg. Daily Profit: {row.avgDailyProfit}</div>
        <div className="mb-2 font-sans">Win % (Day): {row.winPercentage}</div>
        <div className="mb-2 font-sans">Price (Rs): {row.price}</div>
        <div className="text-blue-500 cursor-pointer font-serif">{row.action}</div>
    </div>
    {row.rank === 1 && (
        <div className="flex items-center justify-center">
            <span role="img" aria-label="trophy" className="text-[9rem]">🥇</span>
        </div>
    )}
    {row.rank === 2 && (
        <div className="flex items-center justify-center">
            <span role="img" aria-label="trophy" className="text-[9rem]">🥈</span>
        </div>
    )}
    
    {row.rank === 3 && (
        <div className="flex items-center justify-center">
            <span role="img" aria-label="trophy" className="text-[9rem]">🥉</span>
        </div>
    )}
</div>

                            ))}
                    </div>
                )}
            </div>
            <div ref={lastQuotesRef} className="my-6 w-[69vw] mx-auto text-sm text-center text-gray-600 font-serif italic">
            <span>If you couldn't make it to the leaderboard, don't be demotivated. Just remember what <strong> Sir Thomas Edison </strong> said- "</span><span className="text-blue-500 font-serif font-bold">I have not failed. I've just found 10,000 ways that won't work.</span>"
    </div>
        </div>
        </div>
    );
};

export default Leaderboard;


