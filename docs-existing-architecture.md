## Existing Architecture Overview

### Backend (Java Spring Boot)

- **Root**: `backend-java/`
- **Main Entry**: `com.resumesearch.BackendJavaApplication`
- **Architecture**: Spring Boot 3 with MongoDB, WebSockets, and Spring Security.
- **REST APIs**:
  - `/api/user`: User authentication and profile management.
  - `/api/comments`: Fetching and creating comments for resumes.
  - `/api/resume`: Resume generation (PDF).
- **WebSocket**:
  - Real-time comment updates and generation progress.
- **Data Model**:
  - `User`: Stored in MongoDB `users` collection.
  - `Comment`: Stored in MongoDB `comments` collection.

### Frontend (Angular)

- **Root**: `client-ng/`
- **Technology stack**: Angular with components for profile management, resume viewing, and feedback.
- **State management**: Service-based architecture for communicating with the Java backend.

