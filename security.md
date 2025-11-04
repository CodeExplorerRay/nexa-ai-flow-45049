# Security Policy

## Supported Versions

This project is actively maintained. Security updates will be provided for the latest version.

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it to us by creating a GitHub issue with the `security` label. We will work with you to make sure we understand the scope of the issue and that we fully address your concern.

## Data Retention and PII

This application is designed to be run locally and gives users control over their data.

-   **AI Proxy Server:** The backend server logs requests for debugging purposes. As of the current version, it redacts strings that look like email addresses and credit card numbers from the logged request bodies. This is a best-effort attempt and should not be considered a complete PII removal solution.
-   **Embedding Service:** The embedding service stores the content of indexed documents on disk. Do not index documents containing sensitive personal information.
-   **Data Deletion:** The frontend provides controls for data retention and deletion. However, as the backend is not yet fully implemented, these controls are currently for demonstration purposes only. A full implementation would require API endpoints to delete data from the embedding service and any other persistent storage.

It is the responsibility of the user deploying this application to ensure compliance with all relevant data privacy regulations.