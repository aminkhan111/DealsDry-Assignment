# Employee Management Application

## Overview
This is an Employee Management Application built to manage employee records, including the ability to create, edit, delete, and search for employees. The application is designed for use by an admin, who can securely log in using JWT authentication.

## Features
- **Admin Authentication:**
  - Secure login using JWT tokens.
  - Server-side email validation and numeric validation for the mobile number field.
  
- **Employee Management:**
  - **Create, Edit, and Delete Employees:** Admin can manage employee records.
  - **Employee Details Form:**
    - Name
    - Email (with validation)
    - Mobile Number (numeric validation)
    - Designation (Drop-down)
    - Gender (Radio buttons)
    - Courses (Checkboxes)
    - Employee Image (Upload)
  
- **Search Functionality:**
  - Search employees by name using a search bar.
  
- **Employee Count Display:**
  - Displays the total number of employees in the system.
  
- **Pagination:**
  - Efficiently handles and displays employee records with pagination.

## Installation

### Prerequisites
- Node.js
- MongoDB
- Git

### Setup
1. **Clone the repository:**
   ```bash
   git clone  https://github.com/aminkhan111/DealsDry-Assignment.git
   cd eDealsDry-Assignment

### Install dependencies:
npm install

### Start the application:
npm start

### Usage

### Admin Login:
Log in using your admin credentials to access the system.
### Manage Employees:
Add, edit, or delete employee records using the provided forms.
#### Search Employees:
Use the search bar to find employees by name.
### View Total Employees:
The total number of employees is displayed on the dashboard.

### Technologies Used
**Frontend: HTML, CSS, JavaScript, Bootstrap**
**Backend: Node.js, Express.js**
**Database: MongoDB**
**Authentication: JWT (JSON Web Tokens)**
