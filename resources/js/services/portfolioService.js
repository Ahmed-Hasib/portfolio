import apiClient from './apiClient';

const unwrapData = (response) => response.data.data;

export async function getPortfolioContent(onPartialContent) {
    const profileRequest = apiClient.get('/api/profile').then(unwrapData);
    const skillsRequest = apiClient.get('/api/skills').then(unwrapData);
    const experiencesRequest = apiClient
        .get('/api/experiences')
        .then(unwrapData);
    const educationsRequest = apiClient.get('/api/educations').then(unwrapData);
    const projectsRequest = apiClient.get('/api/projects').then(unwrapData);
    const galleriesRequest = apiClient.get('/api/galleries').then(unwrapData);
    const socialLinksRequest = apiClient
        .get('/api/social-links')
        .then(unwrapData);

    const profile = await profileRequest;

    onPartialContent?.({ profile });

    const [skills, experiences, educations, projects, galleries, socialLinks] =
        await Promise.all([
            skillsRequest,
            experiencesRequest,
            educationsRequest,
            projectsRequest,
            galleriesRequest,
            socialLinksRequest,
        ]);

    return {
        profile,
        skills,
        experiences,
        educations,
        projects,
        galleries,
        socialLinks,
    };
}

export async function submitContact(payload) {
    const response = await apiClient.post('/api/contact', payload);

    return response.data;
}
