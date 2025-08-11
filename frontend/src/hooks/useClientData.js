import { useState, useEffect, useCallback } from 'react';
import Service from '../Service/Service';

export const useClientData = () => {
    const [clientData, setClientData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClients = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await Service.fetchClients();
            
            if (result.success) {
                const transformedData = result.data.map(client => ({
                    ...client,
                    key: client.AutoId?.toString() || client.Client_ClientId?.toString()
                }));
                setClientData(transformedData);
            } else {
                setError(result.message || 'Failed to fetch client data');
            }
        } catch (err) {
            console.error('Fetch clients error:', err);
            setError('Error connecting to server: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    return {
        clientData,
        loading,
        error,
        refetch: fetchClients
    };
};

export const useClientMasterData = () => {
    const [clientData, setClientData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClientMasters = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await Service.fetchClientMasters();
            
            if (result.success) {
                const transformedData = result.data.map(client => ({
                    ...client,
                    key: client.AutoId.toString()
                }));
                setClientData(transformedData);
            } else {
                setError(result.message || 'Failed to fetch client master data');
            }
        } catch (err) {
            console.error('Fetch client masters error:', err);
            setError('Error connecting to server: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const createClient = useCallback(async (clientFormData) => {
        try {
            const result = await Service.createClientMaster(clientFormData);
            if (result.success) {
                // Refresh data after successful creation
                await fetchClientMasters();
                return { success: true, data: result.data };
            } else {
                return { success: false, message: result.message || 'Failed to create client' };
            }
        } catch (err) {
            console.error('Create client error:', err);
            return { success: false, message: 'Error connecting to server: ' + err.message };
        }
    }, [fetchClientMasters]);

    useEffect(() => {
        fetchClientMasters();
    }, [fetchClientMasters]);

    return {
        clientData,
        loading,
        error,
        refetch: fetchClientMasters,
        createClient
    };
};