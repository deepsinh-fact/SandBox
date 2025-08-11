import React from 'react';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
    </div>
);

const ErrorMessage = ({ error, onRetry }) => (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 dark:text-red-400">{error}</span>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 font-medium text-sm"
                >
                    Try Again
                </button>
            )}
        </div>
    </div>
);

const EmptyState = ({ message = "No data available", icon }) => (
    <div className="text-center py-12">
        {icon || (
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        )}
        <p className="text-gray-500 dark:text-gray-400 text-lg">{message}</p>
    </div>
);

const DataStateHandler = ({ loading, error, data, onRetry, children, emptyMessage }) => {
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage error={error} onRetry={onRetry} />;
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
        return <EmptyState message={emptyMessage} />;
    }

    return children;
};

export default DataStateHandler;
export { LoadingSpinner, ErrorMessage, EmptyState };