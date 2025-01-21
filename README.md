
# Jobs Live

## Description

This project aims to develop a RESTful API using NestJS to serve as the backend for a job search platform. The primary purpose is to facilitate learning and demonstrate practical implementation of RESTful API principles. The system provides functionality for two main user groups: Employers and Job Seekers.

Features
For Employers (Job Posters):

Create Job Posts
Employers can create detailed job postings to attract potential candidates.
Moderate Job Posts
Employers have the ability to review and manage their job postings, including updates and deletions.
Search for Job Seekers
Employers can search for freelancers or job seekers who have enabled the "Looking for Work" feature.
For Job Seekers:

Browse and Interact with Job Posts
Job seekers can view available job postings and engage with them (e.g., saving or marking as interested).
Apply for Jobs
Job seekers can submit applications for jobs that match their skills and interests.
Purpose and Application
The API is designed as a learning tool to understand and practice building scalable and efficient RESTful APIs. It provides a foundation for creating a functional job search system and can be extended with additional features such as authentication, notifications, and analytics.

## Knowledge
- Architecture: Modular Structure 

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Generate new modules, controllers, services, and resources 
- Create module `nest g mo <module-name>`
- Create controller `nest g co <controller-name>`
- Create service `nest g s <service-name>` 
- Create resource `nest g res <service-name>` 

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

