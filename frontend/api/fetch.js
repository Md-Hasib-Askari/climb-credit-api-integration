import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/';

export const fetchApplications = async (state, params) => {
    switch (state) {
        case 'inProgress':
            return fetchInProgressApplications(params);
        case 'approved':
            return fetchApprovedApplications(params);
        case 'accepted':
            return fetchAcceptedApplications(params);
        case 'readyToVerify':
            return fetchReadyToVerifyApplications(params);
        case 'allApplications':
            return fetchAllApplications(params);
        default:
            return [];
    }
};

export const fetchInProgressApplications = async (params) => {
    try {
        const response = await axios.get('/applications', {
            params: {
                portal_status: 'IN_PROGRESS',
                ...params
            }
        });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const fetchApprovedApplications = async (params) => {
    try {
        const response = await axios.get('/applications', {
            params: {
                portal_status: 'APPROVED',
                ...params
            }
        });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const fetchAcceptedApplications = async (params) => {
    try {
        const response = await axios.get('/applications',  {
            params: {
                portal_status: 'CONFIRMED',
                ...params
            }
        });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const fetchReadyToVerifyApplications = async (params) => {
    try {
        const response = await axios.get('/applications', {
            params: {
                portal_status: 'READY_TO_VERIFY',
                ...params
            }
        });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const fetchAllApplications = async (params) => {
    try {
        const response = await axios.get('/applications', {
            params: {
                ...params
            }
        });
        return response.data;
    } catch (error) {
        return [];
    }
};