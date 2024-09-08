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
        case 'enrolled':
            return fetchEnrolledApplications(params);
        case 'archived':
            return fetchArchivedApplications(params);
        case 'allStudents':
            return fetchAllStudents(params);
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
                application_status: 'FTIL_SENT',
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

export const fetchEnrolledApplications = async (params) => {
    try {
        const response = await axios.get('/applications', {
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

export const fetchArchivedApplications = async (params) => {
    try {
        const response = await axios.get('/applications', {
            params: {
                portal_status: 'ARCHIVED',
                ...params
            }
        });
        return response.data;
    } catch (error) {
        return [];
    }
};

export const fetchAllStudents = async (params) => {
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