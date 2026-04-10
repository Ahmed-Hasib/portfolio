import apiClient from './apiClient';

const unwrapData = (response) => response.data.data;

export async function getPortfolioContent() {
    const [
        profileResponse,
        skillsResponse,
        experiencesResponse,
        educationsResponse,
        projectsResponse,
        galleriesResponse,
        socialLinksResponse,
    ] = await Promise.all([
        apiClient.get('/api/profile'),
        apiClient.get('/api/skills'),
        apiClient.get('/api/experiences'),
        apiClient.get('/api/educations'),
        apiClient.get('/api/projects'),
        apiClient.get('/api/galleries'),
        apiClient.get('/api/social-links'),
    ]);

    return {
        profile: unwrapData(profileResponse),
        skills: unwrapData(skillsResponse),
        experiences: unwrapData(experiencesResponse),
        educations: unwrapData(educationsResponse),
        projects: unwrapData(projectsResponse),
        galleries: unwrapData(galleriesResponse),
        socialLinks: unwrapData(socialLinksResponse),
    };
}

export async function submitContact(payload) {
    const response = await apiClient.post('/api/contact', payload);

    return response.data;
}
