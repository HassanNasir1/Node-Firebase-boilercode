# Node-Firebase-Boilercode

This project is a backend application built using Node.js. It utilizes Firebase Firestore as the database.

## Getting Started

To get a copy of the project up and running on your local machine, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/HassanNasir1/Node-Firebase-boilercode.git
```

2. Navigate to the project directory:

```bash
cd project-name
```

3. Install dependencies:

```bash
npm install
```

### Set Firebase Credentials

To authenticate with Firebase Firestore, you need to set up your Firebase service account credentials. Follow these steps:

1. Go to the Firebase Console and select your project.
2. Navigate to Project settings > Service accounts.
3. Click on Generate new private key and save the JSON file to your project directory.
4. Rename the downloaded JSON file to `serviceAccountKey.json`.
5. Place the `serviceAccountKey.json` file in the root of your project.

### Usage

#### Creating a New Service

To create a new service, run the following command:

```bash
node create-service.js "serviceName"
```

Replace `"serviceName"` with the name of your service.

#### Deleting a Service

To delete an existing service, run the following command:

```bash
node delete-service.js "serviceName"
```

Replace `"serviceName"` with the name of the service you want to delete.

### Important Notes

- Make sure to handle sensitive information like API keys and credentials securely.
- Add any other important notes specific to your project.

## Authors

- [Your Name](https://github.com/HassanNasir1) - Initial work

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
